/**
 * Created by king on 2/15/15.
 */


appController.controller("emojiController",['$scope','$modalInstance', 'items',function($scope,$modalInstance, items){

    $scope.icons=[
        {"url":"/styles/images/PNG/icontexto-emoticons-01-016x016.png"}





    ];

    $scope.ok = function (index) {
       $scope.getIcon(index);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.getIcon=function(index){
       var icon='<span><img src="'+$scope.icons[index].url+'"></span>';
        $modalInstance.close(icon);
    };
}]);