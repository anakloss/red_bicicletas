const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
       type: Date,
       required: true,
       default: Date.now, 
       expires: 43200 //This token will delete after a period of time (43200 in this case)
    },
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario'}
});

module.exports = mongoose.model('Token', tokenSchema);