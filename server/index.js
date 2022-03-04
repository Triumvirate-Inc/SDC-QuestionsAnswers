const express = require('express');
const axios = require('axios');
// const auth = require('../config');

const app = express();
const PORT = 3000 || process.env.PORT;

// app.use(express.static('client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// const headers = { authorization: auth.key };
// const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

// GET ALL PRODUCTS
// app.get('/api/all_products', (req, res) => {
//   axios({
//     method: 'GET',
//     url: `${baseUrl}/products/`,
//     headers,
//   }).then((axiosResponse) => res.send(axiosResponse.data));
// });

// GET PRODUCT
// app.get('/api/product', (req, res) => {
//   axios({
//     method: 'GET',
//     url: `${baseUrl}/products/${req.query.product_id}`,
//     headers,
//   }).then((axiosResponse) => res.send(axiosResponse.data));
// });


//------------------------------------------------------------------------------

// GET QUESTIONS
app.get('/shopdata/qa/questions', (req, res) => {
  res.send('here-a we go!');
  // query questions table for questions matching product_id param
  // limit count based on page and count params
  // write returned data as JSON to res.body (res.send(JSON))
});

// GET ANSWERS
app.get('/shopdata/qa/answers', (req, res) => {
  // query answers table for answers matching question_id param
  // limit count based on page and count params
  // write returned data as JSON to res.body (res.send(JSON))
});

// MARK QUESTION AS HELPFUL
app.put('/shopdata/qa/questions/:id', (req, res) => {
  // to increment data, do we have to query it, increment it, and re-insert it?
  // is question_id in the body, or is it in the params?  I think it's in the body
  // eventually this needs to be user-specific so you can only do it once.  May need a users table.
});

// MARK ANSWER AS HELPFUL
app.put('/shopdata/qa/answers/:id/helpful', (req, res) => {
  // to increment data, do we have to query it, increment it, and re-insert it?
  // is answer_id in the body, or is it in the params?  I think it's in the body
  // eventually this needs to be user-specific so you can only do it once.  May need a users table.
});

// REPORT ANSWER
app.put('/shopdata/qa/answers/:id/report', (req, res) => {
  // should this be a "extract boolean and toggle it" or a "straight up PUT request as reported"?
  // thinking this shouldn't be user-specific
  // req.body.answer_id
});

// REPORT QUESTION
app.put('/shopdata/qa/questions/:id/report', (req, res) => {
  // should this be a "extract boolean and toggle it" or a "straight up PUT request as reported"?
  // thinking this shouldn't be user-specific
  // req.body.answer_id
});

// POST AN ANSWER
app.post('/shopdata/qa/answers/:id', (req, res) => {
});

// POST A QUESTION
app.post('/shopdata/qa/questions', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});