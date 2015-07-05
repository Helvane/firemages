/**
 * Created by king on 6/14/15.
 */

appController.controller("pindataController",['$scope','$location','ajaxService','shareService','$filter','$stateParams',function($scope,$location,ajaxService, shareService, $filter, $stateParams){

    $scope.update='';
    $scope.logindata=shareService.getlogin();
    $scope.topicid=$stateParams.id;

    $scope.$watch('update',function(){


        $scope.forums=[];
        var param={};
        param.topicid=$stateParams.id;
        param.number=Number(new Date);
        var mymenu=ajaxService.ajaxFactory('/Forumanswer/getpin',param,'GET');
        mymenu.then(
            function(data){
                $scope.forums=data;
                shareService.setpin(data);

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