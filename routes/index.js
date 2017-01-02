var express = require('express');
var FCM = require('fcm-node');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('indexFunpage.html');
    res.render('index', { title: 'Express' });
    var url = "https://www.facebook.com/plugins/fan.php?connections=100&id=GDG-Mobile-Warszawa-225630997872269";
    // res.send("hello world");
});

router.get('/account', function (req, res) {
    var accountMock = {
        "username": "tieorange",
        "password": "qwerty",
        "twitter": "tieorange"
    }
    if (!req.query.username) {
        return res.send({
            "status": "error",
            "message": "missing username"
        });
    } else if (req.query.username != accountMock.username) {
        return res.send({
            "status": "error",
            "message": "wrong username"
        });
    } else {
        return res.send(accountMock);
    }
});

router.post('/notification', function (req, res) {
    var deviceTokenEmulator = "fs5O5HoGKok:APA91bGnj2dKlQ0QfFnCtRU9LvhQyTbWnnw5PFLqzR6emb7r1hTCuZiD6CnLJ7ntu9wts-hZXBSkjH8A1n6bsTHqzmeyznN9pbwO1I88co-GPKsrT5F_X6P3hguA1QcZzZTVWYddXqac"
    var deviceTokenPixel = "cvmUMcMamrQ:APA91bHcvSV2xDUjqYT48g_CI3lxelIGtRwDbZrhkCVlj7L6Lrnn3pn9GlaQMT2CKRsMjyWAEsvaxD5skbLktpEuc8h7zMrES5vVK49LQy1zmwfArV6qMkKsq6oRnF1sSZT0nWlMbC33"
    var deviceToken5X = "cvmUMcMamrQ:APA91bHcvSV2xDUjqYT48g_CI3lxelIGtRwDbZrhkCVlj7L6Lrnn3pn9GlaQMT2CKRsMjyWAEsvaxD5skbLktpEuc8h7zMrES5vVK49LQy1zmwfArV6qMkKsq6oRnF1sSZT0nWlMbC33"
    var serverKey = "AAAA-Qaz-e8:APA91bHXGHIbaxoAYzSY0fWPsDA3fvNC9x0_Xa1ent9H9jYbYX-EciOOE3RrHGwMaLg_NeZ96hdZmH_H56uSgEFtNwsVZgQpZ03X-O3o3V5PMwHtHPPq37iDmNfvddBa6HDIk9gOWmGg74gHX0wg-snMas5RvFt0LA"

    var fcm = new FCM(serverKey);

    var mobile_tokens = [];
    mobile_tokens.push(deviceTokenPixel);

    var message = {
        to: deviceTokenPixel,
        notification: {
            title: "title",
            body: req.body
        }
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error!!!", err.message);
        } else {
            console.log("Success!!");
        }
    })


    res.send("notif");

});

module.exports = router;
