/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {
    getmessage:function(req,res){
        // get all messages
        Chat.find({limit:40}).sort('id asc').exec(function created(err, result) {
            var myid=[];
            for(var i=0; i < result.length; i++){
                myid[i]=result[i].id;
            }
            Chat.destroy({'id':{'!':myid}}).exec(function(err,output){
                //console.log(output);
            });
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

