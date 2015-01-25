/**
 * Created by king on 1/4/15.
 */



appService.factory('shareService',['$rootScope',function($rootscope){

    var pService={};
    pService.logindata={};
    pService.setlogin=function(data){

        pService.logindata=data;
        if(window.localStorage) {
            window.localStorage.setItem('loginfiremages',JSON.stringify(data));

        }
        $rootscope.$broadcast("loginEvent");
    }

    pService.getlogin=function(){
        if(window.localStorage) {
            return JSON.parse(window.localStorage.getItem('loginfiremages'));
        } else {

            return pService.logindata;
        }
        }
    pService.userdata=[];
    pService.setusers=function(data){
        pService.userdata=data;

    }

    pService.getusers=function(){
        return pService.userdata;
    }

    pService.enhanceblog=function(blog,users){
        var temp=[];
        var i=0;
        for(var j=0; j < blog.length; j++){
            for(var k=0; k < users.length; k++){
                if(blog[j].username==users[k].username){
                    temp[i]=blog[j];
                    temp[i].myphoto=users[k].photo;
                    i++;
                }
            }
        }
        return temp;
    }

    pService.validateEmail=function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return pService;
}]);