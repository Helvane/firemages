/**
* Pindata.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      forumid: {
          model:'forum',
          required:true,
          unique:true
      },
      userid: {
          model:'users',
          required:true
      }

  }
};

