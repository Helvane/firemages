/**
 * Created by king on 4/12/15.
 */

appController.controller("summaryController",['$scope','ajaxService','shareService','$modal','$stateParams','$location',function($scope, ajaxService, shareService, $modal,$stateParams,$location){

    $scope.logindata=shareService.getlogin();
    $scope.forumid=$stateParams.forumid;
    $scope.forum=shareService.getForum();
    $scope.totalpost=0;
    $scope.currentPage=1;
    $scope.total=0;
    $scope.forumdata=[];

    $scope.getcount=function(userid){
        var param={};
        param.userid=userid;
        var ajax=ajaxService.ajaxFactory('/Forum/gettotalpost',param,'get');
        ajax.then(
            function(data){
              $scope.totalpost=data;

            },
            function(err){
                console.log(err);
            }

        );
    };

    if($scope.forum.userid) {
    $scope.getcount($scope.forum.userid.id);
    }

    if(!$scope.forum.id){
        var param={};
        param.forumid=$stateParams.forumid;
        var myajax=ajaxService.ajaxFactory(GETAFORUMURL,param,'get');
        myajax.then(
          function(data){
              $scope.forum=data;
              $scope.getcount($scope.forum.userid.id);
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

    $scope.getanswercount=function(forum_id){
        var param={};
        param.forumid=$scope.forum.id;
        param.number=Number(new Date);
        var myajax2=ajaxService.ajaxFactory('/Forumanswer/getcount',param,'get');
        myajax2.then(
            function(data){
                $scope.total=data;
            },
            function(err){
                console.log(err);
            }
        );

    };


    $scope.$watch('update',function(){
       var param={};
       param.forumid=$scope.forum.id;
       param.page=$scope.currentPage;
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

    $scope.getanswercount();

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

    // this is for lock forum
    $scope.lock=function(){
        var param={};
        param.forumid=$scope.forum.id;
        param.lock=true;

        var myajax=ajaxService.ajaxFactory(LOCKFORUMURL,param,'post');
        myajax.then(
            function(data){
                // it will trigger the watch
                $scope.update=Number(new Date);
                $scope.forum.lock=true;

            },
            function(err){
                console.log(err);
            }
        );
    };

    $scope.lockpopup = function () {

        var modalInstance = $modal.open({
            templateUrl: 'templates/lock.html',
            controller: 'lockController',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            if(selectedItem.title) {
                $scope.message = angular.copy($scope.message) + selectedItem.title;
            } else {
                $scope.message = angular.copy($scope.message) + selectedItem;
            }
        });
    };
    $scope.formattingpopup = function () {

        var modalInstance = $modal.open({
            templateUrl: 'templates/formatting.html',
            controller: 'formattingController',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            if(selectedItem.title) {
                $scope.message = angular.copy($scope.message) + selectedItem.title;
            } else {
                $scope.message = angular.copy($scope.message) + selectedItem;
            }
        });
    };

    $scope.gotoprofile=function(url){
        if(!$scope.logindata){
            shareService.setAlert('You must be logged in to view profiles.');
            $location.path('/login');
        } else {
            $location.path(url);
        }
    };

    $scope.nextpage=function(page){
        $scope.currentPage=page;
        $scope.update=Number(new Date);

    }

}]);
