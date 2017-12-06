const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/app'));

app.listen(4001, () => {
  console.log('Server runing in port 4001');
});
