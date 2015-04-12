/**
 * Created by king on 4/12/15.
 */

appController.controller("summaryController",['$scope','ajaxService','shareService',function($scope, ajaxService, shareService){

    $scope.forum=shareService.getForum();

    $scope.replyflag=false;

    $scope.reply=function(){

        if($scope.replyflag==false){
            $scope.replyflag=true;
        } else {
            $scope.replyflag=false;
        }
    }

}]);
