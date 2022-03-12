const express = require('express');
const axios = require('axios');
const db = require('../db/index.js');
const utils = require('./utils.js');
const _settings = require('../_settings.js');

const app = express();
const PORT = _settings.serverPort;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get(`/${_settings.loaderio_key}`, (req, res) => { res.send(_settings.loaderio_key); });

// GET QUESTIONS
app.get('/shopdata/qa/questions', (req, res) => {
  let product_ids = [ req.query.product_id ];

  let questions = db.getQuestionsForProduct({ product_ids });
  let answers = db.getAnswersForProduct({ product_ids });
  let photos = db.getPhotosForProduct({ product_ids });

  Promise.all([questions, answers, photos])
    .then((arr)=>{
      let data = utils.arrangeQuestionData(arr[0], arr[1], arr[2]);
      utils.sendResponse(null, data, res);
  })
    .catch((err)=>utils.sendResponse(err, null, res));
});

// POST A QUESTION
app.post('/shopdata/qa/questions', (req, res) => {
  const params = {
    product_id: req.body.product_id,
    body: req.body.body,
    date_written: Date.parse(new Date()),
    asker_name: req.body.asker_name,
    asker_email: req.body.asker_email,
   }
  db.postQuestion(params)
    .then(() => utils.sendResponse(err, data, res))
    .catch((err) => utils.sendResponse(err, null, res));

});

// GET ANSWERS
// app.get('/shopdata/qa/answers', async (req, res) => {
//   let question_ids = [ req.query.question_id ];

//   let answers = await db.getAnswers({ question_ids });
//   let photos = await db.getPhotos({ answer_ids: answers.map((a)=>a.id)});

//   res.send(arrangeAnswerData(answers, photos));
// });

// MARK QUESTION AS HELPFUL
// app.put('/shopdata/qa/questions/helpful', (req, res) => {
//   const params = { question_id: req.body.question_id }
//   db.putQuestionHelpful(params,
//     (err, data) => sendResponse(err, data, res));
// });

// MARK ANSWER AS HELPFUL
// app.put('/shopdata/qa/answers/helpful', (req, res) => {
//   const params = { answer_id: req.body.answer_id }
//   db.putAnswerHelpful(params,
//     (err, data) => sendResponse(err, data, res));
// });

// REPORT QUESTION
// app.put('/shopdata/qa/questions/report', (req, res) => {
//   const params = { question_id: req.body.question_id }
//   db.putQuestionReported(params,
//     (err, data) => sendResponse(err, data, res));
// });

// REPORT ANSWER
// app.put('/shopdata/qa/answers/report', (req, res) => {
//   const params = { answer_id: req.body.answer_id }
//   db.putAnswerReported(params,
//     (err, data) => sendResponse(err, data, res));
// });

// POST AN ANSWER (should post multiple photos too)
// app.post('/shopdata/qa/answers', (req, res) => {
//   const params = {
//     question_id: req.body.question_id,
//     body: req.body.body,
//     date_written: Date.parse(new Date()),
//     answerer_name: req.body.answerer_name,
//     answerer_email: req.body.answerer_email,
//    }
//   db.postAnswer(params,
//     (err, data) => sendResponse(err, data, res));
// });

app.listen(PORT, () => {
  // console.log(`Server listening on port: ${PORT}`);
});

module.exports.app = app;