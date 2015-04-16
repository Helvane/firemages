/**
 * ForumanswerController
 *
 * @description :: Server-side logic for managing forumanswers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create:function(req, res){
        var param=req.params.all();
        var userID=req.session.userid;
        Forumanswer.create({answer:param.answer, forumid:param.forumid, userid:userID}).exec(function(err, created){
           return res.json(created);
        });


    },

    getAnswer:function(req, res){
        var param=req.params.all();
        Forumanswer.find({forumid:param.forumid}).populateAll().sort('id desc').exec(function(err, result){
           return res.json(result);
        });
    }
};

