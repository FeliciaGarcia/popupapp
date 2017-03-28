var express = require('express');
var router = express.Router();

var Schema = require('../models/popUp.js');
var popUps = Schema.popUps;


router.get('/', function(req, res) {
    // res.send('this is working');
    popUps.find({})
        .exec(function(err, popUps) {
            if(err) console.log(err);

            console.log(popUps);
            // res.send(popUps);
            res.render('popUps/index', {
                  popUps: popUps
            });
        });
});

// new popUps
router.get('/new', function(req, res) {
    res.render('popUps/new');
});
// create popUps
router.post('/', function(req, res) {
	console.log("The name from the request is: " + req.body.name);
    var newPopUp = new popUps({
        name: req.body.name,
        cuisine:req.body.cuisine,
        location: req.body.location,
        hours: req.body.hours,
        photo: req.body.photo,
        // pic: req.body.pic
    });
    newPopUp.save(function(err){
        if (err) { console.log(err); }

        console.log(newPopUp.id);
     
       res.redirect('popUps/' + newPopUp.id)
    });
});
// edit popUps
router.get('/:id/edit', function(req,res) {
    popUps.findById(req.params.id)
    .exec(function(err, popUps) {
        if (err) { console.log(err); }

        res.render('popUps/edit', {
            popUps: popUps
        });
    });
});
// update popUps
router.patch('/:id', function(req, res) {
    popUps.findByIdAndUpdate(req.params.id, {
    	name: req.body.name,
        cuisine:req.body.cuisine,
        location: req.body.location,
        hours: req.body.hours,
        photo: req.body.photo
        // pic: req.body.pic
}, {new: true})
        .exec(function(err, popUps) {
            if (err) { console.log(err); }

            console.log(popUps);
            res.send(popUps);
             res.render('popUps/show', {
                popUps: popUps
            });
        });
});
// delete popUps
router.delete('/:id', function(req, res) {
    popUps.findByIdAndRemove(req.params.id)
        .exec(function(err, popUps) {
            if (err) { console.log(err); }

            console.log('popUps deleted.');
            // res.send('popUps deleted.');
            // redirect back to the index route
            res.redirect('/popUps');  
        });
});
// show popUps
router.get('/:id', function(req, res) {
    popUps.findById(req.params.id)
        .exec(function(err, popUps) {
            if(err) console.log(err);

            console.log(popUps);
            // res.send(popUps);
            res.render('popUps/show', {
            	popUps: popUps
            });
        });
});



module.exports = router;
