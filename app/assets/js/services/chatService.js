/**
 * Created by king on 2/10/15.
 */

appService.factory('chatSocket',function(){
    var socket=io.connect(CHATURL);
    return socket;
});

