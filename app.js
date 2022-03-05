const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

//express app

const app = express();

//CONNECT TO MONGO
const dbURI = 'mongodb+srv://kiche1:kiche1@nodeapp.dw7tv.mongodb.net/nodeapp?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))
.catch(err => console.log(err));

//registering the view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');
//listening for requests



//middleware and static files
app.use(express.static('public'));
// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();

///post middleware for acceptinf form data
app.use(express.urlencoded({ extended:true}));


//invoking morgan
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) =>{
    res.redirect('/blogs');
    // const blogs = [
    //     {title: 'About Flutter', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'About React', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'About Node Js', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index', {title: 'Home', blogs});
});
// })

// app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//    const blog = new Blog({
//        title: 'new blog 2',
//        snippet: 'about my new blog',
//        body: 'more about my new blog'
//    });

//    blog.save()
//    //it eturns a promise
//    .then((result) => {
//        res.send(result)
//    })
//    .catch((err) => {
//        console.log(err)
//    });
// });
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     //async process so we call the then method to invoke the call-back function that calls on result when its finished
//     .then((result) => {
//         //send the response to the browser  which shoud be a list of docs
//         res.send(result);
//     })
//     //catch method to fie the error

//     .catch((err) => {
//         console.log(err);
//     });
// })


// //single blogs
// app.get('/single-blog', (req, res) => {
//     //using the blog module
//     Blog.findById('62209859f885cb47bdbfbfd2')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })
// //routing

// app.get('/', (req, res) => {
//     res.redirect('/blogs');
// });
// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
    
    
app.get('/about', (req, res) =>{

        // res.send('<h1>About page</h1>');
        res.render('about', { title: 'About' });
    });

// });

//blog routes

//redirects for express

// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// }) 


//use the blog routes
app.use('/blogs',   blogRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})