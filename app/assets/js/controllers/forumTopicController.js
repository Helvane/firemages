/**
 * Created by king on 6/19/15.
 */


appController.controller("forumTopicController",['$scope','$location','ajaxService','shareService','$filter','$q',function($scope,$location,ajaxService, shareService, $filter, $q){

    $scope.update='';
    $scope.logindata=shareService.getlogin();
    $scope.forumTopics=[];
    $scope.topics=[];

    var param={};
    param.number=Number(new Date());
    var myajax=ajaxService.ajaxFactory('/Forum/counttopic',param,'get');

        var param={};
        param.number=Number(new Date);
        var ajax=ajaxService.ajaxFactory('/json/topic.json',param,'get');

        var allajax=$q.all([myajax,ajax]);
        allajax.then(
          function(data){
            $scope.topics=data[0];
            $scope.forumTopics=data[1];

            },
            function(error){
                console.log(error);
            }
        );


    $scope.goto=function(data){
        // you use a setter
        shareService.setForum(data);

        if(data.subcat.length > 0) {
            $location.path('/subcat/' + data.id);
        } else {
            $location.path('/forumtopic/' + data.id);
        }

    };



}]);