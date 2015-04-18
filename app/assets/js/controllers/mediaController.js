/**
 * Created by king on 4/17/15.
 */


appController.controller("mediaController",['$scope','$location','ajaxService','shareService','$filter',function($scope,$location,ajaxService, shareService, $filter){

    $scope.$on('topicEvent',function(){
        $scope.topic=shareService.getTopic();
        $scope.atopic=$filter('filter')($scope.topic,{name: 'Media'})[0];



    $scope.forums=[];
    var param={};
    param.topic=$scope.atopic.id;
    param.number=Number(new Date);

    var mymenu=ajaxService.ajaxFactory(GETMEDIAFORUMURL,param,'GET');
    mymenu.then(
        function(data){
            $scope.forums=data;
            console.log(data);

        },
        function(error){
            console.log(error);
        }
    );

    });
    // when a user click on the menu, it loads the page.
    $scope.goto=function(index){


    };






}]);
