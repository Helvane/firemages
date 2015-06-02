/**
 * Created by king on 5/31/15.
 */

appController.controller("changepasswordController",['$scope','$modalInstance', 'items','ajaxService',function($scope,$modalInstance, items, ajaxService){

    $scope.myinfo=items;

    $scope.info={"oldpassword":"","newpassword":"","verify":""};
    $scope.errors=angular.copy($scope.info);
    $scope.msg="";
    $scope.msgclass="alert alert-info";

    $scope.updatepassword=function(){
        $scope.count=0;
      if($scope.info.oldpassword==""){
          $scope.errors.oldpassword="Please enter your old password."
          $scope.count++;
      }


        if($scope.info.newpassword==""){
            $scope.errors.newpassword="Please enter your new password."
            $scope.count++;
        }

        if($scope.info.newpassword != $scope.info.verify){
            $scope.errors.verify="Your confirm password does not match with the new password."
            $scope.count++;
        }

        if($scope.count==0){
            var ajax=ajaxService.ajaxFactory('/Users/updatepassword',$scope.info,'post');
            ajax.then(
                function(data){
                    $scope.msg=data.msg;
                    if(data.id==1) {
                        $scope.info.oldpassword="";
                        $scope.info.newpassword="";
                        $scope.info.verify="";
                        $scope.msgclass="alert alert-info";
                    } else {
                        $scope.msgclass="alert alert-warning"
                    }
                    console.log(data);
                },
                function(err){
                    console.log(err);
                }
            );

        }

    };

    $scope.$watch("info.oldpassword",function(){
        $scope.errors.oldpassword="";
    });

    $scope.$watch("info.newpassword",function(){
        $scope.errors.newpassword="";
    });

    $scope.$watch("info.verify",function(){
        $scope.errors.verify="";
    });

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

}]);
