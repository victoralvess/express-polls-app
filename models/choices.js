const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  choice_text: {type: String, required: true},
  votes: {type: Number, default: 0},
  question: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('choices', schema);

