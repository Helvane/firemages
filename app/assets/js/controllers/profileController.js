/**
 * Created by king on 5/23/15.
 */

appController.controller("profileController",['$scope','shareService','$location','ajaxService','$stateParams','$modal',function($scope,shareService,$location,ajaxService,$stateParams,$modal){

    // get user login information that store in share Service factory
    $scope.logindata=shareService.getlogin();
    $scope.person={};
    $scope.info={"message":""};
    $scope.errors={"message":""};
    $scope.myid=$stateParams.id;

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

    //changeinfo function has 2 parameters
    $scope.changeinfo = function (urlcontroller, templatefile) {

        var modalInstance = $modal.open({
            templateUrl: 'templates/'+templatefile,
            controller: urlcontroller,
            resolve: {
                items: function () {
                    return $scope.person;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
        });
    };

    $scope.emoticon = function () {

        var modalInstance = $modal.open({
            templateUrl: 'templates/emoji.html',
            controller: 'emojiController',
            resolve: {
                items: function () {
                    return $scope.person;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            if(selectedItem.title) {
                $scope.info.message = angular.copy($scope.info.message) + selectedItem.title;
            } else {
                $scope.info.message = angular.copy($scope.info.message) + selectedItem;
            }
        });
    };

    $scope.formattingpopup = function () {

        var modalInstance = $modal.open({
            templateUrl: 'templates/formatting.html',
            controller: 'formattingController',
            resolve: {
                items: function () {
                    return $scope.person;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            if(selectedItem.title) {
                $scope.info.message = angular.copy($scope.info.message) + selectedItem.title;
            } else {
                $scope.info.message = angular.copy($scope.info.message) + selectedItem;
            }
        });
    };

}]);
