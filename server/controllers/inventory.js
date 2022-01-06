const mongoose = require('mongoose');
const moment = require('moment')

const Inventory = require('../models/inventory');
const Gem_group = require('../models/gem_group');


const generateStoneCode = (weightStone, autoIncrement) => {
    const date = new Date();
    let year = date.getFullYear().toString().slice(2,4);
    let month = date.getMonth().toString().padStart(2, '0');
    let day = date.getDay().toString().padStart(2,'0');
    let roundWeight = parseFloat(weightStone).toFixed(0);
    let weight = roundWeight.toString().padStart(4, '0');
    let count = autoIncrement.toString().padStart(3, '0');
    let stoneCode = year.concat(count, month, day, weight);
    return stoneCode;
};

const validateUpdate = (res , id, dataToUpdate) => {
    Inventory.findByIdAndUpdate(id, dataToUpdate, { safe: true, upsert: true, new: true }, (err, docs) => {
        if(err) {
            res.status(403).json({
                success: false,
                message: err.message,
                error_code: 403
            })
        } else {
            res.status(201).json({success: true, result: docs});
        }
    }) 
}

exports.identify_new_stone = async (req, res, next) => {
    if (req.userPermission.GCF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    let body = req.body;

    let autoIncrement = await Inventory.countDocuments().lean();
            
    let stoneArray = [];
    let count = 0;
    body.stones.forEach(stone => {
        count++; 

        stoneArray.push(new Inventory({
            _id: new mongoose.Types.ObjectId(),
            stone_Id: generateStoneCode(stone.individual_weight, (autoIncrement + count)),
            status: 'pending',
            group : {
                isGroup : body.stones.length > 1 ? true : false,
                pieces : body.stones.length,
                total_weight : body.total_weight,
            },
            description: {
                nom: body.gem_variety,
                details: stone.details || null,
                images : [],
                videos : [],
                
                user_id: req.userData._id
            }, 

            measurements: {
                length : stone.length,
                width: stone.width,
                depth: stone.depth,
                props: stone.props,
                individual_weight: stone.individual_weight,

                length_unit: body.length_unit,
                weight_unit: body.weight_unit,
                user_id: req.userData._id
            },

            acquisition: {
                purchase_note: body.purchase_note,
                seller_name: body.seller_name,
                seller_phone: body.seller_phone,
                date: moment(new Date()).toISOString()
            },

            purchase: {
                purchase_date: moment(new Date()).toISOString(),
                purchase_note: body.purchase_note,
                stone_cost: {
                    total_cost: stone.total_cost,
                    unit_cost: stone.unit_cost
                },
                bf_office_cost: {
                    commission: ((parseFloat(stone.commission) / parseFloat(stone.total_cost)) * 100).toFixed(0),
                    total: stone.commission
                },
                grand_total_cost: stone.grand_total
            }
        }))
    })

    Inventory.insertMany(stoneArray)
        .then(resultGems => {
            let gems = resultGems.map(gem => { return gem._id });

            const new_group = new Gem_group({
                _id: new mongoose.Types.ObjectId(),
                pieces: body.stones.length,
                total_weight: body.total_weight,
                purchase_note: body.purchase_note,
                seller_name: body.seller_name,
                seller_phone: body.seller_phone,
                length_unit: body.length_unit,
                gem_variety: body.gem_variety,
                weight_unit : body.weight_unit,
                price_per_unit: body.price_per_unit,
                total_price: body.total_price,
                total_comm_price: body.total_comm_price,
                grand_total_price: body.grand_total_price,
                user_id: req.userData._id,
                gems : gems
            });

            new_group.save()
                .then(result => {
                    res.status(201).json({
                        success: true,
                        data: {
                            _id: result._id,
                            total_weight: result.total_weight,
                            pieces: result.pieces,
                            total_price: result.total_price,
                            weight_unit: result.weight_unit,
                            gems: resultGems,
                            createdAt: result.createdAt,
                            updatedAt: result.updatedAt
                        }
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                        error_code: 500
                    })
                })                    
        })   
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err,
                error_code: 500
            })
        })

}


exports.fill_stone_info = (req, res, next) => {
    if (req.userPermission.GUF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const id = req.params.id;
    const data = req.body.data;
    const action = req.body.action;

    switch (action) {
        case "change_status":
            if (req.userPermission.CHNGSTTSF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })
            validateUpdate(res, id, {status : data.status});
            break;
        case "add_images":
            if (req.userPermission.GUIMGF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let imgPath = req.files['images'][0].path.split('\\').join('/');
            validateUpdate(res, id, {$push: {"description.images" : imgPath}});
            break;
        case "add_videos":
            if (req.userPermission.GUVIDF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let vidPath = (req.files['videos'][0].path).split('\\').join('/');
            validateUpdate(res, id, {$push: {"description.videos" : vidPath}});
            break;
        case "identification":
            if (req.userPermission.GUIDF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let identification = data.addedData;
            validateUpdate(res, id, identification);
            break;
        case "purchase":
            if (req.userPermission.GUPRCHZF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let purchase = data.addedData;
            validateUpdate(res, id, purchase);
            break;
        case "treatment":
            if (req.userPermission.GUTRTMNTF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let treatment = data.addedData;
            validateUpdate(res, id, treatment);
            break;
        case "position":
            if (req.userPermission.GUPOSF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let position = data.addedData;
            validateUpdate(res, id, position);
            break;
        case "sale":
            if (req.userPermission.GUSLF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let sale = data.addedData;
            validateUpdate(res, id, sale);
            break;
        case "share":
            if (req.userPermission.GUSHRF === false)
                return res.status(403).json({
                    success: false,
                    message: 'forbidden access'
                })

            let share = data.addedData;
            validateUpdate(res, id, share);
            break;
        default:
            break;
    }
    
}

exports.get_all_stones = (req, res, next) => {
    if (req.userPermission.GGAF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    Gem_group
        .find()
        .populate({ path: 'gems', model: 'Inventories'})
        .sort({createdAt: -1})
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch(err => {
            res.status(403).json({
                success: false,
                message: err.message,
                error_code: 403
            })
        });

}

exports.get_a_stone = (req, res, next) => {
    if (req.userPermission.GGF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})
    
    const id = req.params.id;
    Inventory.findById(id)
        .exec()
        .then(result => {
            if(result) {
                res.status(200).json({
                    success: true,
                    data: result
                })
            } else {
                res.status(404).json({
                    success: true,
                    message: 'No valid entry found for provided ID',
                    error_code: 404
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err.message,
                error_code: 500
            })
        })
}

exports.search_by_keywords = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Query successful: Under construction..."
    })
}

exports.delete_a_stone = (req, res, next) => {
    if (req.userPermission.GDF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})
    const id = req.params.id;

    Inventory.findByIdAndDelete(id, { safe: true, upsert: true, new: true}, (err, docs) => {
        if(err) {
            res.status(403).json({success: false, message: 'Failed to delete', error: err, error_code: 403});
        } else {
            res.status(201).json({success: true, result: docs});
        }
    })
}