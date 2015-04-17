/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var easyimg = require('easyimage');
var fs = require('fs');


module.exports = {

    createphoto:function(req,res){
        var params = req.params.all();

        if (!fs.existsSync('./assets/blogimages')) {
            fs.mkdir('./assets/blogimages', function (err) {
                console.log("Create a new folder blogimages");
                console.log(err);
            });
        }

        if (!fs.existsSync('./.tmp/public/blogimages')) {
            fs.mkdir('./.tmp/public/blogimages', function (err) {
                console.log("Create a new folder tmp blogimages");
                console.log(err);
            });
        }



        req.file('photo').upload(function (err, files) {
            if (err) {
                return res.serverError(err);
            } else {
                var mydate = new Date();
                var filename = mydate.getTime() + params.imagetype;
                console.log("filename = "+filename);
                fs.link(files[0].fd, "./.tmp/public/blogimages/" +filename, function(err){
                    fs.rename(files[0].fd, "./assets/blogimages/" +filename, function(err){
                        //console.log("error = " +err);
                    });
                });

                        Photo.create({"blogid":params.blogid,"filename": filename})
                        .exec(function createCB(err, created) {
                            var result = {};
                            result.photo = filename;
                            return res.json(result);
                        });



            }
        });
    }

};

