/**
 * ChatroomController
 *
 * @description :: Server-side logic for managing Chatrooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    join:function(req,res){
        var data=req.params.all();
        var userid=req.session.userid;
        Chatroom.create({"userid":userid,"socketid":req.socket.id}).exec(function created(err, result) {
            console.log("*** create new user ****");
            // we subscribe a user to a chatroom
            sails.sockets.join(req.socket.id, "chatroom");
            // broadcast a new user to joinEvent
            sails.sockets.broadcast("chatroom","joinEvent",result);

            return res.json(result);

        });


    },

    logout:function(req,res){
        var param=req.params.all();
        var userid=req.session.userid;

        Chatroom.destroy({"userid":userid}).exec(function(err,result){
            console.log("**** leftchatroom ****");
            sails.sockets.leave(req.socket.id,"chatroom");
            sails.sockets.broadcast("chatroom","joinEvent",result);

            return res.json(result);
        });
    },
    getmembers:function(req,res){
        Chatroom.find().populateAll().exec(function(err,result){
            for(var i=0; i < result.length; i++){
                //result[i].userid.password="";
                //result[i].userid.email="";
            }
            return res.json(result);

        });
    }


};

