/**
* Inbox.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      senderid: {
          model:'users'
      },
      userid: {
          model:'users'
      },
        message:{
          type:'string',
          size:1000,
          required:true
      }



  }
};

