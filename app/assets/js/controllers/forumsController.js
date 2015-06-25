/**
 * Created by king on 4/10/15.
 */

appController.controller("forumsController",['$scope','ajaxService','shareService','$location','$filter','$stateParams',function($scope, ajaxService, shareService, $location, $filter, $stateParams){
    $scope.forum={"topic":"","title":"","summary":""};
    $scope.topics=[];
    $scope.myforum=[];
    $scope.update='';
    $scope.forumtopic=shareService.getForum();
    $scope.forumtopicid=$stateParams.id;
    $scope.logindata=shareService.getlogin();
    if(!$scope.logindata){
        shareService.setAlert('You must login before you can view the forums.');
        $location.path('/login');
    }
    $scope.atopic={'id':0};
    $scope.atopic2={'id':0};
    $scope.atopic3={'id':0};

    $scope.$watch("update",function() {
    var param={};
        param.number=new Date();
        param.topic=[$scope.atopic.id,$scope.atopic2.id,$scope.atopic3.id];
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

    var param={};
    param.number=Number(new Date);
    var myajax2=ajaxService.ajaxFactory(TOPICURL,param,'get');
    myajax2.then(
      function(data){
          $scope.topics=data;
          $scope.atopic=$filter('filter')(data,{name: 'Media'})[0];
          $scope.atopic2=$filter('filter')(data,{name: 'Gaming'})[0];
          $scope.atopic3=$filter('filter')(data,{name: 'Announcement'})[0];
          $scope.update=Number(new Date);
      },
      function(err){
          console.log(err);
      }
    );


    $scope.gotosummary=function(data){
        // you use a setter
        shareService.setForum(data);

        $location.path('/summary/'+data.id);

    };


    //emoticon button
    $scope.newtopic = function () {
        $location.path('/forumpost/'+$scope.forumtopicid);


    };



}]);