/**
 * Created by king on 5/17/15.
 */

appController.controller("lockController",['$scope','$modalInstance', 'items',function($scope,$modalInstance, items){



    $scope.ok = function (index) {
        var icon=$scope.icons[index];
        $modalInstance.close(icon);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


}]);