/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing Chatrooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    getmessage:function(req,res){
        // get all messages
        Chatroom.find().exec(function created(err, result) {
            return res.json(result);

        });

    },
    createmessage:function(req,res){
        var data=req.params.all();
        Chatroom.create({username: data.username, message: data.message,photo:data.photo}).exec(function created(err, result) {
            console.log("** create new message *** ");
            Chat.publishCreate({id:"Chat",username:data.username,message:data.message,photo:data.photo});
            return res.json(data);
        });
    }
};

