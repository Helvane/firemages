/**
 * Created by king on 1/19/15.
 */

appController.controller("membersController",['$scope','shareService','$location','ajaxService',function($scope,shareService,$location,ajaxService){

    $scope.users=[];
    var param={};
    param.id=Number(new Date);
    var mymenu=ajaxService.ajaxFactory(USERSURL,param,'GET');
    mymenu.then(function(data){
            $scope.users=data;
        shareService.setusers(data);
    },
        function(error){
            alert("users error");
        }
);



}]);
