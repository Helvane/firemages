/**
 * Created by king on 4/12/15.
 */

appController.controller("summaryController",['$scope','ajaxService','shareService','$modal','$stateParams','$location','$q',function($scope, ajaxService, shareService, $modal,$stateParams,$location,$q){

    $scope.forumtopic=shareService.getForum();
    $scope.logindata=shareService.getlogin();
    $scope.forumid=$stateParams.forumid;
    //$scope.forum=shareService.getItem();

    $scope.msg={responseText:''};
    $scope.answers=[];
    $scope.totalpost=0;
    $scope.currentPage=1;
    $scope.total=0;
    $scope.forumdata=[];
    $scope.updateforum='';
    $scope.info={"delete":false};
    $scope.statefrom=shareService.getStatefrom();

    $scope.getanswercount=function(forum_id){
        var param={};
        param.forumid=forum_id;
        param.number=Number(new Date);
        var myajax5=ajaxService.ajaxFactory('/Forumanswer/getcount',param,'get');
        myajax5.then(
            function(data){
                $scope.total=data;
            },
            function(err){
                console.log(err);
            }
        );

    };

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

    var param2={};
    param2.forumid=$scope.forumid;
    param2.number=Number(new Date);
    var myajax2=ajaxService.ajaxFactory('/Forum/addtotalviews',param2,'post');
    $scope.totalviews=[];

    var param={};
    param.forumid=$stateParams.forumid;
    var myajax=ajaxService.ajaxFactory(GETAFORUMURL,param,'get');

    var param3={};
    param3.forumid=$scope.forumid;
    param3.page=$scope.currentPage;
    param3.number=Number(new Date);
    var myajax3=ajaxService.ajaxFactory(GETANSWERURL,param,'get');

    $scope.pinflag=false;
    var param4={};
    param4.forumid=$stateParams.forumid;
    param4.number=Number(new Date);
    var myajax4=ajaxService.ajaxFactory('/Forumanswer/getapin',param,'get');


    var allajax=$q.all([myajax2,myajax,myajax3,myajax4]);
    allajax.then(function(data){
        $scope.totalviews=data[0];
        $scope.forum=data[1];
        $scope.getcount($scope.forum.userid.id);
        $scope.answers=data[2];
        $scope.getanswercount($scope.forumid);

        var data4=data[3];
        if(data4.forumid){
            $scope.pinflag=true;
            $scope.pinTitle='Unsticky Thread';
        }

        if(!$scope.$$phase){
            $scope.$digest();
        }
    });

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

    $scope.emoticon2 = function () {

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
                $scope.forum.summary = angular.copy($scope.forum.summary) + selectedItem.title;
            } else {
                $scope.forum.summary = angular.copy($scope.forum.summary) + selectedItem;
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

    };

    $scope.delete=function(){
        var param={};
        param.forumid=$scope.forum.id;
        param.todo='delete';

        var myajax=ajaxService.ajaxFactory('/Forumanswer/delete',param,'post');
        myajax.then(
            function(data){
                // it will trigger the watch
                $scope.updateforum=Number(new Date);
                $scope.update=Number(new Date);
                $scope.info.delete=true;


            },
            function(err){
                console.log(err);
            }
        );
    };


    $scope.pinTitle='Sticky Thread';
    $scope.pin=function(){
        var param={};
        param.forumid=$scope.forum.id;
        param.todo='pin';

        var myajax=ajaxService.ajaxFactory('/Forumanswer/pin',param,'post');
        myajax.then(
            function(data){
                // it will trigger the watch
                $scope.update=Number(new Date);
                if(data.todo=='create') {
                    $scope.pinTitle = 'Unsticky Thread';
                } else {
                    $scope.pinTitle = 'Sticky Thread';
                }

            },
            function(err){
                console.log(err);
            }
        );


    };

    $scope.editflag=false;
    $scope.edit=function(){
        $scope.editflag==false?$scope.editflag=true:$scope.editflag=false;
    };

    $scope.editsave=function(){
        var param={};
        param.forumid=$scope.forum.id;
        param.title=$scope.forum.title;
        param.summary=$scope.forum.summary;

        var myajax=ajaxService.ajaxFactory('/Forum/edit',param,'post');
        myajax.then(
            function(data){
                // it will trigger the watch
                $scope.update=Number(new Date);
                $scope.editflag=false;


            },
            function(err){
                console.log(err);
            }
        );


    };

    //This is for accept application
    $scope.acceptappflag=false;
    $scope.acceptapp=function(){
        $scope.pinTitle='Sticky This Thread';
        $scope.pin=function(){
            var param={};
            param.forumid=$scope.forum.id;
            if($scope.forumtopic.prevlevel.id==40) {
                param.topicid = 52;
            }
            if($scope.forumtopic.prevlevel.id==44) {
                param.topicid = 53;
            }
            if($scope.forumtopic.prevlevel.id==48) {
                param.topicid = 54;
            }
            param.todo='acceptapp';

            var myajax=ajaxService.ajaxFactory('/Forum/acceptapplication',param,'post');
            myajax.then(
                function(data){
                    $scope.acceptappflagtrue=true;
                },
                function(err){
                    console.log(err);
                }
            );


        };
    };

    //This is for decline application
    $scope.declineapp=function(){

    };

}]);
