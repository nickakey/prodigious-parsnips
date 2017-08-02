const models = require('../models');
var faker = require('faker');

var collectUsers = [];

let createUsers = (username = faker.internet.userName()) => {
  new models.Users({
    username: username,
    snooze: faker.random.boolean(),
  }).save();
};

let createSubreddits = (title, description, upvote_threshold, location_threshold) => {
  new models.Subreddits({
    title: title,
    description: description,
    upvote_threshold: upvote_threshold,
    location_threshold: location_threshold
  }).save();
};

let createMessage = (text, title, type, post_id, geotag, upvotes, subreddit_id, user_id ) => {
  new models.Messages({
    text: text,
    title: title,
    type: type,
    post_id: post_id,
    geotag: geotag,
    upvotes: upvotes,
    subreddit_id: subreddit_id,
    user_id: user_id
  }).save();

};

let createUserPreferences = (upvote_threshold, location_threshold = Math.floor(Math.random() * 5) + 1, notification_limit = Math.floor(Math.random() * 5) + 1) => {
  new models.User_preferences({
    upvote_threshold: upvote_threshold,
    location_threshold: location_threshold,
    notification_limit: notification_limit,
  }).save();

};

let createAdminPreferences = (upvote_threshold, location_threshold, notification_limit) => {
  new models.Admin_preferences({
    upvote_threshold: upvote_threshold,
    location_threshold: location_threshold,
    notification_limit: notification_limit,
  }).save();

};

let Users_Subreddits_Prefs = (user_id, user_preference_id, admin_preference_id, subreddit_id) => {
  new models.Users_subreddits_prefs({
    user_id: user_id,
    user_preference_id: user_preference_id,
    admin_preference_id: admin_preference_id,
    subreddit_id: subreddit_id
  }).save();

};


let createNotifications = (knex, id) => {
  new models.Notifications({
    notification_message_id: Math.floor(Math.random() * 10) + 1,
    user_id: Math.floor(Math.random() * 10) + 1,
    seen: faker.random.boolean()
  }).save();
};


exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('Notifications').del()
  .then(()=>{
    return knex('Message').del();
  })
  .then(()=> {
    return knex('Users_Subreddits_Prefs').del();
  })  

  .then(()=> {
    return knex('User_Preferences').del();
  })
  .then(()=> {
    return knex('Subreddits').del();
  })
  .then(()=> {
    return knex('Users').del();
  })
  .then(()=> {
    return knex('Admin_Preferences').del();
  })

  .then(() => {
    let records = [];


    createUsers('nick');
    createSubreddits('CNN', 'Breaking news', 5, 6);
    createUserPreferences(5, 5, 10);
    createAdminPreferences(7, 11, 4);
    createMessage(
     'Warning: There is a wild man dancing on the street corner on Market!',
     'Wild Man On Street Corner', 
     'post',
      null, 
      '{"altitudeAccuracy":-1,"accuracy":5,"heading":-1,"longitude":-122.406417,"altitude":0,"latitude":37.785834,"speed":-1}',
      10,
      1, 
      1
    );
    createMessage(
     'Warning: Someone is peeing on the street!',
     'What will we do!', 
     'post',
      null, 
      '{"altitudeAccuracy":-1,"accuracy":5,"heading":-1,"longitude":-122.406417,"altitude":0,"latitude":37.785834,"speed":-1}',
      3,
      1, 
      1
    );
    Users_Subreddits_Prefs(1, 1, 1, 1);


    createSubreddits('K911', 'Lost pups', 5, 6);
    createUserPreferences(5, 5, 5);
    createAdminPreferences(7, 11, 4);
    createMessage(
     'Found small pug in starbucks',
     'I was ordering a coffee, and I found a cute little pug!', 
     'post',
      null, 
      '{"altitudeAccuracy":-1,"accuracy":5,"heading":-1,"longitude":-122.406417,"altitude":0,"latitude":37.785834,"speed":-1}',
      6,
      2, 
      1
    );
    createMessage(
     'I found a rat???',
     'I found what I think is a rat. At Subway.', 
     'post',
      null, 
      '{"altitudeAccuracy":-1,"accuracy":5,"heading":-1,"longitude":-122.406417,"altitude":0,"latitude":37.785834,"speed":-1}',
      4,
      2, 
      1
    );
    Users_Subreddits_Prefs(1, 2, 2, 2);
    
    //person is admin
    
  
  //   createUsers('nick');
  //   createSubreddits('Animal Lovers', 'a place for animal lovers to go', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('not really no...', 'the best yet!', 'post', null, 'x445 y555', 3, 1, 1);
  //   //person is admin
  //   Users_Subreddits_Prefs(1, 1, 1, 1 );

  //   createUsers();
  //   createSubreddits('hockey jocks', 'mustangs', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('let us get real right now', 'the best around',  'post', null, 'x445 y555', 8, 1, 2);
  //   //userid, userprefid, adminprefid, subredditid
  //   Users_Subreddits_Prefs(2, 2, null, 1 );


  //   createUsers();
  //   createSubreddits('Baseball Conversations', 'explorers', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('crazy dancing', 'the best around','post', null, 'x445 y555', 9, 2, 3);
  //   Users_Subreddits_Prefs(3, 3, null, 1 );

  //   createUsers();
  //   createSubreddits('little peeople', 'yeh', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('what the hell?', 'the best around','post', null, 'x445 y555', 6, 2, 4);
  //   Users_Subreddits_Prefs(4, 4, null, 1 );

  //   createUsers();
  //   createSubreddits('india pale ales', 'food on food on foo', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('milfred?', 'talking with joe','post', null, 'x445 y555', 5, 3, 5);
  //   Users_Subreddits_Prefs(5, 5, null, 1 );  





  //   createUsers();
  //   createSubreddits('movies', 'bagels in the am', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('woah there doggie', 'unbelievable','post', null, 'x445 y555', 5, 4, 6);
  //   //person is admin
  //   Users_Subreddits_Prefs(6, 6, 2, 2 );  

  //   createUsers();
  //   createSubreddits('card games', 'eatin good in the ...', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('janie has a gone', 'get it right','post', null, 'x445 y555', 5, 4, 7);
  //   Users_Subreddits_Prefs(7, 7, null, 2 ); 

  //   createUsers();
  //   createSubreddits('bowcasters', 'pancakes are nice', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('people people people', 'the best around','post', null, 'x445 y555', 5, 4, 8);
  //   Users_Subreddits_Prefs(8, 8, null, 2 );

  //   createUsers();
  //   createSubreddits('mathletes', 'san francisco', 5, 6);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('do not ask', 'the best around','post', null, 'x445 y555', 5, 4, 9);
  //   Users_Subreddits_Prefs(9, 9, null, 2 ); 




  //   createUsers();
  //   createSubreddits('Lord of the Rings Lords', 'a place where animals do not belong', 5, 10);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('woah there doggie', 'where is the salt?','post', null, 'x445 y555', 5, 2, 6);
  //   Users_Subreddits_Prefs(10, 10, null, 3 ); 

  //   createUsers();
  //   createSubreddits('killa joe', 'meat is good', 5, 11);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('by by babie', 'this is great billie','post', null, 'x445 y555', 5, 2, 7);
  //   Users_Subreddits_Prefs(11, 11, null, 3 ); 

  //   createUsers();
  //   createSubreddits('builer bob the builder', 'build apps', 5, 12);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('people talk', 'no joe no','post', null, 'x445 y555', 5, 3, 8);
  //   //person is admin
  //   Users_Subreddits_Prefs(12, 12, 3, 3 );

  //   createUsers();
  //   createSubreddits('the cookie squad', 'cooking in the kitchen', 5, 13);
  //   createUserPreferences(10, 3, 2);
  //   createAdminPreferences(7, 11, 4);
  //   createMessage('yella', 'the best around','post', null, 'x445 y555', 5, 4, 9);
  //   Users_Subreddits_Prefs(13, 13, null, 3 );                   

    

  //  createMessage('yella', 'the best around','comment', 1, 'x445 y555', 5, 1, 9);
  // createMessage('more', 'yeah no','comment', 1, 'x445 y555', 5, 1, 9);
  //  createMessage('do it again!', 'oh yeah','comment', 1, 'x445 y555', 5, 1, 9);
  //  createMessage('riiiiight', 'lets not','comment', 1, 'x445 y555', 5, 1, 9);
  // createMessage('you lie', 'lets do it','comment', 1, 'x445 y555', 5, 1, 9);

  //  createMessage('it is not really', 'great post','comment', 2, 'x445 y555', 5, 1, 2);
  //  createMessage('yella', 'the best around','comment', 2, 'x445 y555', 5, 1, 3);
  // createMessage('more', 'yeah no','comment', 2, 'x445 y555', 5, 1, 4);
  //  createMessage('do it again!', 'oh yeah','comment', 2, 'x445 y555', 5, 1, 1);
  //  createMessage('riiiiight', 'lets not','comment', 2, 'x445 y555', 5, 1, 1);
  // createMessage('you lie', 'lets do it','comment', 2, 'x445 y555', 5, 1, 1);
  //  createMessage('it is not really', 'great post','comment', 1, 'x445 y555', 5, 1, 1);


  //  createNotifications();
  //  createNotifications();
  //  createNotifications();
  //  createNotifications();
  //  createNotifications();
  //  createNotifications();
  //  createNotifications();
  //  createNotifications();



   // Users_Subreddits_Prefs(1, 10, null, 3 );                   
   // Users_Subreddits_Prefs(2, 9, null, 3 );                   
   // Users_Subreddits_Prefs(3, 8, null, 3 );                   
   // Users_Subreddits_Prefs(4, 7, null, 3 ); 
   // Users_Subreddits_Prefs(5, 6, null, 3 );                   
                   


  }).catch((err) => {
    console.log('err:', err);
  });

};
