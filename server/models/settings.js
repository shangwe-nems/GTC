const mongoose =  require('mongoose');

const locationSchema = mongoose.Schema(
	{
        _id: mongoose.Schema.Types.ObjectId,
        name: {trim: true, type: mongoose.Schema.Types.String},
        details: {trim: true, type: mongoose.Schema.Types.String}
    },
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);

const weightSchema = mongoose.Schema(
	{
        _id: mongoose.Schema.Types.ObjectId,
        value: {trim: true, type: mongoose.Schema.Types.String},
        label: {trim: true, type: mongoose.Schema.Types.String}
    },
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);

const lengthSchema = mongoose.Schema(
	{
        _id: mongoose.Schema.Types.ObjectId,
        value: {trim: true, type: mongoose.Schema.Types.String},
        label: {trim: true, type: mongoose.Schema.Types.String}
    },
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);

const sellersSchema = mongoose.Schema(
	{
        _id: mongoose.Schema.Types.ObjectId,
        name: {trim: true, type: mongoose.Schema.Types.String},
        phone: {trim: true, type: mongoose.Schema.Types.String},
        email: {trim: true, type: mongoose.Schema.Types.String},
    },
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);

const clientsSchema = mongoose.Schema(
	{
        _id: mongoose.Schema.Types.ObjectId,
        name: {trim: true, type: mongoose.Schema.Types.String},
        phone: {trim: true, type: mongoose.Schema.Types.String},
        email: {trim: true, type: mongoose.Schema.Types.String},
    },
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);

const percentsSchema = mongoose.Schema(
	{
        office_percent: {trim: true, type: mongoose.Schema.Types.String},
        partner_percent: {trim: true, type: mongoose.Schema.Types.String},
    },
	{
		strict: true,
		versionKey: false,
		timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
	}
);





const Location = mongoose.model('Location', locationSchema);
const Weight = mongoose.model('Weight', weightSchema);
const Length = mongoose.model('Lenght', lengthSchema);
const Seller = mongoose.model('Seller', sellersSchema);
const Client = mongoose.model('Client', clientsSchema);
const Percent = mongoose.model('Percent', percentsSchema);


module.exports = { Location, Weight, Length, Seller, Client, Percent };