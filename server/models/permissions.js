const mongoose = require('mongoose');

const permissionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_type: {trim: true, type: mongoose.Schema.Types.String},
    role_description: {trim: true, type: mongoose.Schema.Types.String},
    identification: {trim: true, type: mongoose.Schema.Types.String},

    ALL: {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    COMM: {trim: true, type: mongoose.Schema.Types.Boolean, default: false},

    PCF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    PGAF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    PUF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    PDF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},

    SGAF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: true},
    SCLOCF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SCUNTF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SCPRCNTGF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SCSLRZF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SCCLNTSF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SULOCF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SUUNTF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SUPRCNTGF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SUSLRZF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    SUCLNTSF:  {trim: true, type: mongoose.Schema.Types.Boolean, default: false},

    UCF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    ULIF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    UGAF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    
    CHNGSTTSF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GCF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUIMGF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUVIDF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUIDF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUPRCHZF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUTRTMNTF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUPOSF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUSLF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GUSHRF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},

    GGAF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GGF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    GDF : {trim: true, type: mongoose.Schema.Types.Boolean, default: false},
    
    user_id: {
        trim: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }, 
},{
    strict: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updateAt: 'updateAt' }
})

module.exports = mongoose.model('Permissions', permissionsSchema);

