'use strict';
const express = require('express');
const router = express.Router();
let controllers = require('../controllers').Controllers;



router.route('/')
  //this is where we would send API interaction instructions
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });


router.route('/user')
  .get((req, res) => {
    controllers.getDataByUserId(req.query.id)
    .then((data)=>{
      res.status(200)
      .send(data);
    });
  })
  .post((req, res) => {
    res.status(201)
    .send({ data: 'Posted!' });
  });


router.route('/settings')
  .get((req, res) => {
    controllers.getPreferencesByUserId(req.query.id)
    .then((data)=>{
      res.status(200)
      .send(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  })
  .post((req, res) => {
    controllers.updateUserPreferences(req.body.userPrefId, req.body.upvoteThreshold, req.body.locationThreshold)
    .then((data)=>{
      res.status(200)
      .send(data);
    })
    .catch((err)=>{
      console.log(err);
    });
    // res.status(200).send('this is settings!');
  });


router.route('/messages')
  .get((req, res) => {
    if(req.query.postId){
      controllers.getMessagesByPostId(req.query.postId)
      .then((data)=>{
        res.status(200)
        .send(data);
      })
      .catch((err)=>{
        console.log(err);
      });        
    } else {
      controllers.getMessagesBySubredditId(req.query.subredditId)
      .then((data)=>{
        res.status(200)
        .send(data);
      })
      .catch((err)=>{
        console.log(err);
      });      
    }
  })
  .post((req, res) => {
    if (req.body.subId) {
      controllers.createPost(req.body.userId, req.body.title, req.body.text, req.body.geotag, req.body.subId)
      .then((data)=>{
        res.status(201)
        .send(data);
      });
    } else {
      controllers.createComment(req.body.userId, req.body.title, req.body.text, req.body.geotag, req.body.postId)
      .then((data) => {
        console.log('is post_id-->?', data.attributes.post_id);
        controllers.getMessagesByPostId(data.attributes.post_id)
        .then((data) => {
          res.status(201)
          .send(data);
        })
        .catch((err) => {
          console.log(err);
        });         
      });
     }
   });


router.route('/notifications')
  .get((req, res) => {
    controllers.getNotificationsByUserId(req.query.userId, req.query.geoLocation)
    .then((data)=>{
      res.status(200).send(data);
    });
  });


router.route('/snooze')
  .post((req, res) => {
    if (req.body.toggle === 'on') {
      controllers.turnOnSnoozeByUserId(req.body.userId)
      .then((data)=>{
        res.status(201)
        .send(data);
      });
    } else {
      controllers.turnOffSnoozeByUserId(req.body.userId)
      .then((data)=>{
        res.status(201)
        .send(data);
      });
    }
  });


module.exports = router;
