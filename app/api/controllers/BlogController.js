/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
    getblog:function(req,res){
       Blog.find().exec(function(err,result){
           return res.json(result);
       });
         }


};
