const models = require('../../db/models');

module.exports.turnOnSnoozeByUserId = (userid) => { 
  return new Promise((resolve, reject) => {
    let user = new models.Users({
      id: userid,
      snooze: true
    })
    .save()
    .then((snooze)=>{
      resolve(snooze);
    })
    .catch(err => {
      reject(err);
    });
  });
};


module.exports.turnOffSnoozeByUserId = (userid) => { 
  return new Promise((resolve, reject) => {
    let user = new models.Users({
      id: userid,
      snooze: false
    })
    .save()
    .then((snooze)=>{
      resolve(snooze);
    })
    .catch(err => {
      reject(err);
    });
  });
};


module.exports.getPreferencesByUserId = userid => { 
  return new Promise((resolve, reject) => {
    models.Users.where('id', userid)
    .fetch({withRelated: 'user_preferences'})
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
};


module.exports.getDataByUserId = userid => { 
  return new Promise((resolve, reject) => {
    models.Users.where('id', userid)
    .fetch({withRelated: ['subreddits', 'notifications', 'admin_preferences', 'user_preferences']})
    .then(data => {
        resolve(data);
     })
    .catch(err => {
      reject(err);
    });
  });
};
    


module.exports.updateUserPreferences = (adminTitle, userPreferenceId, upvoteThreshold, locationThreshold, notificationLimit) => { 
  
  if(adminTitle) {
    return new Promise((resolve, reject) => {
      let adminPreference = new models.Admin_preferences({
        id: userPreferenceId,
        upvote_threshold: upvoteThreshold,
        location_threshold: locationThreshold,
        notification_limit: notificationLimit
      })
      .save()
      .then((createdUserPref)=> {
        resolve(createdUserPref);
      })
      .catch(err => {
        reject(err);
      });
    });

  } else {
    return new Promise((resolve, reject) => {
      let userPreference = new models.User_preferences({
        id: userPreferenceId,
        upvote_threshold: upvoteThreshold,
        location_threshold: locationThreshold,
        notification_limit: notificationLimit
      })
      .save()
      .then((createdUserPref)=>{
        resolve(createdUserPref);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
};


module.exports.getMessagesBySubredditId = subid => { 
  return new Promise((resolve, reject) => {
    models.Messages.where('subreddit_id', subid)
    .fetchAll()
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
};

module.exports.getMessagesByPostId = postid => { 
  return new Promise((resolve, reject) => {
    models.Messages.where('subreddit_id', subid)
    //the below was left over from a merge conflict, not sure which one is right!
    // models.Messages.where('post_id', postid)
    .fetchAll()
    .then(data => {
      console.log('data from db call', data);
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
};


module.exports.createPost = (userid, title, text, geotag, subid) => { 
  return new Promise((resolve, reject) => {
    let message = new models.Messages({
      title: title,
      text: text,
      type: 'post',
      post_id: null,
      geotag: geotag,
      upvotes: 0,
      subreddit_id: subid,
      user_id: userid
    })
    .save()
    .then((createdMessage)=>{
      resolve(createdMessage);
    })
    .catch(err => {
      reject(err);
    });
  });
};

module.exports.createComment = (userid, title, text, geotag, postid) => { 
  return new Promise((resolve, reject) => {
    let message = new models.Messages({
      title: '',
      text: text,
      type: 'comment',
      post_id: postid,
      geotag: geotag,
      upvotes: 0,
      subreddit_id: null,
      user_id: userid
    })
    .save()
    .then((createdMessage)=>{
      resolve(createdMessage);
    })
    .catch(err => {
      reject(err);
    });
  });
};

module.exports.getNotificationsByUserId = (userid, geoLocation) => { 
  const results = {};
  return new Promise((resolve, reject) => {
    models.Users.where('id', userid)
    .fetch({withRelated: ['subreddits']})
    .then(data => {
        data.relations.subreddits.models.forEach((modelbase)=>{
          if (!results.subids) {
            results.subids = [];
          }
          results.subids.push(modelbase.attributes.id);
        });
        results.subids.forEach((subid, index)=>{
          models.Messages.where('subreddit_id', subid)
          .fetchAll()
          .then((messages)=>{
            // console.log('this is the length of results subids ', results.subids.length)
            // console.log('this is the index  ', index)
            if (!results.messages) {
              results.messages = [];
            }
            results.messages.push(messages);
            if (index === results.subids.length - 1) {
              console.log('we in here boy')
              console.log('this is reuslts messages ', results)
              resolve(results.messages);      
            }
          });
        });  
     })
    .catch(err => {
      reject(err);
    });
  });
};





