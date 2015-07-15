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
        Forumanswer.find({forumid:param.forumid}).populateAll().sort('id asc').paginate({page:param.page}).exec(function(err, result){
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
        Pindata.findOne({forumid:param.forumid}).exec(function(err,output){
           // if the data exist
           if(output){
               // delete
               Pindata.destroy({forumid:param.forumid}).exec(function(err,result){
                  result.todo='delete';
                  return res.json(result);
               });
           } else {
               // insert date into mongo DB
               Pindata.create({forumid:param.forumid,userid:userID}).exec(function(err, result){
                   result.todo='create';
                   return res.json(result);
               });
           }
        });

    },
    getpin:function(req, res){
        var param=req.params.all();
        var userID=req.session.userid;
        Pindata.find().populateAll().exec(function(err, result){
           var temp=[];
           var i=0;
            if(result) {
                for (var k = 0; k < result.length; k++) {
                    if(result[k].forumid) {
                        if (result[k].forumid.topicid == param.topicid) {
                            temp[i] = result[k];
                            i++;
                        }
                    }
                }
            }
           return res.json(temp);

        });
    },

    getapin:function(req, res){
        var param=req.params.all();
        var userID=req.session.userid;
        Pindata.findOne({forumid:param.forumid}).exec(function(err, result){
            return res.json(result);
        });
    },

    getcountforum:function(req, res){
        var param=req.params.all();
        var subcat=param.subcat;
        var mytopic=[];
        if(!subcat) {
           mytopic=param.topicid;
        } else {
           mytopic=subcat;
        }
        Forum.find({topicid:mytopic}).exec(function(err,output){
           var temp=[];
           if(output.length > 0) {
               for (var i = 0; i < output.length; i++) {
                   temp[i] = output[i].id;
               }
               ;
               Forumanswer.count({forumid: temp}).exec(function (err, result) {
                   return res.json(result);
               });
           } else {
               return res.json(0);
           }
        });

    },

    lastanswer:function(req,res){
        var param=req.params.all();
        Forumanswer.findOne({forumid:param.forumid}).populateAll().sort('id desc').exec(function(err,result){
           return res.json(result);
        });
    },

    getcountreply:function(req,res){
        var param=req.params.all();
        Forumanswer.count({forumid:param.forumid}).exec(function(err,result){
            return res.json(result);
        });
    }
};

