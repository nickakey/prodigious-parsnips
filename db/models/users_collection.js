const db = require('../');

const User = db.Model.extend({
  tableName: 'Users',
  messages: function() {
    return this.hasMany('Message', 'user_id');
  },
  subreddits: function() {
    return this.belongsToMany('Subreddit').through('Users_Subreddits_Prefs', 'user_id', 'subreddit_id');
  },
  user_preferences: function() {
    return this.belongsToMany('User_Preferences').through('Users_Subreddits_Prefs', 'user_id', 'user_preference_id ');
  },
  admin_preferences: function() {
    return this.belongsToMany('Admin_Preferences').through('Users_Subreddits_Prefs', 'user_id', 'admin_preference_id');
  },
  notifications: function() {
    return this.hasMany('Notification', 'user_id');
  },
 
  users_subreddits_prefs: function() {
    return this.hasMany('Users_Subreddits_Prefs', 'user_id');
  }
 });

module.exports = db.model('User', User);
