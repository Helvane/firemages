/**
 * Created by king on 5/23/15.
 */

appController.controller("profileController",['$scope','shareService','$location','ajaxService','$stateParams',function($scope,shareService,$location,ajaxService,$stateParams){

    // get user login information that store in share Service factory
    $scope.logindata=shareService.getlogin();
    $scope.person={};

    var param={};
    param.userid=$stateParams.id;
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

}]);
