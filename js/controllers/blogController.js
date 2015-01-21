/**
 * Created by king on 1/10/15.
 */

appController.controller("blogController",['$scope','shareService','ajaxService',function($scope,shareService,ajaxService){

    $scope.users=shareService.getusers();
    if($scope.users.length == 0) {
        var myusers=ajaxService.ajaxFactory(USERSURL,{},'GET');
        myusers.then(
            function(data){
                $scope.users=data;
            },
            function(err){
                alert(err);
            }
        );
    }

    $scope.message="";

    $scope.save=function() {
        var person=shareService.getlogin();

        var param={};
        param.message=angular.copy($scope.message);
        param.username=person.username;
        param.photo=person.photo;
        var senddata=ajaxService.ajaxFactory(BLOGURL,param,'POST');
        senddata.then(
            function(data) {

                $scope.update=Number(new Date);
                $scope.message="";
            },
            function(error){
                alert(error);
            }
        );
    }

   //get blog message
    $scope.update="";
    $scope.listmessages=[];

    $scope.$watch("update",function(){
        var param={};
        param.date=Number(new Date);
       var mydata=ajaxService.ajaxFactory(GETBLOGURL,param,"GET");
        mydata.then(
          function(data){

           $scope.listmessages=shareService.enhanceblog(data,$scope.users);
          },
          function(error){
              alert(error);
          }

        );

    });

}]);
