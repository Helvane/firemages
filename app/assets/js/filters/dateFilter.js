/**
 * Created by king on 2/18/15.
 */

appFilter.filter("datefilter",function(){
    return function(input) {
        var mydate=new Date(input);
        var mynewdate = (mydate.getUTCMonth() + 1) +"/"+mydate.getUTCDate() + "/" + mydate.getUTCFullYear();
        return mynewdate;
    };
});


appFilter.filter("datetimefilter",function($filter){
    return function(input) {

        var mynewdate=$filter('date')(input,'EEE MMM dd, yyyy h:mm a');
        return mynewdate;
    };
});

appFilter.filter("onlinefilter",function() {
    return function (flag) {
        var str = "Offline";
        if (flag == true) {
            str = "Online";

        }
        return str;
    };

});

appFilter.filter("urlfilter",function(){
    return function(str) {
        var pattern=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(pattern);
        if(regex.test(str)){

        }

        return str;
    };


});

appFilter.filter("newlinefilter",function(){
    return function(str) {
        if(str) {
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        }
        return str;
    };

});



appFilter.filter("unsafe",function($sce,$sanitize,$filter){
    return function(str) {
        //var str2=$filter('linky')(str);
        var str3=$filter('emoji')(str);

        return $sce.trustAsHtml(str3);
    };

});


appFilter.filter("statusfilter",function(shareService){
    return function(str) {
        var status={};
        var mystatus=shareService.getStatus();
        for(var i=0; i < mystatus.length; i ++){
            if(mystatus[i].name==str){
                status=mystatus[i].cssclass;
                return status
            }
        }

        return status;
    };

});

appFilter.filter("statusfilter2",function(shareService){
    return function(str) {
        var status={};
        var mystatus=shareService.getStatus();
        for(var i=0; i < mystatus.length; i ++){
            if(mystatus[i].name==str){
                status=mystatus[i].cssclass2;
                return status
            }
        }

        return status;
    };

});

appFilter.filter("fontcolor",function(shareService){
    return function(str) {
        var status={};
        var mystatus=shareService.getStatus();
        for(var i=0; i < mystatus.length; i ++){
            if(mystatus[i].name==str){
                status=mystatus[i].fontcolor;
                return status;
            }
        }
        return status;
    };

});

appFilter.filter("pinfilter",function(shareService){
    return function(id) {
        var pindata=shareService.getpin();
        var myflag=false;
        for(var i=0; i < pindata.length; i ++){
            if(id==pindata[i].forumid.id){
                myflag=true;
            }
        }
        return myflag;
    };

});