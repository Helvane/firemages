/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');

module.exports = {
    index:function(req,res){
        Users.find().exec(function(err,result){
            return res.json(result);
        });
    },

    create:function(req,res){
        var params = req.params.all();
        req.file('photo').upload(function (err, files) {
            if (err) {
                return res.serverError(err);
            } else {
                fs.rename(files[0].fd, "./assets/images/" +files[0].filename, function(err){
                    //console.log("error = " +err);
                });
                var myusers=Users.find({username:params.username});
                myusers.exec(function(error, result) {
                    if(result.length==0) {
                        Users.create({lastname:params.lastname,firstname:params.firstname,username:params.username,password:params.password,
                            email: params.email,steamid:params.steamid, photo: files[0].filename
                        }).exec(function(err, created) {
                            console.log(created);
                            var result = {};
                            result.status = 1;
                            result.firstname = created.firstname;
                            result.lastname = created.lastname;
                            result.username = created.username;
                            result.email = created.email;
                            result.photo = files[0].filename;
                            result.steamid=created.steamid;
                            return res.json(result);
                        });

                    } else if(result.length > 0) {
                        Users.update({username:params.username},{lastname: params.lastname, firstname: params.firstname, password: params.password,
                            email: params.email,steamid:params.steamid, photo: files[0].filename
                        }).exec(function createCB(err, created) {
                            var result = {};
                            result.status = 2;
                            result.firstname = params.firstname;
                            result.lastname = params.lastname;
                            result.username = params.username;
                            result.email = params.email;
                            result.photo = files[0].filename;
                            result.steamid=params.steamid;
                            return res.json(result);
                        });
                    } else {
                        var result={};
                        result.status=0;
                        result.email=params.email;
                        result.username=params.username;
                        result.lastname=params.lastname;
                        result.firstname=params.firstname;
                        result.password=params.password;
                        result.photo=files[0].filename;
                        result.steamid=params.steamid;
                        return res.json(result);
                    }
                });
            }
        });
    },

    createnophoto:function(req,res){
        var params = req.params.all();

        var myusers=Users.find({username:params.username});
        myusers.exec(function(error, result) {
           if(result.length==0) {
                        Users.create({lastname: params.lastname, firstname: params.firstname, username: params.username, password: params.password,
                            email: params.email,steamid:params.steamid
                        }).exec(function createCB(err, created) {
                            var result = {};
                            result.status=1;
                            result._id = created._id;
                            result.firstname = created.firstname;
                            result.lastname = created.lastname;
                            result.username = created.username;
                            result.email = created.email;
                            result.steamid=created.steamid;

                            return res.json(result);

                        });
           } else if(result.length > 0) {
               Users.update({username:params.username},{lastname: params.lastname, firstname: params.firstname, password: params.password,
                   email: params.email,steamid: params.steamid
               }).exec(function createCB(err, created) {
                   var result = {};
                   result.status=2;
                   result.firstname = params.firstname;
                   result.lastname = params.lastname;
                   result.username = params.username;
                   result.email = params.email;
                   result.steamid=params.steamid;

                   return res.json(result);

               });

           } else {
                        var result={};
                        result.status=0;
                        result.email=params.email;
                        result.username=params.username;
                        result.lastname=params.lastname;
                        result.firstname=params.firstname;
                        result.password=params.password;
                        result.steamid=params.steamid;

               return res.json(result);
           }
        });


    },

    login:function(req,res){
        var params = req.params.all()
        Users.find({password:params.password,username:params.username},{username:1,email:1,firstname:1,lastname:1,photo:1
        }).exec(function createCB(err,result){
            if(err){
                return res.json({"id":0,"msg":"No email or password match in our database","error":err});
            } else {
                return res.json(result);
            }
        });
    },
    update:function(req,res){
        var params = req.params.all();
        var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;
        var o_id = new ObjectId(params._id);

        Users.update(
            // Find all users with ULId = IC666
            {username:params.username},
            // Update their FHName and Ward fields
            {firstname:params.firstname,lastname:params.lastname,password:params.password,email:params.email}
        ).exec(function(err, users) {
                // In case of error, handle accordingly
                if(err) {
                    return res.serverError(err);
                } else {
                    // Otherwise send a success message and a 200 status
                    var result={};
                    result.status=2;
                    result.firstname=params.firstname;
                    result.lastname=params.lastname;
                    result.email=params.email;
                    result.username=params.username;
                    return res.json(result);
                }
            });

    },
    getusers:function(req,res){
       Users.find().exec(function(err,result){
           return res.json(result);
       });
    },
    edit:function(req,res){

    },
    destroy:function(req,res){

    },
    hello:function(req,res){
        res.send("Hello world how are you");
    }

};

