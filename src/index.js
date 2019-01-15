const express = require('express');
const path = require('path');
const multer = require('multer');


// Initialization
const app = express();


// Setting
app.set('port', 3000);
const port = app.get('port');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Image manager Middleware
const storage_directory = path.join(__dirname, 'public/uploads');

const storage_config = multer.diskStorage(
    {
        destination: storage_directory,
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }
);

const multer_config = multer(
    {
        storage: storage_config
    }
).single('image');

app.use(multer_config);


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
        console.log(req.file);
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
