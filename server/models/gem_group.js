const mongoose = require('mongoose');

const batchesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    seller_name: {trim: true, type: mongoose.Schema.Types.String},
    seller_phone: {trim: true, type: mongoose.Schema.Types.String},
    purchase_note: {trim: true, type: mongoose.Schema.Types.String},
    length_unit: {trim: true, type: mongoose.Schema.Types.String, default: 'mm', required: true},
    gem_variety: {trim: true, type: mongoose.Schema.Types.String},
    pieces: {trim: true, type: mongoose.Schema.Types.Number},
    total_weight: {trim: true, type: mongoose.Schema.Types.Number},
    weight_unit: {trim: true, type: mongoose.Schema.Types.String, default: 'g', required:true},
    price_per_unit: {trim: true, type: mongoose.Schema.Types.Number},
    total_price: {trim: true, type: mongoose.Schema.Types.Number},
    grand_total_price: {trim: true, type: mongoose.Schema.Types.Number},
    total_comm_price: {trim: true, type: mongoose.Schema.Types.Number},

    user_id: {
        trim: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }, 
    gems: [
        {
            trim:true, 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Inventories',  
            required: true
        }
    ]
},{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
})

module.exports = mongoose.model('Batches', batchesSchema);

