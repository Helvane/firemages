/**
 * Created by king on 1/4/15.
 */

appController.controller("menuController",['$scope','shareService','$location','ajaxService',function($scope,shareService,$location,ajaxService){

    $scope.menus=[];
    // use ajax to retrieve menu file.
    var mymenu=ajaxService.ajaxFactory('json/menu.js',{},'GET');
    mymenu.then(
        function(data){
            $scope.menus=data;
            $scope.$broadcast("loginEvent");
        },
        function(error){
           //alert("Menu error");
        }
    );
    // when a user click on the menu, it loads the page.
    $scope.goto=function(index){
        for(var i=0; i < $scope.menus.length; i++){
            $scope.menus[i].myclass="";
        }

        $scope.menus[index].myclass="active";
        $location.path($scope.menus[index].link);

    };
     // get user login information that store in share Service factory
     $scope.person=shareService.getlogin();


    // listen to loginEvent when there is a broadcast trigger.
    $scope.$on("loginEvent",function(){
        $scope.person=shareService.getlogin();
        if($scope.person){
            // if a user login, it changes the register to update.
            $scope.menus[4].title="Update";

            $scope.menus[5].status=1;
        } else {
            // if a user is not login, it changes the update to register.
            $scope.menus[4].title="Register";
            $scope.menus[5].status=0;
        }

    });
    // when a user clicks on the log off button, then it clears the local data.
    $scope.logoff=function(){
        var param={};
        param.username=angular.copy($scope.person.username);
        var myajax=ajaxService.ajaxFactory(LOGOFFURL,param,'POST');
        myajax.then(
            function(data){
                console.log(data);
                shareService.setlogin({});
                window.localStorage.clear();
                $scope.$emit("loginEvent");
                $location.path('/login');
            },
            function(error){
                //alert(error);
            }
        )

    };

    var param={};
    param.number=Number(new Date);
    var myajax=ajaxService.ajaxFactory(GETSESSIONURL,param,'GET');
    myajax.then(
        function(data){
            if(!data.userid) {
            console.log(data);
            shareService.setlogin({});
            window.localStorage.clear();
            $scope.$emit("loginEvent");
            $location.path('/login');
           }
        },
        function(error){
            //alert(error);
        }
    );

    var param={};
    param.number=Number(new Date);
    var mymenu=ajaxService.ajaxFactory(TOPICURL,param,'GET');
    mymenu.then(
        function(data){
            shareService.setTopic(data);
        },
        function(error){
            //alert("Menu error");
        }
    );

}]);