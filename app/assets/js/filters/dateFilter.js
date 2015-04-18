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
      
        var mynewdate=$filter('date')(input,'MM/dd/yyyy h:mm a');
        return mynewdate;
    };
});

appFilter.filter("onlinefilter",function(){
    return function(flag) {
        var str="Offline";
        if(flag==true){
            str="Online";

        }
        return str;
    };
});