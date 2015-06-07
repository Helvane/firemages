/**
 * InboxController
 *
 * @description :: Server-side logic for managing inboxes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create:function(req, res){
        var param=req.params.all();
        var senderid=req.session.userid;
        Inbox.create({'senderid':senderid,'userid':param.memberid,'message':param.message}).exec(function(err, result){
            return res.json(result);
        });
    },
    getinbox:function(req, res){
        var param=req.params.all();
        var userid=req.session.userid;
        Inbox.find({'userid':userid}).populateAll().exec(function(err, result){
            for(var i=0; i < result.length; i++){
                result[i].senderid.password='';
                result[i].userid.password='';
            }
            return res.json(result);
        });
    },
    delete:function(req, res){
        var param=req.params.all();
        var userid=req.session.userid;
        Inbox.destroy({id:param.id,'userid':userid}).exec(function(err, result){
            return res.json(result);
        });
    }

};

