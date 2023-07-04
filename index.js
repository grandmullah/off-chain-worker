const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./controllers')


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 4000

app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


