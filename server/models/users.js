const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		active: {
			trim: true,
			type: mongoose.Schema.Types.Boolean,
			default: true
		},
		first_name: {
			trim: true,
			type: mongoose.Schema.Types.String,
			maxlength: 20
		},
		last_name: {
			trim: true,
			type: mongoose.Schema.Types.String,
			maxlength: 20
		},
		function: {
			trim: true,
			type: mongoose.Schema.Types.String,
			maxlength: 50
		},
		gender: {
			trim: true,
			type: mongoose.Schema.Types.String,
			enum: ['Male', 'Female', 'Other'],
			default: 'Other',
			required: true
		},
		email: {
			type: mongoose.Schema.Types.String,
			trim: true,
			index: true,
			required: true,
			unique: 1
		},
		password: {
			type: mongoose.Schema.Types.String,
			trim: true,
			required: true,
			select: true,
		},
		user_type: {
			trim: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Permissions',
			required: false
		},
		commissionned: {
			trim: true,
			type: mongoose.Schema.Types.Boolean,
		},
		agent_commission: {
			trim: true,
			type: mongoose.Schema.Types.Number
		},
		imgProfile: {
			type: mongoose.Schema.Types.String,
			trim: true,
		},
		accessToken: {
			type: mongoose.Schema.Types.String
		},
		tokenExp: {
			type: mongoose.Schema.Types.Date
		}
	},
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);

userSchema.pre('save', function(next) {
	var user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.generateToken = function(cb) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), 'secret');
	var oneHour = moment().add(12, 'hour').toISOString();

	user.tokenExp = oneHour;
	user.accessToken = token;
	user.save(function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

userSchema.statics.findByToken = function(token, cb) {
	var user = this;
	jwt.verify(token, 'secret', function(err, decode) {
		user.findOne({ _id: decode, accessToken: token }, function(err, user) {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
