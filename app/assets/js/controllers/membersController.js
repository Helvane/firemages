/**
 * Created by king on 1/19/15.
 */

appController.controller("membersController",['$scope','shareService','$location','ajaxService',function($scope,shareService,$location,ajaxService){

    $scope.users=[];
    $scope.update='';

    $scope.$watch('update',function(){


    var param={};
    param.id=Number(new Date);
    $scope.logindata=shareService.getlogin();
    var mymenu=ajaxService.ajaxFactory(USERSURL,param,'GET');
    mymenu.then(function(data){
            $scope.users=data;
        shareService.setusers(data);
    },
        function(error){
            alert("users error");
        }
    );

    });

    $scope.gotoprofile=function(url){
        if(!$scope.logindata){
            shareService.setAlert('You must be logged in to view profiles.');
            $location.path('/login');
        } else {
            $location.path(url);
        }
    }

}]);
