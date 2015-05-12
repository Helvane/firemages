/**
 * Created by king on 2/15/15.
 */


appController.controller("emojiController",['$scope','$modalInstance', 'items',function($scope,$modalInstance, items){

    $scope.icons=[{"title":":smiley:"},
        {"title":":heart:"}, {"title":":apple:"}, {"title":":anger:"}, {"title":":angry:"}, {"title":":kiss:"}, {"title":":kissing:"},
        {"title":":heart_eyes:"}, {"title":":cry:"}, {"title":":joy:"}, {"title":":information_desk_person:"},{"title":":Crying:"},
        {"title":":Face 2:"}

    ];

    $scope.ok = function (index) {
        var icon=$scope.icons[index];
        $modalInstance.close(icon);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.getIcon=function(index){
       var icon='<div class="icon'+index+'"></div>';
        $modalInstance.close(icon);
    };
}]);