/**
* Forumanswer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      'answer':{
          type:'string',
          size:4000,
          required:true
      },
      forumid:{
          model:'forum'
      },
      userid:{
          model:'users'
      }
  }
};

