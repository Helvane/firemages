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
          size:30,
          unique:true
      },
      password: {
          type: 'string',
          required: true,
          minLength: 6
      },
      email: {
          type: 'string',
          size:200


      },
      steamid: {
          type: 'string',
          size:200

      },
      photo:{
          type:'string',
          size:50
      },
      status:{
          type: 'string',
          size:30

      }


  },

    beforeCreate: function (attrs, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(attrs.password, salt, function(err, hash) {
                if (err) return next(err);

                attrs.password = hash;
                next();
            });
        });
    }


};

