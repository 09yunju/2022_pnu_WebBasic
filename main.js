const express = require('express')
const app = express()
const port = 3000

app.use('/public', express.static('public'))

app.get('/webapi/bestseller', function (req, res) {
    var request = require('request');
    var categoryId = req.query.categoryId;
    var options = {
        'method': 'GET',
        'url': "http://book.interpark.com/api/bestSeller.api?key=9202329BE7367E993610C9AEFF5753F722D729D5475489416D29BD0D424EAB16&categoryId=" + categoryId  + "&output=json",
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
});

app.get('/webapi/review', function (req, res) {
    var request = require('request');
    var query = req.query.query;
    var options = {
        'url': 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query),
        'headers': {"X-Naver-Client-id": "VA2Pl8jxicyX1DA6s2_M", "X-Naver-Client-Secret": "vaHDVfpPkm"}
    };
    request.get(options, function (error, response, body){
        if (!error && response.statusCode == 200){
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.get('/webapi/lib', function(req, res) {
    var request = require('request');
    var isbn = req.query.isbn;
    var options = {
        'method': 'GET',
        'url': "http://data4library.kr/api/libSrchByBook?authKey=6422302ff80ce588010cb508c3767d9825a0855bfbcb56e48b15656362dd79fb&isbn=" + isbn + "&region=21&format=json",
        'headers': {}
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    }); 
});

app.get('/webapi/lend', function(req, res) {
    var request = require('request');
    var libCode = req.query.libCode;
    var isbn13 = req.query.isbn13;
    var options = {
        'method': 'GET',
        'url': "http://data4library.kr/api/bookExist?authKey=6422302ff80ce588010cb508c3767d9825a0855bfbcb56e48b15656362dd79fb&libCode=" + libCode + "&isbn13=" + isbn13  + "&format=json",
        'headers': {}
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    }); 
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}/public/main.html`))