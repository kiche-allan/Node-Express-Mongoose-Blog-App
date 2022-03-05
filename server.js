const http = require ('http');
const fs = require('fs');
const _= require('lodash');

const server = http.createServer((req, res) => {
    
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet =  _.once(() => {
        console.log('hello');
    });

    greet();
    greet();
    //set header content type
    res.setHeader('Content-Type', 'text/html');

    //figuring the path 

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
             //setting status codes
             res.statusCode = 200;
            break;
            case '/about':
                path += 'about.html';
                 //setting status codes
            res.statusCode = 200;
                break;
                case '/about-me':
                
                 //setting status codes
            res.statusCode = 301;
            //actual riderect by response header
            res.setHeader('Location', '/about');
            res.end();
                break;
            default:
                path += '404.html';
                 //setting status codes
            res.statusCode = 404;
                break;

    }

    //send an html file

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //we can use this when sending multiple items
            // res.write(data);

           

            res.end(data);
        }
    })
})

    // res.write('<head><link rel ="stylesheet" href = "#"></head>');
    // //writing content to header
    // res.write('<p> hello allan </p>');
    // res.write('<p> hello again allan </p>');
    // //ending resoinse thet sends to the browser
    // res.end();



server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000')
});