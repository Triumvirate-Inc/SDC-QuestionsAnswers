const postgres = require('postgres');
// const sql = postgres({
//   host: 'localhost',
//   port: 5432,
//   path: '/tmp',
//   username: 'doug',
//   database: 'postgres'
// });

const sql = postgres();

const product21 = [
  {
      "id": 80,
      "product_id": 21,
      "body": "Placeat eius culpa.",
      "date_written": 1603994511263,
      "asker_name": "Gail_Brown13",
      "asker_email": "Jamey_Emard13@yahoo.com",
      "reported": false,
      "helpful": 3,
      "answers": [
          {
              "id": 158,
              "id_questions": 80,
              "body": "Et ut dolor assumenda suscipit ea molestiae.",
              "date_written": 1607396954952,
              "answerer_name": "Mavis27",
              "answerer_email": "Syble_Mosciski79@hotmail.com",
              "reported": false,
              "helpful": 10,
              "photos": []
          },
          {
              "id": 159,
              "id_questions": 80,
              "body": "Quia qui accusantium omnis dolores recusandae tempore fugit.",
              "date_written": 1617035294090,
              "answerer_name": "Jamal59",
              "answerer_email": "Seller",
              "reported": false,
              "helpful": 11,
              "photos": [
                  {
                      "id": 33,
                      "id_answers": 159,
                      "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                  }
              ]
          }
      ]
  },
  {
      "id": 81,
      "product_id": 21,
      "body": "Sit deleniti dolorem suscipit voluptatem.",
      "date_written": 1614855953231,
      "asker_name": "Albert96",
      "asker_email": "Elian35@hotmail.com",
      "reported": false,
      "helpful": 14,
      "answers": []
  }
]

// const question_fields = `questions.id, questions.product_id, questions.body, questions.date_written, questions.asker_name, questions.asker_email, questions.reported, questions.helpful`;

// const answer_fields = 'answers.id, answers.id_questions, answers.body, answers.date_written, answers.answerer_name, answers.answerer_email, answers.reported, answers.helpful';

module.exports.getQuestions = async function(params) {
  const limit = params.limit || 5;
  const page = params.page || 1;
  return await sql`
    select * from questions
    where product_id in (${ params.product_ids })
    and not reported
  `;
}

module.exports.getAnswers = async function(params) {
  const limit = params.limit || 5;
  const page = params.page || 1;
  return await sql`
    select * from answers
    where id_questions in (${ params.question_ids })
    and not reported
  `;
}

module.exports.getPhotos = async function(params) {
  return await sql`
    select * from photos
    where id_answers in (${ params.answer_ids })
  `;
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