/**
 * Created by king on 5/23/15.
 */

appController.controller("profileController",['$scope','shareService','$location','ajaxService','$stateParams',function($scope,shareService,$location,ajaxService,$stateParams){

    // get user login information that store in share Service factory
    $scope.logindata=shareService.getlogin();
    $scope.person={};
    $scope.info={"message":""};
    $scope.errors={"message":""};

    var param={};
    if($stateParams.id==0) {
    param.userid=$scope.logindata.userid;
    } else {
    param.userid = $stateParams.id;
   }
    param.number=Number(new Date);
    var myajax=ajaxService.ajaxFactory('/Users/getprofile',param,'get');
    myajax.then(
      function(data){
          $scope.person=data;
      },
        function(err){
            console.log(err);
        }
    );

    $scope.$watch("info.message",function(){
       $scope.errors.message="";
    });

    $scope.save=function(){
       $scope.info.userid=$scope.logindata.userid;
        if($scope.info.message==""){
            $scope.errors.message="Please write a brief summary about yourself"
        } else {
            var ajax = ajaxService.ajaxFactory('/Users/update', $scope.info, 'post');
            ajax.then(function (data) {
                    $scope.person.summary = angular.copy ($scope.info.message);
                    $scope.info.message="";
                },
                function (err) {
                    console.log(err);
                }
            )
        }

    };

}]);
