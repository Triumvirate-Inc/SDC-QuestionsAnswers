import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';


export const requests = new Counter('http_reqs');

export const options = {
  stages: [
    { target: 10, duration: '10s' },
  ],
};

export default function () {

  let product_id = Math.ceil(Math.random()*3000000);
  const res = http.get(`http://localhost:3000/shopdata/qa/questions?product_id=${product_id}`);


  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
