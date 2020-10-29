# Your task is to build a simple stateless microservice in Node Js, with three major functionalities -
> Authentication
> JSON patching
> Image Thumbnail Generation

Technology use > NodeJs
Npm Packages > body-parser, cors, express, jsonpatch, jsonwebtoken, request, sharp


# Application have 3 end point
> To Authenticate the user
(POST) > http://localhost:5001/api/auth/login
(body) > {"email":"abc@gmail.com","password":"12345678"}
(repsponse) > 
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE2MDM5OTg1MzQsImV4cCI6MTYwNDA4NDkzNH0.WqfRqhcWVjkxPRH6nTmAsQ9WKJ__r1BDTqWJRF4rtCw"
}
Token is valid for one hour after each login

![alt text](https://i.ibb.co/1TQnmzB/Screenshot-2020-10-30-at-1-01-14-AM.png)

> JSON patching
(GET)  > http://localhost:5001/api/auth/jsonpatch
(Header) > ['x-access-token':'token generated in first call']
(response) > {
    "baz": "boo",
    "foo": "bar"
}

> Image Thumbnail Generation
(GET) > http://localhost:5001/api/auth/imageConvert
(Pass Query params) (?url=https://cdn.idsitnetwork.net/wp-content/uploads/sites/27/2019/01/flower-shop-fields-of-romance-148245.jpg)
(Header) > ['x-access-token':'token generated in first call']
(response) > Paste Url in browser to download image "http://localhost:5001/api/auth/imageOutput"

> Check Image output
(GET) > http://localhost:5001/api/auth/imageOutput
(Response) > Converted Image