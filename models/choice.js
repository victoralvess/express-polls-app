const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  choice_text: {type: String, required: true},
  votes: {type: Number, default: 0},
  question_id: {type: String, required: true}
});

module.exports = mongoose.model('choices', schema);

