/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    id: {
        type: 'integer',
        unique: true,
        primaryKey: true,
        colomnName: 'the_primary_key'
    },
  attributes: {
      lastname: {
          type: 'string',
          size:50
      },
      firstname: {
          type: 'string',
          size:50
      },
      username: {
          type: 'string',
          size:30
      },
      password: {
          type: 'string',
          size:100
      },
      email: {
          type: 'string',
          size:200,
          unique:true
      },
      photo:{
          type:'string',
          size:50
      }


  }
};

