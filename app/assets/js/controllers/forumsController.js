/**
 * Created by king on 4/10/15.
 */

appController.controller("forumsController",['$scope','ajaxService','shareService','$location','$filter','$stateParams',function($scope, ajaxService, shareService, $location, $filter, $stateParams){
    $scope.forum={"topic":"","title":"","summary":""};
    $scope.topics=[];
    $scope.myforum=[];
    $scope.update='';
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



}]);