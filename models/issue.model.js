const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
    title: {type: String, required: true},
    text: {type: String, required: true},
    creator: {type: String, required: true},
    assigned_to: {type: String, required: false},
    status_text: {type: String, required: false},
    created_on: {type: Date, default: Date.now},
    updated_on: {type: Date, default: Date.now},
    open: {type: Boolean, default: true}  
});

module.exports = mongoose.model('Issue', IssueSchema);