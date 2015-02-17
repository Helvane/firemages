/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');

module.exports = {

    create:function(req,res){
        var params = req.params.all()
        Blog.create({message: params.message, username:params.username, photo:params.photo
        }).exec(function createCB(err,created){
            return res.json({
                message:created.message, username:created.username, photo:created.photo
            });
        });
    },




    createphoto:function(req,res){
        var params = req.params.all();


        req.file('photo').upload(function (err, files) {
            if (err) {
                return res.serverError(err);
            } else {
                fs.rename(files[0].fd, "./assets/blogimages/" +files[0].filename, function(err){
                    //console.log("error = " +err);
                });
                var myusers=Users.find({username:params.username});
                myusers.exec(function(error, result) {
                    if(result.length > 0) {
                        Blog.create({message: params.message, username: params.username,
                             photo: files[0].filename
                        }).exec(function createCB(err, created) {
                            var result = {};
                            result.message = created.message;
                            result.username = created.username;
                            result.photo = files[0].filename;
                            return res.json(result);
                        });

                    }
                });
            }
        });
    },

    getblog:function(req,res){
       Blog.find({sort:"_id desc"}).exec(function(err,result){
           return res.json(result);
       });
         }


};
