const mongoose = require('mongoose');
const {Schema} = mongoose;

const choicesSchema = new Schema({
  choice_text: {type: String, required: true},
  votes: {type: Number, default: 0}
});

const schema = new Schema({
  question: {type: String, required: true},
  choices: {type: [Schema.Types.ObjectId], required: true},
  author: {type: Schema.Types.ObjectId, required: true},
});

let Question = mongoose.model('questions', schema);

module.exports = Question;
