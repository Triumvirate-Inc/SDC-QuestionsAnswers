const postgres = require('postgres');
const sql = postgres();

// const question_fields = `questions.id, questions.product_id, questions.body, questions.date_written, questions.asker_name, questions.asker_email, questions.reported, questions.helpful`;

// const answer_fields = 'answers.id, answers.id_questions, answers.body, answers.date_written, answers.answerer_name, answers.answerer_email, answers.reported, answers.helpful';

module.exports.getQuestionsForProduct = async function(params) {
  // const limit = params.limit || 5;
  // const page = params.page || 1;
  try {
    let data = await sql`
      select * from questions
      where product_id in (${ params.product_ids })
      and not reported
    `;
    return data;
  } catch (err) { return err; }
}

module.exports.getAnswersForProduct = async function(params) {
  try {
    let data = await sql`
      select
        answers.id, answers.id_questions, answers.body, answers.date_written, answers.answerer_name, answers.answerer_email, answers.reported, answers.helpful
      from answers right join questions
        on answers.id_questions = questions.id
      where
        questions.product_id in (${params.product_ids})
        and not questions.reported
        and not answers.reported
    `;
    return data;
  } catch (err) { return err; }
}

module.exports.getPhotosForProduct = async function(params) {
  try {
    let data = await sql`
      select
        photos.id, photos.id_answers, photos.url
      from photos left join
        ( answers right join questions on answers.id_questions = questions.id )
        on photos.id_answers = answers.id
      where
        questions.product_id in (${params.product_ids})
        and not questions.reported
        and not answers.reported
    `;
    return data;
  } catch (err) { return err; }
}

module.exports.postQuestion = async function(params) {
  try {
    let data = await sql`
      insert into questions
        (product_id, body, date_written, asker_name, asker_email)
        values
        (${params.product_id}, ${params.body}, ${params.date_written}, ${params.asker_name}, ${params.asker_email})
    `;
    return data;
  } catch (err) { return err; }
}

// module.exports.getAnswers = async function(params) {
//   const limit = params.limit || 5;
//   const page = params.page || 1;
//   return await sql`
//     select * from answers
//     where id_questions in (${ params.question_ids })
//     and not reported
//   `;
// }

// module.exports.getPhotos = async function(params) {
//   return await sql`
//     select * from photos
//     where id_answers in (${ params.answer_ids })
//   `;
// }

// module.exports.putQuestionHelpful = async function(params, callback) {
//   const data = await sql`
//     update questions
//       set helpful = helpful + 1
//       where id = ${params.question_id}
//   `;
//   callback(null, data);
// }

// module.exports.putAnswerHelpful = async function(params, callback) {
//   const data = await sql`
//     update answers
//       set helpful = helpful + 1
//       where id = ${params.answer_id}
//   `;
//   callback(null, data);
// }

// module.exports.putQuestionReported = async function(params, callback) {
//   const data = await sql`
//     update questions
//       set reported = 1
//       where id = ${params.question_id}
//   `;
//   callback(null, data);
// }

// module.exports.putAnswerReported = async function(params, callback) {
//   const data = await sql`
//     update answers
//       set reported = 1
//       where id = ${params.answer_id}
//   `;
//   callback(null, data);
// }

// module.exports.postAnswer = async function(params, callback) {
//   const data = await sql`
//     insert into answers
//       (id_questions, body, date_written, answerer_name, answerer_email)
//       values
//       (${params.question_id}, ${params.body}, ${params.date_written}, ${params.answerer_name}, ${params.answerer_email})
//   `;
//   callback(null, data);
// }