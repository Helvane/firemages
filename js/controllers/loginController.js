/**
 * Created by king on 12/26/14.
 */

var appController=angular.module('appController',['ui.router','ngResource','ngCookies']);

appController.controller("loginController",['$scope','ajaxService','shareService','$location','$cookies',function($scope,ajaxService,shareService,$location,$cookies){
    // initialize json object
    $scope.person={"username":"","password":""};
    $scope.error={"username":false,"password":false};
    $scope.errormsg="";

    $scope.getlogin=function() {
        if ($scope.person.username == "") {
            $scope.error.username = true;
        }
        if ($scope.person.password == "") {
            $scope.error.password = true;
        }

        if ($scope.error.username == false && $scope.error.password == false) {
            var myajax = ajaxService.ajaxFactory(LOGINURL, $scope.person, "GET");
            myajax.then(function (data) {
                    if(data.length==0){
                        $scope.errormsg="There is no UserName or Password match in your database";
                    } else {
                        $scope.errormsg="";
                        shareService.setlogin(data[0]);
                        $cookies.username=data[0].username;
                        $location.path('/home');
                    }
                },
                function (error) {
                    alert(error);
                }
            );
        }

    };

    $scope.resetemail=function(){
        $scope.error.username=false;
    }

    $scope.resetpassword=function(event){
        $scope.error.password=false;
        if(event.which==13){
            $scope.getlogin();
        }
    }


}]);