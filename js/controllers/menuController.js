/**
 * Created by king on 1/4/15.
 */

appController.controller("menuController",['$scope','shareService','$location','ajaxService',function($scope,shareService,$location,ajaxService){

    $scope.menus=[];
    var mymenu=ajaxService.ajaxFactory('json/menu.js',{},'GET');
    mymenu.then(function(data){
            $scope.menus=data;
    },
   function(error){
       alert("Menu error");
   }
    );

    $scope.goto=function(index){
        for(var i=0; i < $scope.menus.length; i++){
            $scope.menus[i].myclass="";
        }

        $scope.menus[index].myclass="active";
        $location.path($scope.menus[index].link);

    };

     $scope.person=shareService.getlogin();

    $scope.$on("loginEvent",function(){
        $scope.person=shareService.getlogin();

    });

    $scope.logoff=function(){

        shareService.setlogin({});

        window.localStorage.clear();
    }

}]);