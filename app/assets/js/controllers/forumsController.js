/**
 * Created by king on 4/10/15.
 */

appController.controller("forumsController",['$scope','ajaxService','shareService','$location',function($scope, ajaxService, shareService, $location){
    $scope.forum={"topic":"","title":"","summary":""};
    $scope.topics=[];
    $scope.myforum=[];
    $scope.update='';

    $scope.$watch("update",function() {
    var param={};
    param.number=new Date();
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


    var myajax=ajaxService.ajaxFactory(TOPICURL,{id:1},'get');
    myajax.then(
      function(data){
          $scope.topics=data;
      },
      function(err){
          console.log(err);
      }
    );


    $scope.save=function(){
        var mycreate=ajaxService.ajaxFactory(CREATEFORUMURL,$scope.forum,'post');
        mycreate.then(
          function(data){
              $scope.forum.topic='';
              $scope.forum.title='';
              $scope.forum.summary='';
              $scope.update=Number(new Date);
          },
          function(err){
              console.log(err);
          }
        );
    }

    $scope.gotosummary=function(data){
        // you use a setter
        shareService.setForum(data);

        $location.path('/summary');

    }

}]);