const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');
const jsonpatch = require('jsonpatch');
const sharp = require('sharp');
const fs = require('fs');
const request = require('request');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());



//Login User
router.post('/login',(req,res) => {
    if(req.body.email && req.body.password){
        var token = jwt.sign({id:req.body.email},config.secert,{expiresIn:3600});
        res.send({auth:true,token:token})
    }
})

//JSON Patch
router.get('/jsonpatch',(req,res) => {
    var token = req.headers['x-access-token']
    if(!token) res.send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send({auth:false,token:'Invalid Token Provided'});
        let mydoc = {
            "baz": "qux",
            "foo": "bar"
        }
        let thepatch = [
            { "op": "replace", "path": "/baz", "value": "boo" }
        ]
        let patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
        res.status(200).send(patcheddoc)
    })
});

//imageConvert
router.get('/imageConvert',(req,res) => {
    var token = req.headers['x-access-token']
    if(!token) res.send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send({auth:false,token:'Invalid Token Provided'});
        let download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
          };
    
        download(req.query.url, 'userInput.png', function(err,data){
            sharp('userInput.png').resize(50,50) 
            .jpeg({quality : 50}).toFile('output_thumb.jpg'); 
            res.status(200).send(`Paste Url in browser to download image "http://localhost:5001/api/auth/imageOutput"`);
        })
    });
});

router.get('/imageOutput',(req,res) => {
    fs.readFile('output_thumb.jpg',function(err,data){
        if(err)  throw err;
        res.write(data);
        res.end();
    })
});

module.exports = router;