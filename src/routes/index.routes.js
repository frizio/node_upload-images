const { Router } = require('express');

const router = Router();

router.get(
    '/',
    (req, res) => {
        console.log("Get route /");
        res.render('index');
    }
);

router.post(
    '/upload',
    (req, res) => {
        console.log("Post on route /upload");
        console.log(req.file);
        res.send('File uploaded');
    }
);

module.exports = router;
