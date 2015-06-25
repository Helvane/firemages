/**
 * Created by king on 6/23/15.
 */


appController.controller("subcatController",['$scope','$location','ajaxService','shareService','$filter','$stateParams',function($scope,$location,ajaxService, shareService, $filter, $stateParams){

    $scope.update='';
    $scope.logindata=shareService.getlogin();
    $scope.subtopic=shareService.getForum();
    $scope.subcatid=$stateParams.id;


    $scope.goto=function(subcat){
        // you use a setter
        shareService.setForum(obj);


            $location.path('/forum/' + data.id);


    };



}]);