const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');

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
            const new_filename = uuid() + path.extname(file.originalname).toLowerCase();
            cb(null, new_filename);
        }
    }
);

const multer_config = multer(
    {
        storage: storage_config,
        limits: {
            fileSize: 1000000
        },
        fileFilter: (req, file, cb) => {
            const filetypes_expreg = /jpeg|jpg|png|gif/;
            const mimetype = filetypes_expreg.test(file.mimetype);
            const extname  = filetypes_expreg.test(path.extname(file.originalname)); 
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                return cb('Image format not allowed');
            }
        }
    }
).single('image');

app.use(multer_config);


// Routes
app.use(
    require('./routes/index.routes')
);

// Static files
// Public accessible url: http://localhost:3000/uploads/an_image.jpg
app.use(
    express.static(path.join(__dirname, 'public'))
);

// Start the server 
app.listen(
    port,
    () => {
        console.log("Server listening on port " + port);
    }
);
