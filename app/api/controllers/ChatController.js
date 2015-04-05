/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {
    getmessage:function(req,res){
        // get all messages
        Chat.find().exec(function created(err, result) {
            return res.json(result);

        });

    },
    createmessage:function(req,res){
        var data=req.params.all();
        Chat.create({username: data.username, message: data.message,photo:data.photo}).exec(function created(err, result) {
            console.log("** create new message *** ");
            sails.sockets.broadcast("chatroom","messageEvent",result);

            return res.json(data);
        });
    }

};

