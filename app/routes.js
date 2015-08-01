// app/routes.js
module.exports = function(app) {
    // =====================================
    // HOME PAGE
    // =====================================
    app.get('/', function(req, res) {
            res.render('index.ejs');
        });
    app.get('/chat', function(req, res) {
            res.render('chat.ejs');
        });
    app.get('/contact', function(req, res) {
            res.render('contact.ejs');
        });
    // app.post('/post', function(req, res) {
    //     var img = req.body;
    //     var dataFromImage = img.imageData;
    //     var data = dataFromImage.replace(/^data:image\/\w+;base64,/, "");
    //     var buf = new Buffer(data, 'base64');
    //     var stream = fs.createWriteStream('./views/image.png');
    //     stream. write(buf);
    //     stream.on("end", function(){
    //         stream.end();
    //     });


        // var img = req.body;
        // console.log(img);
        // var dataFromImage = img.imageData;
        // var data = dataFromImage.replace(/^data:image\/\w+;base64,/, "");
        // var buf = new Buffer(data, 'base64');
        // fs.writeFile('./views/image.png', buf);

        // res.redirect('/');

    // });//end of app.post
};//end of module.exports

