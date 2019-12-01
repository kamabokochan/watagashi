const express = require('express')
const app = express()
const port = 3000
const rp = require('request-promise')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('./client/dist'))

// CORSを許可
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const options = {
  url: 'http://localhost:8080/v2/pet/1',
  method: 'GET'
};

let Pet = {};

(async () => {
  try {
    Pet = await rp(options);
    app.get('/v2/pet/1', function (req, res) {
      res.send(Pet)
    })
  } catch (error) {
    console.log(error);
  }
})();

app.post('/test', function (req, res) {
  Pet = req.body
})

app.listen(process.env.PORT || port);