const request = require('supertest');
const express = require('express');
const app = require('../server/index.js');

// const app = express();
// app.listen(3000);
// beforeall aftereach afterall

describe("get questions route", () => {

  test("it should return a 200 reponse code", async () => {
    const response = await request(app)
      .get('/shopdata/qa/questions')
      .send({product_id: 1})
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  // test("it should return a json response", () => { });
  // test("it should return an object with a body property", () => { });
  // test("it should return an object with a product_id property", () => { });
});

// describe("get answers route", () => {

// });

// describe("put questions route", () => {

// });

// describe("put answers route", () => {

// });

