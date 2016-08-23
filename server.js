const http         = require('http'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env,
      express = require('express'),
      url = require('url'),
      favicon = require('serve-favicon'),
      Busboy = require('busboy'),
      request = require('request'),
      fs = require('fs'),
      app = express();



  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

app.use(favicon(__dirname + '/app/img/favicon.ico'));
app.use(express.static('uploads'));
app.use('/', express.static(__dirname + '/app'));

app.get('/health', function(req, res) {
 res.writeHead(200);
    res.end();
});

app.use('/', express.static(__dirname + '/app'));

app.use('/img', express.static(process.env.OPENSHIFT_DATA_DIR));

app.get('/info/gen', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

app.get('/info/pol', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});


app.post('/upload', function(req, res) {

        var fstream;

        var albumID;
        var files = [];
        var access_token;

        var busboy = new Busboy({headers: req.headers});

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('Field [' + fieldname + ']: value: ' + val);
            if (fieldname == 'albumID') albumID = val;
            if (fieldname == 'access_token') access_token = val;

        });

        busboy.on('file', function (fieldname, file, filename) {
            console.log(file);
            fstream = fs.createWriteStream(process.env.OPENSHIFT_DATA_DIR + filename);
            files.push(filename);
            file.pipe(fstream);

            fstream.on('close', function(){
                console.log('file ' + filename + ' uploaded');

            });
        });

        busboy.on('finish', function(){

            console.log('files length = ' + files.length);
            console.log('albumID = ' + albumID);
            console.log('access_token = ' + access_token);

            files.forEach(function(item, i, arr) {


                //Lets configure and request
                request({
                    url: 'https://graph.facebook.com/v2.4/' + albumID + '/photos', //URL to hit
                    qs: {
                        url: 'http://facebookgaleryapp-sevas727.rhcloud.com/img/' + item,
                        access_token: access_token
                    }, //Query string data
                    method: 'POST' //Specify the method
                }, function(error, response, body){
                    if(error) {
                        console.log(error);
                    } else {

                        var filePath = process.env.OPENSHIFT_DATA_DIR + item;

                        fs.unlinkSync(filePath);

                        console.log(response.statusCode, body);
                    }
                });

            });


            console.log('finish, files uploaded ', files);
            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end();
        });
        req.pipe(busboy);





});

app.listen('3000', function(){
    console.log('running on 3000...');
});
