/**
 * Created by king on 6/2/15.
 */

appController.controller("inboxController",['$scope','ajaxService','shareService','$location','$stateParams','$modal',function($scope,ajaxService,shareService,$location,$stateParams,$modal){

    $scope.update="";
    $scope.logindata=shareService.getlogin();
    $scope.inbox=[];
    $scope.$watch('update',function() {
        var param = {};
        param.userid = $stateParams.userid;
        param.id = Number(new Date);
        var mymenu = ajaxService.ajaxFactory('/Inbox/getinbox', param, 'GET');
        mymenu.then(function (data) {
                $scope.inbox = data;

            },
            function (error) {
                alert("users error");
            }
        );
    });

    $scope.gotoprofile=function(url){
        if(!$scope.logindata){
            shareService.setAlert('You must be logged in to view profiles.');
            $location.path('/login');
        } else {
            $location.path(url);
        }
    };

    $scope.reply=function(data){
        $scope.items=data;
        var modalInstance = $modal.open({
            templateUrl: 'templates/reply.html',
            controller: 'replyController',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {

        });

    };

    $scope.delete=function(data){
        var param={};
        param.id=(data).id;
        param.senderid=data.senderid.id;
        var ajax=ajaxService.ajaxFactory('/Inbox/delete',param,'POST');
        ajax.then(function(data){
                $scope.update=Number(new Date);

            },
            function(error){
               console.log(error);
            }
        );


    };


}]);