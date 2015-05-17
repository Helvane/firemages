/**
* Forum.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      topic: {
          model:'topic'
      },
      userid: {
          model:'users'
      },
      title: {
          type:'string',
          size:100,
          required:true
      },
      summary:{
          type:'string',
          size:5000,
          required:true
      },
      photo:{
          type:'string',
          size:30
      },
      lock:{
          type:'boolean',
          defaultsTo:false
      }
  }
};

