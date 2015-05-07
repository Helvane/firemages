/**
 * Created by king on 5/6/15.
 */

appController.controller("loginController",['$scope','ajaxService','shareService','$location',function($scope,ajaxService,shareService,$location){

    $scope.users=[];
    var param={};
    param.id=Number(new Date);
    var mymenu=ajaxService.ajaxFactory(USERSURLONLINE,param,'GET');
    mymenu.then(function(data){
            $scope.users=data;
            shareService.setusers(data);
        },
        function(error){
            alert("users error");
        }
    );


}]);