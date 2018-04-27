const mongoose = require('mongoose');
const {Schema} = mongoose;
const Choice = require('./choice');

const schema = new Schema({
  question: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, required: true},
});

class Question {
  choices() {   
    return Choice.find({question_id: this._id});
  }
}

schema.loadClass(Question);

module.exports = mongoose.model('question', schema);
