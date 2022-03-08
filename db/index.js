const postgres = require('postgres');
// const sql = postgres({
//   host: 'localhost',
//   port: 5432,
//   path: '/tmp',
//   username: 'doug',
//   database: 'postgres'
// });

const sql = postgres();

// const question_fields = `questions.id, questions.product_id, questions.body, questions.date_written, questions.asker_name, questions.asker_email, questions.reported, questions.helpful`;

// const answer_fields = 'answers.id, answers.id_questions, answers.body, answers.date_written, answers.answerer_name, answers.answerer_email, answers.reported, answers.helpful';

module.exports.getQuestions = async function(params, callback) {
  const limit = params.limit || 5;
  const page = params.page || 1;
  const data = await sql`
  select * from questions where
    product_id = ${params.product_id}
    and not reported
    limit ${limit} offset ${(page - 1) * limit}
  `;
  // callback(null, data);
  return data;
}


module.exports.getAnswers = async function(params, callback) {
  const limit = params.limit || 5;
  const page = params.page || 1;
  const data = await sql`
  select * from answers where
    id_questions = ${params.question_id}
    and not reported
    limit ${limit} offset ${(page - 1) * limit}
  `;
  // console.log('here', data);
  // callback(null, data);
  return data;
}

module.exports.getPhotos = async function(params, callback) {
  // const limit = params.limit || 5;
  // const page = params.page || 1;
  const data = await sql`
  select * from photos where
    id_answers = ${params.answer_id}
  `;
  // console.log('here', data);
  // callback(null, data);
  return data;
}

module.exports.putQuestionHelpful = async function(params, callback) {
  const data = await sql`
    update questions
      set helpful = helpful + 1
      where id = ${params.question_id}
  `;
  callback(null, data);
}

module.exports.putAnswerHelpful = async function(params, callback) {
  const data = await sql`
    update answers
      set helpful = helpful + 1
      where id = ${params.answer_id}
  `;
  callback(null, data);
}

module.exports.putQuestionReported = async function(params, callback) {
  const data = await sql`
    update questions
      set reported = 1
      where id = ${params.question_id}
  `;
  callback(null, data);
}

module.exports.putAnswerReported = async function(params, callback) {
  const data = await sql`
    update answers
      set reported = 1
      where id = ${params.answer_id}
  `;
  callback(null, data);
}

module.exports.postQuestion = async function(params, callback) {
  const data = await sql`
    insert into questions
      (product_id, body, date_written, asker_name, asker_email)
      values
      (${params.product_id}, ${params.body}, ${params.date_written}, ${params.asker_name}, ${params.asker_email})
  `;
  callback(null, data);
}