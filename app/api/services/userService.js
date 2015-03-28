/**
 * Created by king on 3/15/15.
 */

module.exports = {
    updateLogin:function(obj){
        var today=new Date;
        Users.update({id:obj.userid},{online:obj.online,updatedAt:today}).exec(function(err,result){
            return result;
        });
    }

};
