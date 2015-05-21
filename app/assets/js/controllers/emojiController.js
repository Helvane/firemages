/**
 * Created by king on 2/15/15.
 */


appController.controller("emojiController",['$scope','$modalInstance', 'items',function($scope,$modalInstance, items){

    $scope.icons=[
        {"url":"/myphoto/Face 2.gif"},
        {"url":"/myphoto/Face 3.gif"},
        {"url":"/myphoto/Face 4.gif"},
        {"url":"/myphoto/Face 5.gif"},
        {"url":"/myphoto/Crying.gif"},
        {"url":"/myphoto/Chef Face.gif"},
        {"url":"/myphoto/Winky Face.gif"},
        {"url":"/myphoto/Lol Face.gif"},
        {"url":"/myphoto/Confuse Face.gif"},
        {"url":"/myphoto/Santa Face.png"},
        {"url":"/myphoto/Smile Face [2].gif"},
        {"url":"/myphoto/Troll Face.png"},
        {"url":"/myphoto/Thumbs Up.gif"},
        {"url":"/myphoto/Movie Face.gif"},
        {"url":"/myphoto/Support.gif"},
        {"url":"/myphoto/Support [2].gif"},
        {"url":"/myphoto/Welcome Sign.gif"},
        {"url":"/myphoto/Censored Face.gif"},
        {"url":"/myphoto/Chair Face.gif"},
        {"url":"/myphoto/Torch Fire.gif"},
        {"url":"/myphoto/Jason Slayer.gif"},
        {"url":"/myphoto/Canadian Flag.png"}


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