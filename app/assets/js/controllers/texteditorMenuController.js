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

    $scope.bold=function(){
        var htmltag='<b>Enter Text</b>';
       shareService.settag(htmltag);
    };

    $scope.italic=function(){
        var htmltag='<i>Enter Text</i>';
        shareService.settag(htmltag);
    };

    $scope.underline=function(){
        var htmltag='<u>Enter Text</u>';
        shareService.settag(htmltag);
    };

    $scope.imagetag=function(){
        var htmltag='<img src="Enter Img Url"/>';
        shareService.settag(htmltag);
    };
    $scope.urltag=function(){
        var htmltag='<a href="Enter Url"></a>';
        shareService.settag(htmltag);
    };
    $scope.strikethroughtag=function(){
        var htmltag='<strike>Enter Text</strike>';
        shareService.settag(htmltag);
    };

    $scope.isOpen=false;
    $scope.opencolor=function(){
       if($scope.isOpen==false){
           $scope.isOpen=true;
       } else {
         $scope.isOpen=false;
       }
    };


}]);
