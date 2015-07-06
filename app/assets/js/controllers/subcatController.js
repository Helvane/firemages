/**
 * Created by king on 6/23/15.
 */


appController.controller("subcatController",['$scope','$location','ajaxService','shareService','$filter','$stateParams',function($scope,$location,ajaxService, shareService, $filter, $stateParams){

    $scope.update='';
    $scope.logindata=shareService.getlogin();
    $scope.subtopic=shareService.getForum();
    $scope.subcatid=$stateParams.id;

    var param={};
    param.topicid=$scope.subcatid;
    param.number=Number(new Date);
    var myajax=ajaxService.ajaxFactory('/json/topic.json',param,'get');
    myajax.then(
        function(data){
          for(var i=0; i < data.length; i ++){
              for(var k=0; k < data[i].subtopic.length; k ++) {

                  if (data[i].subtopic[k].id == $scope.subcatid) {
                      $scope.subtopic = data[i].subtopic[k];
                  }
              }
          }
        },
        function(err){
            console.log(err);
        }
    );


    $scope.goto=function(subcat){
        // you use a setter
        var obj={};
        obj=subcat;
        obj.prevlevel=$scope.subtopic;
        shareService.setForum(subcat);
            $location.path('/forumtopic/' + subcat.id);


    };



}]);