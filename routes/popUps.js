var express = require('express');
var router = express.Router();

var popUps = require('../models/popUp.js');


router.get('/', function indexAction(req, res) {
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
router.get('/new', function newAction(req, res) {
    res.render('popUps/new');
});
// create popUps here I have listed all of the things that will appear in a form. 
//If nothing is provided, it will still post, and I can go back and delete it through the
//app or edit it
router.post('/', function createAction(req, res) {
	console.log("The name from the request is: " + req.body.name);
    var newPopUp = new popUps({
        name: req.body.name,
        cuisine:req.body.cuisine,
        location: req.body.location,
        hours: req.body.hours,
        additional: req.body.additional
    });
    newPopUp.save(function(err){
        if (err) { console.log(err); }

        console.log(newPopUp.id);
     
       res.redirect('popUps/' + newPopUp.id)
    });
});
// edit popUps
router.get('/:id/edit', function editAction(req,res) {
    popUps.findById(req.params.id)
    .exec(function(err, popUps) {
        if (err) { console.log(err); }

        res.render('popUps/edit', {
            popUps: popUps
        });
    });
});
// update popUps
router.patch('/:id', function updateAction(req, res) {
    popUps.findByIdAndUpdate(req.params.id, {
    	name: req.body.name,
        cuisine:req.body.cuisine,
        location: req.body.location,
        hours: req.body.hours,
        additional: req.body.additional
    
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
// delete popUps. Once the pop up is deleted it will redirect you to
// to the home page
router.delete('/:id', function destroyAction(req, res) {
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
router.get('/:id', function showAction(req, res) {
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
