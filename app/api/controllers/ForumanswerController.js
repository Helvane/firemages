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
        Forumanswer.find({forumid:param.forumid}).populateAll().sort('id desc').paginate({page:param.page}).exec(function(err, result){
           return res.json(result);
        });
    },

    getcount:function(req, res){
        var param=req.params.all();
        Forumanswer.count({forumid:param.forumid}).exec(function(err, result){
            return res.json(result);
        });
    },

    delete:function(req, res){
        var param=req.params.all();
        Forumanswer.destroy({forumid:param.forumid}).exec(function(err, result){
           // return res.json(result);
        });

        Pindata.destroy({forumid:param.forumid}).exec(function(err, result){

        });

        Forum.destroy({id:param.forumid}).exec(function(err, result){
            return res.json(result);
        });

    },

    pin:function(req, res){
        var param=req.params.all();
        var userID=req.session.userid;
        Pindata.create({forumid:param.forumid,userid:userID}).exec(function(err, result){
            return res.json(result);
        });
    },
    getpin:function(req, res){
        var param=req.params.all();
        var userID=req.session.userid;
        Pindata.find().populateAll().exec(function(err, result){
            return res.json(result);
        });
    },

    getapin:function(req, res){
        var param=req.params.all();
        var userID=req.session.userid;
        Pindata.findOne({forumid:param.forumid}).exec(function(err, result){
            return res.json(result);
        });
    }
};

