/**
 * Created by king on 6/13/15.
 */

appController.controller("statusTopicController",['$scope','ajaxService','shareService','$location',function($scope,ajaxService,shareService,$location){

    $scope.logindata=shareService.getlogin();
    $scope.topics=[];
    var param={};
    param.id=Number(new Date);
    var mymenu=ajaxService.ajaxFactory('/json/status.json',param,'GET');
    mymenu.then(function(data){
            $scope.topics=data;


        },
        function(error){
            alert("users error");
        }
    );

    $scope.gotoprofile=function(url){
        if(!$scope.logindata){
            shareService.setAlert('You must be logged in to view profiles.');
            $location.path('/login');
        } else {
            $location.path(url);
        }
    }


}]);
