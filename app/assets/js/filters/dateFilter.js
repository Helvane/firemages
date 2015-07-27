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


appFilter.filter("datetimefilter",['$filter', function($filter){
    return function(input) {

        var mynewdate=$filter('date')(input,'EEE MMM dd, yyyy h:mm a');
        return mynewdate;
    };
}]);

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



appFilter.filter("unsafe",['$sce','$sanitize','$filter',function($sce,$sanitize,$filter){
    return function(str) {
        //var str2=$filter('linky')(str);
        var str3=$filter('emoji')(str);

        return $sce.trustAsHtml(str3);
    };

}]);


appFilter.filter("statusfilter",['shareService',function(shareService){
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

}]);

appFilter.filter("statusfilter2",['shareService',function(shareService){
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

}]);

appFilter.filter("fontcolor",['shareService',function(shareService){
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

}]);

appFilter.filter("pinfilter",['shareService',function(shareService){
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

}]);


appFilter.filter("bbcodefilter",function(){
    return function(str) {
        var mystr='';
        console.log(str);
        if(str) {
            var pattern = /\[quote(.*(?=[a0-z9]))\](.*([a0-z9]))\[\/quote\]/gi;
            var newstr=str.replace(pattern,'$1');
            newstr=newstr.replace(/[\="]+/g,'');
            console.log('The ** newstr **');
            console.log(newstr);
            var replacestr1 = '<blockquote><div><cite>'+newstr+' wrote:</cite> $2</div></blockquote>';
            mystr = str.replace(pattern,replacestr1);
            console.log(mystr);
        }
        return mystr;
    };

});
