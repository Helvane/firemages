/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
module.exports = {

    createphoto:function(req,res){
        var params = req.params.all();

         console.log(params);

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
