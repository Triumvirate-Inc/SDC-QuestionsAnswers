const postgres = require('postgres');
// const sql = postgres({
//   host: 'localhost',
//   port: 5432,
//   path: '/tmp',
//   username: 'doug',
//   database: 'postgres'
// });

const sql = postgres();


module.exports.getQuestions = async function(params, callback) {
  const data = await sql`
  select * from questions where
    product_id = ${params.product_id}
    and not reported
  `;
  callback(null, data);
}

module.exports.getAnswers = async function(params, callback) {
  const data = await sql`
  select * from answers where
    id_questions = ${params.question_id}
    and not reported
  `;
  callback(null, data);
}