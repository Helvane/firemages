/**
 * Created by king on 6/6/15.
 */


appController.controller("replyController",['$scope','$modalInstance', 'items','ajaxService','shareService','$modal',function($scope,$modalInstance, items, ajaxService, shareService, $modal){

    $scope.person=items;
    $scope.logindata=shareService.getlogin();

    $scope.msg={"summary":""};
    $scope.errors={"summary":""};

    $scope.send=function(){
        if($scope.msg.summary==''){
            $scope.errors.summary="Please enter your message."

        } else {
            var param={};
            param.memberid=$scope.person.senderid.id;
            param.message= '<div class="quotecontent"><i class="fa fa-quote-left"></i>'+ $scope.person.message +'<i class="fa fa-quote-right"></i><div/>\n' + $scope.msg.summary;
            var ajax=ajaxService.ajaxFactory('/Inbox/create',param,'post');
            ajax.then(
                function(data){
                    if(data.id){
                        $scope.msg.summary='';
                        $scope.close();
                    }

                },
                function(err){
                    console.log(err);
                }
            );
        }

    };

    $scope.$watch('msg.summary',function(){
        $scope.errors.summary='';
    });



    $scope.close = function () {
        $modalInstance.dismiss('cancel');
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
                $scope.msg.summary = angular.copy($scope.msg.summary) + selectedItem.title;
            } else {
                $scope.msg.summary = angular.copy($scope.msg.summary) + selectedItem;
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
                $scope.msg.summary = angular.copy($scope.msg.summary) + selectedItem.title;
            } else {
                $scope.msg.summary = angular.copy($scope.msg.summary) + selectedItem;
            }
        });
    };


}]);
