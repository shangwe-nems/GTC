const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const { User } = require('../models/users');
const Permissions = require('../models/permissions');

exports.authentication = (req, res) => {
    res
		.status(200)
		.json({
			_id: req.userData._id,
			isAuth: true,
			email: req.userData.email,
			first_name: req.userData.first_name,
			last_name: req.userData.last_name,
			gender: req.userData.gender,
			function: req.userData.function,
			commissionned: req.userData.commissionned,
			agent_commission: req.userData.agent_commission,
			createdAt: req.userData.createdAt,
			image: req.userData.imgProfile,
			token: req.userData.accessToken,
			tokenExp: req.userData.tokenExp, 
            user_type : req.userPermission
		});
}

exports.create_permission = (req, res, next) => {
	if (!req.userPermission.PCF)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

	const permission = new Permissions({
		_id: new mongoose.Types.ObjectId(),
		user_type: req.body.user_type,
		role_description: req.body.role_description,
		identification: req.body.identification,

		PCF: req.body.PCF,
		PGAF: req.body.PGAF, 
		PUF: req.body.PUF,
		PDF: req.body.PDF,

		SCLOCF: req.body.SCLOCF,
		SCUNTF: req.body.SCUNTF,
		SCPRCNTGF: req.body.SCPRCNTGF,
		SCSLRZF: req.body.SCSLRZF,
		SCCLNTSF: req.body.SCCLNTSF,
		SULOCF: req.body.SULOCF,
		SUUNTF: req.body.SUUNTF,
		SUPRCNTGF: req.body.SUPRCNTGF,
		SUSLRZF: req.body.SUSLRZF,
		SUCLNTSF: req.body.SUCLNTSF,

		UCF : req.body.UCF,
		ULIF : req.body.ULIF,
		UGAF : req.body.UGAF,
		
		GCF : req.body.GCF,
		GUF : req.body.GUF,
		GUIMGF : req.body.GUIMGF,
		GUVIDF : req.body.GUVIDF,
		GUIDF : req.body.GUIDF,
		GUPRCHZF : req.body.GUPRCHZF,
		GUTRTMNTF : req.body.GUTRTMNTF,
		GUPOSF : req.body.GUPOSF,
		GUSLF : req.body.GUSLF,
		GUSHRF : req.body.GUSHRF,

		GGAF : req.body.GGAF,
		GGF : req.body.GGF,
		GDF : req.body.GDF,
		
		user_id: req.userData._id
	});

	permission.save((err, doc) => {
        if (err) return res.status(500).json({ success: false, err });
        return res.status(200).json({ success: true, data: doc });
	});
}

exports.get_all_permissions = (req, res, next) => {
	if (req.userPermission.PGAF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

	Permissions.find()
		.sort({createdAt: -1})
		.exec()
		.then(result => {
			if (!result) return res.status(404).json({ success: true, result: [] });
			return res.status(201).json({success: true, result});
		})
		.catch(err => {
			return res.status(500).json({
				success: false,
				err
			})
		})
}

exports.update_permission = (req, res, next) => {
	if (req.userPermission.PUF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

	const id = req.params.id;
	const dataToUpdate = req.body;

	Permissions.findByIdAndUpdate(id, dataToUpdate, {safe: true, upsert: true, new: true}, (err, docs) => {
		if(err) {
			res.status(403).json({
				success: false,
				message: err.message,
				error_code: 403
			})
		} else {
			res.status(201).json({success: true, result: docs})
		}
	})
}

exports.delete_permission = (req, res, next) => {
	if (req.userPermission.PDF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})
	
	const id = req.params.id;

	Permissions.findByIdAndDelete(id, {safe: true, upsert: true, new: true}, (err, docs) => {
		if(err) {
            res.status(403).json({success: false, message: 'Failed to delete', error: err, error_code: 403});
        } else {
            res.status(201).json({success: true, result: docs});
        }
	})
}

exports.register = (req, res, next) => {
	if (req.userPermission.UCF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})

    const user = new User({
		_id: new mongoose.Types.ObjectId(),
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		function: req.body.function,
		gender: req.body.gender,
		email: req.body.email,
		password: req.body.password,
        imgProfile: req.file.path,
		user_type: req.body.user_type,
		commissionned: req.body.commissionned,
		agent_commission: req.body.agent_commission
	});

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, data: doc });
	});
};

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) return res.json({ loginSuccess: false, message: 'Auth failed, email not found' });

		if (!user.active) 
			return res.status(403).json({
				success:false,
				message: 'Your access has been revoked!'
			});
		

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong user email or password' });
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				// { httpOnly: true, secure: true }
				res.cookie('w_authExp', user.tokenExp, { httpOnly: true, secure: true });
				res
					.cookie('w_auth', user.accessToken, { httpOnly: true, secure: true })
					.status(200)
					.json({
						loginSuccess: true,
						userId: user._id,
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						role: user.role,
						createdAt: user.createdAt,
						imgProfile: user.imgProfile,
						token: user.accessToken, 
                        permissions: user.permissions
					});
			});
		});
	}).catch(err => res.json({ loginSuccess: false, message: err }));
};

// get all the users for the sharing of data
exports.get_users = (req, res, next) => {
	if (req.userPermission.UGAF === false)
		return res.status(403).json({
			success: false,
			message: 'forbidden access'
		})
	
	User.find({ _id: { $nin: mongoose.Types.ObjectId(req.userData._id) } })
		.populate({path: 'permissions', model: 'Permissions'})
		.sort({createdAt: -1})
		.exec()
		.then(user => {
			if (!user) return res.json({ success: true, result: [] });

			const data = user.map(users => {
				return { userId: users._id, first_name: users.first_name, last_name: users.last_name, image: users.imgProfile, function: users.function, permissions: users.permissions };
			});

			console.log("Users: ", user);
			return res.status(201).json({ success: true, result: data });
		})
		.catch(err => {
			res.status(403).json({
                success: false,
                message: err.message,
                error_code: 403
            })
		})

	// User.find({ _id: { $nin: mongoose.Types.ObjectId(req.userData._id) } }, (err, user) => {
	// 	if (!user) return res.json({ success: true, result: [] });

	// 	const data = user.map(users => {
	// 		return { userId: users._id, first_name: users.first_name, last_name: users.last_name, image: users.imgProfile, function: users.function, permissions: users.permissions };
	// 	});

	// 	// console.log("Users: ", data);
	// 	return res.status(201).json({ success: true, result: data });
	// }).catch(err => res.json({ success: false, error: err }));
}

exports.logout = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.userData._id }, { accessToken: '', tokenExp: '' }, (err, doc) => {
		if (err) return res.json({ success: false, err });
		res.clearCookie('w_authExp');
		res
			.clearCookie('w_auth')
		 	.status(200).json({ success: true, message: "logout successful" });
	});
};