const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stone_Id: {trim: true, type: mongoose.Schema.Types.String, required: true},
    status: {trim: true, type: mongoose.Schema.Types.String, enum: ['pending', 'purchased', 'rejected', 'sold'], default: 'pending', required: true },

    group : {
        isGroup : {trim: true, type: mongoose.Schema.Types.Boolean, required: true},
        pieces : {trim: true, type: mongoose.Schema.Types.Number, required: true},
        total_weight : {trim: true, type: mongoose.Schema.Types.Number, required: true},
    },

    description: {
        nom: {trim: true, type: mongoose.Schema.Types.String},
        details: {trim: true, type: mongoose.Schema.Types.String},
        
        images : [],

        videos : [],

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    },

    measurements: {
        length: {trim: true, type: mongoose.Schema.Types.Number},
        width: {trim: true, type: mongoose.Schema.Types.Number},
        depth: {trim: true, type: mongoose.Schema.Types.Number},
        props: {trim: true, type: mongoose.Schema.Types.Number},
        length_unit: {trim: true, type: mongoose.Schema.Types.String},


        weight_unit: {trim: true, type: mongoose.Schema.Types.String},
        individual_weight: {trim: true, type: mongoose.Schema.Types.Number},

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    },

    acquisition: {
        seller_name: {trim: true, type: mongoose.Schema.Types.String},
        seller_phone: {trim: true, type: mongoose.Schema.Types.String},
        purchase_note : {trim: true, type: mongoose.Schema.Types.String},
        date: {trim: true, type: mongoose.Schema.Types.Date}
    },

    purchase: {
        purchase_date: {trim: true, type: mongoose.Schema.Types.Date},
        purchase_note: {trim: true, type: mongoose.Schema.Types.String},
        stone_cost: {
            total_cost: {trim: true, type: mongoose.Schema.Types.Number},
            unit_cost: {trim: true, type: mongoose.Schema.Types.Number}
        },
        bf_office_cost: {
            commission: {trim: true, type: mongoose.Schema.Types.Number},
            total: {trim: true, type: mongoose.Schema.Types.Number}
        },
        grand_total_cost: {trim: true, type: mongoose.Schema.Types.Number},
    }, 

    purchase_payment: [{
        advance: {trim: true, type: mongoose.Schema.Types.Number},
        balance: {trim: true, type: mongoose.Schema.Types.Number},
        due: {trim: true, type: mongoose.Schema.Types.Number},
        date: {trim: true, type: mongoose.Schema.Types.Date}
    }],

    treatment: [{
        individual_weight: {trim: true, type: mongoose.Schema.Types.Number},

        total_length: {trim: true, type: mongoose.Schema.Types.Number},
        diameter_min: {trim: true, type: mongoose.Schema.Types.Number},
        diameter_max: {trim: true, type: mongoose.Schema.Types.Number},
        prop: {trim: true, type: mongoose.Schema.Types.Number},

        treatment_cost: {trim: true, type: mongoose.Schema.Types.Number},

        date: {trim: true, type: mongoose.Schema.Types.Date},

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }       
    }],

    position: [{
        product_id: {trim: true, type: mongoose.Schema.Types.String},
        status: {trim: true, type: mongoose.Schema.Types.String},
        date_acquisition: {trim: true, type: mongoose.Schema.Types.Date},
        date_livraison: {trim: true, type: mongoose.Schema.Types.Date},
        destinataire: {trim: true, type: mongoose.Schema.Types.String},
        location: {trim: true, type: mongoose.Schema.Types.String},
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        user_name: {trim: true, type: mongoose.Schema.Types.String},
        stones: [{
            images: [{
                image_id: {trim: true, type: mongoose.Schema.Types.ObjectId},
                image_url: {trim: true, type: mongoose.Schema.Types.String}
            }],
            stone_id: {trim: true, type: mongoose.Schema.Types.String}
        }]
    }], 

    sale: {
        sale_date: {trim: true, type: mongoose.Schema.Types.Date},
        details: {trim: true, type: mongoose.Schema.Types.String},
        customer: {trim: true, type: mongoose.Schema.Types.String},
        sale_price: {trim: true, type: mongoose.Schema.Types.Number},
        
        profit: {
            total: {trim: true, type: mongoose.Schema.Types.Number},
            profit: {trim: true, type: mongoose.Schema.Types.Number}
        },
        notes: {trim: true, type: mongoose.Schema.Types.String}
    }, 

    sale_payment: [{
        advance: {trim: true, type: mongoose.Schema.Types.Number},
        balance: {trim: true, type: mongoose.Schema.Types.Number},
        due: {trim: true, type: mongoose.Schema.Types.Number}, 
        date: {trim: true, type: mongoose.Schema.Types.Date}
    }],

    share: {
        share_date: {trim: true, type: mongoose.Schema.Types.Date},
        split: [{
            giorgio: {trim: true, type: mongoose.Schema.Types.Number},
            federico: {trim: true, type: mongoose.Schema.Types.Number}
        }]
    }
},{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
});

module.exports = mongoose.model('Inventories', inventorySchema);