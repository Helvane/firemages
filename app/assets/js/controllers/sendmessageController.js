/**
 * Created by king on 6/2/15.
 */


appController.controller("sendmessageController",['$scope','$modalInstance', 'items','ajaxService','shareService',function($scope,$modalInstance, items, ajaxService, shareService){

    $scope.person=items;
    $scope.logindata=shareService.getlogin();

    $scope.msg={"summary":""};
    $scope.errors={"summary":""};

    $scope.send=function(){
      if($scope.msg.summary==''){
          $scope.errors.summary="Please enter your message."

      } else {
          var param={};
          param.memberid=$scope.person.id;
          param.message=$scope.msg.summary;
          var ajax=ajaxService.ajaxFactory('/Inbox/create',param,'post');
          ajax.then(
            function(data){
                if(data.id){
                    $scope.msg.summary='';
                    $scope.close();
                }

            },
              function(err){
                  console.log(err);
              }
          );
      }

    };

    $scope.$watch('msg.summary',function(){
       $scope.errors.summary='';
    });



    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };


}]);
