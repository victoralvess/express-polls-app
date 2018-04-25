const mongoose = require('mongoose');
const {Schema} = mongoose;
const Choice = require('./choice');

const schema = new Schema({
  question: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, required: true},
});

schema.methods.getChoices = () => {
  return Choice.find({question_id: this.id});
};

let Question = mongoose.model('question', schema);

module.exports = Question;
