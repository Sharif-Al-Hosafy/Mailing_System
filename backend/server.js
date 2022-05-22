const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('Sucess');
});

app.use('/', router);

app.listen(process.env.port || 5000, (req, res) => {
  console.log('Web Server is listening at port ' + (process.env.port || 5000));
});
