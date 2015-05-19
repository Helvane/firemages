/**
 * Created by king on 5/19/15.
 */

appController.controller("formattingController",['$scope','$modalInstance', 'items',function($scope,$modalInstance, items){



    $scope.ok = function (index) {
        var icon=$scope.icons[index];
        $modalInstance.close(icon);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);