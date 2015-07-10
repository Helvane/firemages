/**
 * Created by king on 7/8/15.
 */

appController.controller("texteditorMenuController",['$scope','ajaxService','shareService','$location',function($scope,ajaxService,shareService,$location){

   $scope.values={"fontcolor":"#ffffff","boldtag":"b","italictag":"i"};

    $scope.$watch('values.fontcolor',function(){
        if($scope.values.fontcolor!='#ffffff') {
            shareService.setfont($scope.values.fontcolor);
        }
    });


}]);
