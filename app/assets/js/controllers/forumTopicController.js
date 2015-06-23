/**
 * Created by king on 6/19/15.
 */


appController.controller("forumTopicController",['$scope','$location','ajaxService','shareService','$filter',function($scope,$location,ajaxService, shareService, $filter){

    $scope.update='';
    $scope.logindata=shareService.getlogin();
    $scope.forumTopics=[];


        var param={};
        param.number=Number(new Date);
        var ajax=ajaxService.ajaxFactory('/json/topic.json',param,'get');
        ajax.then(
            function(data){
                $scope.forumTopics=data;

            },
            function(error){
                console.log(error);
            }
        );


    $scope.gotosummary=function(data){
        // you use a setter
        shareService.setForum(data);

        $location.path('/summary/'+data.id);

    };



}]);