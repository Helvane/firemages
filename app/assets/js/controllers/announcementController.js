/**
 * Created by king on 5/16/15.
 */



appController.controller("announcementController",['$scope','$location','ajaxService','shareService','$filter',function($scope,$location,ajaxService, shareService, $filter){

    $scope.update='';
    $scope.logindata=shareService.getlogin();

    $scope.$watch('update',function(){
        $scope.topic=shareService.getTopic();
        $scope.atopic=$filter('filter')($scope.topic,{name: 'Announcement'})[0];

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

    $scope.$on('topicEvent',function(){
        $scope.update=Number(new Date);
    });

    $scope.gotosummary=function(data){
        // you use a setter
        shareService.setForum(data);

        $location.path('/summary/'+data.id);

    };

    $scope.gotoprofile=function(url){
        if(!$scope.logindata){
            shareService.setAlert('You must be logged in to view profiles.');
            $location.path('/login');
        } else {
            $location.path(url);
        }
    }

}]);