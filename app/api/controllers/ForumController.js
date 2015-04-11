/**
 * ForumController
 *
 * @description :: Server-side logic for managing forums
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs=require('fs');

module.exports = {
	create:function(req,res){
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
                var filename = mydate.getTime() + params.imagetype;
                console.log("filename = "+filename);
                fs.link(files[0].fd, "./.tmp/public/forum/" +filename, function(err){
                    fs.rename(files[0].fd, "./assets/forum/" +filename, function(err){
                        //console.log("error = " +err);
                    });
                });

                Forum.create({topic:param.topic,userid:userID,title:param.title,summary:param.summary,photo:filename})
                    .exec(function createCB(err, created) {

                        return res.json(created);
                    });



            }
        });
    }
};

