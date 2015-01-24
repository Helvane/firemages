/**
 * Created by king on 1/4/15.
 */



appService.factory('shareService',['$rootScope',function($rootscope){

    var pService={};
    pService.logindata={};
    pService.setlogin=function(data){

        pService.logindata=data;
        if(window.localStorage) {
            window.localStorage.setItem('login',JSON.stringify(data));

        }
        $rootscope.$broadcast("loginEvent");
    }

    pService.getlogin=function(){
        if(window.localStorage) {
            return JSON.parse(window.localStorage.getItem('login'));
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

    return pService;
}]);