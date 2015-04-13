/**
 * Created by king on 4/12/15.
 */

appController.controller("summaryController",['$scope','ajaxService','shareService',function($scope, ajaxService, shareService){

    $scope.forum=shareService.getForum();
    $scope.responseText='';
    $scope.answers=[];
    $scope.update='';

    $scope.$watch('update',function(){
       var param={};
       param.forumid=$scope.forum.id;
       param.number=Number(new Date);
       var myajax=ajaxService.ajaxFactory(GETANSWERURL,param,'get');
       myajax.then(
         function(data){
             $scope.answers=data;
         },
           function(err){
               console.log(err);
           }
       );

    });

    $scope.replyflag=false;

    $scope.reply=function(){

        if($scope.replyflag==false){
            $scope.replyflag=true;
        } else {
            $scope.replyflag=false;
        }
    };

    $scope.save=function(){
         var param={};
        param.forumid=$scope.forum.id;
        param.answer=$scope.responseText;
        var myajax=ajaxService.ajaxFactory(CREATEANSWERURL,param,'post');
        myajax.then(
          function(data){
              // it will trigger the watch
              $scope.update=Number(new Date);
          },
            function(err){
                console.log(err);
            }
        );
    };

    $scope.emoticon=function(){


    };

}]);
