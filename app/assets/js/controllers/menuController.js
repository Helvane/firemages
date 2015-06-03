/**
 * Created by king on 1/4/15.
 */

appController.controller("menuController",['$scope','shareService','$location','ajaxService',function($scope,shareService,$location,ajaxService){

    // get user login information that store in share Service factory
    $scope.person=shareService.getlogin();

    $scope.checkmenu=function(){
        $scope.person=shareService.getlogin();
        if($scope.menus.length > 0){
        if($scope.menus) {
            if ($scope.person) {
                // if a user login, it changes the register to update.
                $scope.menus[4].title = "Update";
                $scope.menus[4].status=1;

                $scope.menus[5].status = 1;
                $scope.menus[7].status=0;

            } else {
                // if a user is not login, it changes the update to register.
                $scope.menus[4].title = "Register";
                $scope.menus[7].status=1;
            }

        }
        }
    };

    $scope.menus=[];
    // use ajax to retrieve menu file.
    var mymenu=ajaxService.ajaxFactory('json/menu.js',{},'GET');
    mymenu.then(
        function(data){
            $scope.menus=data;
            $scope.checkmenu();
        },
        function(error){
           //alert("Menu error");
        }
    );
    // when a user click on the menu, it loads the page.
    $scope.goto=function(index){
        $scope.menuflag=false;
        for(var i=0; i < $scope.menus.length; i++){
            $scope.menus[i].myclass="";
        }

        $scope.menus[index].myclass="active";
        if($scope.person && $scope.person.username && $scope.menus[index].link=='/register'){
          $location.path('updateRegister');
        } else {
            $location.path($scope.menus[index].link);
        }

    };



    // listen to loginEvent when there is a broadcast trigger.
    $scope.$on("loginEvent",function(){
      $scope.checkmenu();
    });

    // when a user clicks on the log off button, then it clears the local data.
    $scope.logoff=function(){
        var param={};
        param.username=angular.copy($scope.person.username);
        var myajax=ajaxService.ajaxFactory(LOGOFFURL,param,'POST');
        myajax.then(
            function(data){
                shareService.setlogin({});
                window.localStorage.clear();
                $scope.menus[4].title ='Register';
                $scope.menus[4].status=0;
                $scope.menus[5].status =0;
                $scope.menus[5].myclass ='active';
                $location.path('/login');
                if(!$scope.$$phase){
                    $scope.$digest();
                }
            },
            function(error){
                //alert(error);
            }
        );

    };

    var param={};
    param.number=Number(new Date);
    var myajax=ajaxService.ajaxFactory(GETSESSIONURL,param,'GET');
    myajax.then(
        function(data){
            if(!data.userid) {

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
    var mymenu2=ajaxService.ajaxFactory(TOPICURL,param,'GET');
    mymenu2.then(
        function(data){
            shareService.setTopic(data);
        },
        function(error){
            //alert("Menu error");
        }
    );

    $scope.menuflag=false;
    $scope.toggle=function(){
      if($scope.menuflag==false){
          $scope.menuflag=true;
      } else {
          $scope.menuflag=false;
      }
    };

}]);