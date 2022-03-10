

module.exports.sendResponse = function (err, data, res) {
  err ?
    res.status(500).send(err) :
    res.status(200).send(data);
}

function groupOnProperty (array, property) {
  result = {};
  array.forEach( (entry) => {
      if(!result[entry[property]]) {
          result[entry[property]] = [];
      }
      result[entry[property]].push(entry);
  })
  return result;
}

module.exports.arrangeQuestionData = function (questions, answers, photos) {
  let answer_pool = groupOnProperty(answers, 'id_questions');
  let photo_pool = groupOnProperty(photos, 'id_answers');

  answers.forEach((a) => a.photos = photo_pool[a.id] || []);
  questions.forEach((q) => q.answers = answer_pool[q.id] || []);
  return questions;
}

// module.exports.arrangeAnswerData = function (answers, photos) {
//   let photo_pool = groupOnProperty(photos, 'id_answers');

//   answers.forEach((a) => a.photos = photo_pool[a.id] || []);
//   return answers;
// }