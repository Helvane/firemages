/**
 * Created by king on 4/12/15.
 */

appController.controller("summaryController",['$scope','ajaxService','shareService','$modal','$stateParams',function($scope, ajaxService, shareService, $modal,$stateParams){

    $scope.forumid=$stateParams.forumid;
    $scope.forum=shareService.getForum();

    if(!$scope.forum.id){
        var param={};
        param.forumid=$scope.forumid;
        var myajax=ajaxService.ajaxFactory(GETAFORUMURL,param,'get');
        myajax.then(
          function(data){
              $scope.forum=data;
              $scope.update=Number(new Date);
          },
            function(err){
                console.log(err);
            }

        );
    }


    $scope.msg={responseText:''};
    $scope.answers=[];
    $scope.update='';
    $scope.logindata=shareService.getlogin();

    $scope.$watch('update',function(){
       var param={};
       param.forumid=$scope.forum.id;
       param.number=Number(new Date);
       var myajax=ajaxService.ajaxFactory(GETANSWERURL,param,'get');
       myajax.then(
         function(data){
             $scope.answers=data;
         },
           function(err){
               console.log(err);
           }
       );

    });

    $scope.replyflag=false;

    $scope.reply=function(){

        if($scope.replyflag==false){
            $scope.replyflag=true;
        } else {
            $scope.replyflag=false;
        }
    };

    $scope.save=function(){
         var param={};
        param.forumid=$scope.forum.id;
        param.answer=$scope.msg.responseText;

        var myajax=ajaxService.ajaxFactory(CREATEANSWERURL,param,'post');
        myajax.then(
          function(data){
              // it will trigger the watch
              $scope.update=Number(new Date);
              text='';
              $scope.msg.responseText='';
          },
            function(err){
                console.log(err);
            }
        );
    };

    //emoticon button
    $scope.emoticon = function () {

        var modalInstance = $modal.open({
            templateUrl: 'templates/emoji.html',
            controller: 'emojiController',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        // this data return when you close the modal dialog
        modalInstance.result.then(function (selectedItem) {
            if(selectedItem.title) {
                $scope.msg.responseText = angular.copy($scope.msg.responseText) + selectedItem.title;
            } else {
                $scope.msg.responseText = angular.copy($scope.msg.responseText) + selectedItem;
            }
        });
    };

}]);
