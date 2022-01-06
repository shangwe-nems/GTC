const mongoose = require('mongoose');
const moment = require('moment')

const { Location, Weight, Length, Seller, Client, Percent } = require('../models/settings');

exports.get_all_settings = async (req, res, next) => {
    if (req.userPermission.SGAF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    let locations = await Location.find().lean();
    let weight_units = await Weight.find().lean();
    let length_units = await Length.find().lean();
    let sellers = await Seller.find().lean();
    let clients = await Client.find().lean();
    let percents = await Percent.find().lean();

    return res.status(201).json({
        success: true,
        data: {
            weight_units,
            locations,
            length_units,
            clients,
            sellers,
            percents
        }
        
    })
}

exports.create_location = (req, res, next) => {
    if (req.userPermission.SCLOCF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const location  = new Location({
        _id: new mongoose.Types.ObjectId(),
        name:  req.body.name,
        details: req.body.details
         
    })

    location.save((err, doc) => {
        if(err) return res.status(500).json({ success: false, err});
        return res.status(200).json({success: true, data: doc });
    })
}

exports.create_weight_unit = (req, res, next) => {
    if (req.userPermission.SCUNTF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const weight  = new Weight({
        _id: new mongoose.Types.ObjectId(),
        value: req.body.value,
        label: req.body.label
    })

    weight.save((err, doc) => {
        if(err) return res.status(500).json({ success: false, err});
        return res.status(200).json({success: true, data: doc });
    })
}

exports.create_lenght_unit = (req, res, next) => {
    if (req.userPermission.SCUNTF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const length  = new Length({
        _id: new mongoose.Types.ObjectId(),
        value: req.body.value,
        label: req.body.label
    })

    length.save((err, doc) => {
        if(err) return res.status(500).json({ success: false, err});
        return res.status(200).json({success: true, data: doc });
    })
}

exports.create_seller = (req, res, next) => {
    if (req.userPermission.SCSLRZF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const seller  = new Seller({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    seller.save((err, doc) => {
        if(err) return res.status(500).json({ success: false, err});
        return res.status(200).json({success: true, data: doc });
    })
}

exports.create_client = (req, res, next) => {
    if (req.userPermission.SCCLNTSF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const client  = new Client({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    client.save((err, doc) => {
        if(err) return res.status(500).json({ success: false, err});
        return res.status(200).json({success: true, data: doc });
    })
}

exports.create_percents = (req, res, next) => {
    if (req.userPermission.SCPRCNTGF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const percent  = new Percent({
        office_percent: req.body.office_percent,
        partner_percent: req.body.partner_percent
    })

    percent.save((err, doc) => {
        if(err) return res.status(500).json({ success: false, err});
        return res.status(200).json({success: true, data: doc });
    })
}

exports.update_percents = (req, res, next) => {
    if (req.userPermission.SUPRCNTGF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

}

exports.update_clients = (req, res, next) => {
    if (req.userPermission.SUCLNTSF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

}

exports.update_seller = (req, res, next) => {
    if (req.userPermission.SUSLRZF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

}

exports.update_location = (req, res, next) => {
    if (req.userPermission.SULOCF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

}