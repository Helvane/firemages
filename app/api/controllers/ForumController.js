/**
 * ForumController
 *
 * @description :: Server-side logic for managing forums
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var easyimg = require('easyimage');
var fs=require('fs');

module.exports = {
    create:function(req,res){
        var param=req.params.all();
        var userID=req.session.userid;
        Forum.create({topicid:param.topicid,userid:userID,title:param.title,summary:param.summary,lock:param.lock})
            .exec(function createCB(err, created) {

                return res.json(created);
            });

    },
	createphoto:function(req,res){
        var param=req.params.all();
        var userID=req.session.userid;


        req.file('photo').upload(function (err, files) {
            if (err) {
                return res.serverError(err);
            } else {

                if (!fs.existsSync('./.tmp/public/forum')) {
                    fs.mkdir('./.tmp/public/forum', function (err) {
                        console.log("Create a new folder forum");
                        console.log(err);
                    });
                }

                if (!fs.existsSync('./assets/forum')) {
                    fs.mkdir('./assets/forum', function (err) {
                        console.log("Create a new folder forum");
                        console.log(err);
                    });
                }

                var mydate = new Date();
                var filename = mydate.getTime() + param.imagetype;
                console.log("filename = "+filename);
                fs.link(files[0].fd, "./.tmp/public/forum/" +filename, function(err){
                    fs.rename(files[0].fd, "./assets/forum/" +filename, function(err){

                        var srcimage='./assets/forum/'+filename;

                        easyimg.info(srcimage).then(
                            function(file) {
                                if(file.width > 600) {
                                    easyimg.rescrop(
                                        {
                                            src:srcimage, dst:srcimage,
                                            width:600, height:500,
                                            gravity:'NorthWest'
                                        },
                                        function(err, stdout, stderr) {
                                            if (err) throw err;
                                            console.log('Resized and cropped');
                                        }
                                    );
                                }
                            }, function (err) {
                                console.log(err);
                            }
                        );
                    });
                });

                Forum.create({topicid:param.topicid,userid:userID,title:param.title,summary:param.summary,photo:filename,lock:false})
                    .exec(function createCB(err, created) {

                        console.log(created)

                        return res.json(created);
                    });



            }
        });
    },

    getTopic:function(req,res){
        Topic.find().exec(function(err,result){
           return res.json(result);
        });
    },
    getForum:function(req, res){
        var param=req.params.all();
        var topicid=param.topicid;
        Forum.find({"topicid":topicid}).populateAll().sort('id desc').exec(function(err,result){

           return res.json(result);
        });
    },
    getAForum:function(req, res){
        var param=req.params.all();
        Forum.findOne({id:param.forumid}).populateAll().exec(function(err,result){
            return res.json(result);
        });
    },
    getMediaForum:function(req, res){
        var param=req.params.all();
        Forum.find({topic:param.topic}).populateAll().sort('id desc').exec(function(err,result){
            return res.json(result);
        });
    },
    lockForum:function(req, res){
        var param=req.params.all();
        Forum.update({id:param.forumid},{lock:param.lock}).exec(function(err,result){
            return res.json(result);
        });
    },

    gettotalpost:function(req, res){
        var param=req.params.all();
        var total=0;
        Forum.count({userid:param.userid}).exec(function(err, result){
            total=result;
            Forumanswer.count({userid:param.userid}).exec(function(err,output){
                total=total+output;
                return res.json(total);
            });
        });
    },

    edit:function(req, res){
        var param=req.params.all();
        Forum.update({id:param.forumid},{title:param.title,summary:param.summary}).exec(function(err,result){
            return res.json(result);
        });
    },
    counttopic:function(req, res){
        var param=req.params.all();
        var subcat=param.subcat;

        if(!subcat) {
            var topicid = param.topicid;
            Forum.count({'topicid': topicid}).exec(function (err, result) {
                return res.json(result);
            });
        } else {


            Forum.count({'topicid':subcat}).exec(function (err, result) {
                return res.json(result);
            });
        }
    },

    lastpost:function(req, res){
        var param=req.params.all();
        var mytopic=[];
        var subcat=param.subcat;
        if(!subcat){
            mytopic=param.topicid;
        } else {
            mytopic=subcat;
        }
        Forum.findOne({topicid:mytopic}).populateAll().sort('id desc').exec(function(err,result){
            if(result) {
                Forumanswer.findOne({forumid: result.id}).populateAll().sort('id desc').exec(function (err, output) {
                    if (output) {
                        output.id=result.id;
                        output.title=result.title;
                        return res.json(output);
                    } else {
                        return res.json(result);
                    }

                });
            } else {
                return res.json(result);
            }

        });
    },
    addtotalviews:function(req, res){
      var param=req.params.all();
      Forum.findOne({id:param.forumid},{totalviews:1,id:1}).exec(function(err,result){
         if (result){
             var total=parseInt(result.totalviews) + 1;
             if(isNaN(total)){
                 total=1;
             }
             Forum.update({id:param.forumid},{totalviews:total}).exec(function(err,output){
                return res.json(output)
             });
         }
      });
    },

    acceptapplication:function(req,res){
        var param=req.params.all();

    }

};

