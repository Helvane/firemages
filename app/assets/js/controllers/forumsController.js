/**
 * Created by king on 4/10/15.
 */

appController.controller("forumsController",['$scope','ajaxService','shareService','$location','$filter','$stateParams','$modal',function($scope, ajaxService, shareService, $location, $filter, $stateParams, $modal){
    $scope.forum={"topic":"","title":"","summary":""};
    $scope.topics=[];
    $scope.myforum=[];
    $scope.update='';
    $scope.topicid=$stateParams.id;
    $scope.pindata=shareService.getpin();
    $scope.forumtopic=shareService.getForum();
    $scope.logindata=shareService.getlogin();
    if(!$scope.logindata){
        shareService.setAlert('You must login before you can view the forums.');
        $location.path('/login');
    }

    $scope.$watch("update",function() {
        var myid=$stateParams.id;
        var param={};
        param.topicid=myid;
        param.number=Number(new Date);
    var myajax=ajaxService.ajaxFactory(GETFORUMURL,param,'get');
    myajax.then(
        function(data){

            $scope.myforum=data;
        },
        function(err){
            console.log(err);
        }
    );
    });

    $scope.gotosummary=function(data){
        // you use a setter
        shareService.setForum(data);

        $location.path('/summary/'+data.id);

    };


    //emoticon button
    $scope.newtopic = function () {
        $location.path('/forumpost/'+$stateParams.id);

    };

    $scope.$on('pinEvent',function(){
       $scope.pindata=shareService.getpin();
       if(!$scope.$$phase){
           $scope.$digest();
       }
    });


    $scope.pincheck=function(id){
        var myflag=false;
        for(var i=0; i < $scope.pindata.length; i ++){
            if(id==$scope.pindata[i].forumid.id){
                myflag=true;
            }
        }
        return myflag;
    }

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

        });
    };

}]);