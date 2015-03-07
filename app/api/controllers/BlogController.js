/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');

module.exports = {

    create:function(req,res){
        var params = req.params.all();
        var userids = req.session.userid;
        var username = req.session.username;
        Blog.create({message: params.message, userid:userids
        }).exec(function createCB(err,created){
            return res.json({
                message:created.message, userid:created.userid, blogid:created.id
            });
        });
    },






    getblog:function(req,res){
       Blog.find({sort:"_id desc"}).populateAll().exec(function(err,result){
           return res.json(result);
       });
         }


};
