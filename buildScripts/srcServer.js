var express = require('express');
var path = require('path');
var open = require('open');
var port = 80;
var app = express();
var config = require('../webpack.config.dev')
/*import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'*/
const port = 80;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo :true,
  publicPath: config.output.publicPath
}))
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
app.get('/users', function(rea, res){
  //Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1, "firstName": "BOB", "lastName": "Smith", "email":"bob@gmail.com"},
    {"id": 2, "firstName": "TAMMY", "lastName": "Norton", "email":"tnorton@yahoo.com"},
    {"id": 3, "firstName": "TINA", "lastName": "Lee", "email":"lee.tina@hotmail.com"}
  ]);
});
app.listen(port, function(err){
  if(err){
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
