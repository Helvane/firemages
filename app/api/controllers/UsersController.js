/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var bcrypt = require('bcrypt');

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
                fs.link(files[0].fd, "./tmp/public/images/" +files[0].filename, function(err){
                    fs.rename(files[0].fd, "./assets/images/" +files[0].filename, function(err){
                        //console.log("error = " +err);
                    });
                });

                var myusers=Users.find({username:params.username});
                myusers.exec(function(error, result) {
                    if(result.length==0) {
                        Users.create({lastname:params.lastname, firstname:params.firstname, username:params.username,password:params.password,
                            email:params.email,steamid:params.steamid, photo: files[0].filename, status:'Member'
                        }).exec(function(err, created) {
                            console.log(created);
                            var result = {};
                            result.state = 1;
                            result.firstname = created.firstname;
                            result.lastname = created.lastname;
                            result.username = created.username;
                            result.email = created.email;
                            result.photo = files[0].filename;
                            result.steamid=created.steamid;
                            result.status=created.status;
                            result.userid=created.id;
                            req.session.userid=created.id;
                            req.session.username=created.id;
                            return res.json(result);
                        });

                    } else if(result.length > 0) {
                        Users.update({username:params.username},{lastname: params.lastname, firstname: params.firstname, password: params.password,
                            email: params.email,steamid:params.steamid, photo: files[0].filename
                        }).exec(function createCB(err, created) {
                            var result = {};
                            result.state = 2;
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
                        result.state=0;
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

        console.log(params);

        var myusers=Users.find({username:params.username});
        myusers.exec(function(error, result2) {
            if(result2.length==0) {
                Users.create({lastname: params.lastname, firstname: params.firstname, username: params.username, password: params.password,
                    email: params.email,steamid:params.steamid,status:'Member'
                }).exec(function createCB(err, created) {
                    var result = {};
                    result.state=1;
                    result.firstname = created.firstname;
                    result.lastname = created.lastname;
                    result.username = created.username;
                    result.email = created.email;
                    result.steamid=created.steamid;
                    result.status=created.status;
                    console.log("*** create new user ***");
                    console.log(result);
                    return res.json(result);

                });
            } else if(result2.length > 0) {
                Users.update({username:params.username},{lastname: params.lastname, firstname: params.firstname, password: params.password,
                    email: params.email,steamid: params.steamid
                }).exec(function createCB(err, created) {
                    var result = {};
                    result.state=2;
                    result.firstname = params.firstname;
                    result.lastname = params.lastname;
                    result.username = params.username;
                    result.email = params.email;
                    result.steamid=params.steamid;
                    console.log("**** update user ****");

                    return res.json(result);

                });

            } else {
                var result={};
                result.state=0;
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
        Users.find({username:params.username},{password:1,username:1,email:1,firstname:1,lastname:1,photo:1,id:1
        }).exec(function createCB(err,result){

            var result=result[0];
            var output={};
            output.id=0;
            if (result) {
                bcrypt.compare(params.password, result.password, function (err, match) {

                    if (match) {
                        // password match
                        output.id=1;
                        output.username=result.username;
                        output.lastname=result.lastname;
                        output.firstname=result.firstname;
                        output.email=result.email;
                        output.userid=result.id
                        req.session.username=result.username;
                        req.session.userid=result.id;
                        return res.json(output);
                    } else {
                        // invalid password
                        output.msg="You enter the wrong password";
                        if (req.session.username) req.session.username = null;
                        return res.json(output);
                    }
                });
            } else {
                output.msg="There is no E-Mail and Password found";
                return res.json(output);
            }

        });
    },

    logoff:function(req,res){
        var params = req.params.all()
        Users.find({username:params.username},{username:1,email:1
        }).exec(function createCB(err,result){
            if(err){
                return res.json({"id":0,"msg":"No email or password match in our database","error":err});
            } else {
                var mydate=new Date();
                Users.update({username:params.username},{updatedAt:mydate}).exec(function(error,updatedata){
                    //do nothing
                });
                res.cookie('username', params.username, { expires: new Date(Date.now() - 900000)});
                req.session.destroy();
                return res.json(result);
            }
        });
    },
    update:function(req,res){
        var params = req.params.all();
        var userid = req.session.userid;

        Users.update(
            // Find all users with ULId = IC666
            {id:userid},
            // Update their FHName and Ward fields
            {firstname:params.firstname,lastname:params.lastname,password:params.password,email:params.email}
        ).exec(function(err, users) {
                // In case of error, handle accordingly
                if(err) {
                    return res.serverError(err);
                } else {
                    // Otherwise send a success message and a 200 status
                    var result={};
                    result.state=2;
                    result.firstname=params.firstname;
                    result.lastname=params.lastname;
                    result.email=params.email;
                    result.username=params.username;
                    return res.json(result);
                }
            });

    },
    getusers:function(req,res){
        Users.find({sort:"_id desc"}).exec(function(err,result){
            return res.json(result);
        });
    },
    verify:function(req,res){
        var params=req.params.all();
        Users.find({username:params.username}).exec(function(err,result){
            var obj={};
            obj.status=0;
            obj.msg="This UserName is available";
            if(result.length > 0){
                obj.state=1;
                obj.msg="This Username is not available"
            }
            return res.json(obj);
        });

    },
    destroy:function(req,res){

    },
    getsession:function(req,res){
        var login={};
        login.userid=req.session.userid;
        login.username=req.session.username;
        return res.json(login);
    }

};

