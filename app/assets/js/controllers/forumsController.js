/**
 * Created by king on 4/10/15.
 */

appController.controller("forumsController",['$scope',function($scope){
    $scope.forum={"topic":"","title":"","summary":""};

    $scope.save=function(){
        console.log($scope.forum);
    }

}]);