const db = require('../');

const Message = db.Model.extend({
  tableName: 'Message',
  subreddit: function() {
    return this.hasOne('Subreddit'); 
  },
  upvotes: function() {
    return this.hasMany('Upvote');
  },
  users: function() {
    return this.hasOne('User', 'user_id');
  }
});


module.exports = db.model('Message', Message);


const getMessagesBySubredditId = subid => { 
  return new Promise((resolve, reject) => {
    Message.where('subreddit_id', subid)
    .fetch()
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
};


const createPost = (userid, title, text, geotag, subid) => { 
  return new Promise((resolve, reject) => {
    let message = new Message({
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

const createComment = (userid, title, text, geotag, postid) => { 
  return new Promise((resolve, reject) => {
    let message = new Message({
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


// createPost(4, 'best cat', 'this is the best cat! cute', 'x1455, 72309', 4)
// .then((data)=> {
//   console.log('this is data ', data);
// });

// createComment(4, 'this cat is the best?', 'this cat is trash!', 'x1455, 3424', 4)
// .then((data)=> {
//   console.log('this is data ', data);
// });


// getMessagesBySubredditId(3)
// .then((msg)=>{
//   console.log(msg)  
// })
