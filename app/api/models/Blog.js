/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'the_primary_key'
        },
        message: {
            type: 'string',
            size:700 
        },
        username: {
            type: 'string',
            size:50
        },
        photo: {
            type: 'string',
            size:30
        }
    }
};

