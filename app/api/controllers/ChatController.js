/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {
    join:function(req,res){
        var data=req.params.all();
        Chat.create({username: data.username, photo: data.photo}).exec(function created(err, result) {
            console.log("*** create new user ****");
            Chatroom.publishCreate({id:"Chatroom",username:data.username,photo:data.photo});
        });

        // retrieve all users and send back to client
        Chat.find().exec(function(err,result){
            sails.sockets.blast("joinEvent");
            return res.json(result);

        });
    },

    logout:function(req,res){
        var param=req.params.all();
        console.log(param);
        Chat.destroy({username:param.username}).exec(function(err,result){
            console.log("**** leftchatroom ****");
            console.log(result);
            sails.sockets.blast("joinEvent");
            return res.json(param);
        });
    },
    getmembers:function(req,res){
        Chat.find().exec(function(err,result){
            return res.json(result);

        });
    }

};

