/**
 * Created by king on 2/18/15.
 */



var appFilter=angular.module("appFilter",[]);

appFilter.filter("datefilter",function(){
    return function(input) {
        var mydate=new Date(input);
        var mynewdate = (mydate.getUTCMonth() + 1) +"/"+mydate.getUTCDate() + "/" + mydate.getUTCFullYear();
        return mynewdate;
    };
});


appFilter.filter("datetimefilter",function(){
    return function(input) {
        var mydate=new Date(input);
        var timezone=mydate.getHours()>12?'PM':'AM';
        var myhour=mydate.getHours() > 12?mydate.getHours() - 12 : mydate.getHours();
        var mynewdate = (mydate.getUTCMonth()+1) +"/"+mydate.getUTCDate() + "/" + mydate.getUTCFullYear() +' Time  '+myhour + ':' + mydate.getMinutes() + ':'+ mydate.getUTCSeconds() + ' '+ timezone;
        return mynewdate;
    };
});