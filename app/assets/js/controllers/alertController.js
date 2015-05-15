/**
 * Created by king on 5/14/15.
 */

appController.controller("alertController",['$scope','shareService','$location',function($scope,shareService,$location){

  $scope.alert={"msg":"","flag":false};
  $scope.close=function(){
      $scope.alert.flag=false;
  };

    $scope.$on('alertEvent',function(){
       $scope.alert.msg=shareService.getAlert();
       $scope.alert.flag=true;
    });

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
       if(fromState.url=='/login' && $scope.alert.flag==true){
           $scope.alert.flag=false;
       }

    });

}]);