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
        Forum.create({topic:param.topic,userid:userID,title:param.title,summary:param.summary})
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

                Forum.create({topic:param.topic,userid:userID,title:param.title,summary:param.summary,photo:filename})
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
        Forum.find({topic:{'!':param.topic}}).populateAll().sort('id desc').exec(function(err,result){
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
    }

};

