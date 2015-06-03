/**
 * Created by king on 6/2/15.
 */

appController.controller("inboxController",['$scope','ajaxService','shareService','$location','$stateParams',function($scope,ajaxService,shareService,$location,$stateParams){

    $scope.logindata=shareService.getlogin();
    $scope.inbox=[];
    var param={};
    param.userid=$stateParams.userid;
    param.id=Number(new Date);
    var mymenu=ajaxService.ajaxFactory('/Inbox/getinbox',param,'GET');
    mymenu.then(function(data){
            $scope.inbox=data;

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