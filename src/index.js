const express = require('express');
const path = require('path');


// Initialization
const app = express();

// Setting
app.set('port', 3000);
const port = app.get('port');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get(
    '/',
    (req, res) => {
        console.log("Get route /");
        res.render('index');
    }
);

app.post(
    '/upload',
    (req, res) => {
        console.log("Post on route /upload");
        res.send('File uploaded');
    }
);

// Start the server 
app.listen(
    port,
    () => {
        console.log("Server listening on port " + port);
    }
);
