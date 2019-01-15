const express = require('express');

// Initialization
const app = express();

// Setting
app.set('port', 3000);
const port = app.get('port');
app.set('view engine', 'ejs');

// Start the server 
app.listen(
    port,
    () => {
        console.log("Server listening on port " + port);
    }
);
