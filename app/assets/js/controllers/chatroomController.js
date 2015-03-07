/**
 * Created by king on 12/27/14.
 */



appController.controller("chatroomController",['$scope','shareService','ajaxService','$location','$modal',function($scope, shareService, ajaxService, $location,$modal){
    $scope.chattext="";
    $scope.members=[];
    $scope.message=[];
    $scope.messageEvent=1;

    var CHATURL="";

    $scope.person=shareService.getlogin();



   $scope.memberEvent="";
   $scope.$watch("memberEvent",function(){
        console.log("*** connect server ***");
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.photo = angular.copy($scope.person.photo);
        var myajax=ajaxService.ajaxFactory(CHATURL+'/Chat/join',objmsg,'POST');
        myajax.then(
            function(data){
                $scope.members=data;

            },
            function(error){
                alert(error);
            }
        );

        // listen to event

            var myajax=ajaxService.ajaxFactory(CHATURL+'/Chat/getmembers',objmsg,'GET');
            myajax.then(
                function(data){
                    $scope.members=data;
                },
                function(error){
                    alert(error);
                }
            );


    });

    // listen to event
    io.socket.on("getmessage", function (data) {
        console.log("*** get message ***");
        $scope.messageEvent=Number(new Date);

    });

    io.socket.on("disconnect",function(data){
        console.log("*** disconnect ***");
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.id = Number(new Date);
        var myajax=ajaxService.ajaxFactory(CHATURL+'/Chat/logout',objmsg,'POST');
        myajax.then(
            function(data){
                $scope.members=data;
                socket.emit("joinchat",objmsg);
            },
            function(error){
                alert(error);
            }
        );
    });


    $scope.$on("$stateChangeStart",function(){
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.photo = angular.copy($scope.person.photo);
        socket.emit("disconnect",objmsg);
    });

    $scope.sendMessageclick = function () {
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.message = angular.copy($scope.chattext);
        objmsg.photo="";
        var myajax=ajaxService.ajaxFactory(CHATURL+'/Chatroom/createmessage',objmsg,'POST');
        myajax.then(
            function(data){
                $scope.chattext = "";
                $scope.messageEvent=Number(new Date);

            },
            function(error){
                alert(error);
            }
        );

    };

    $scope.sendMessage = function (event) {
        if (event.which == 13) {
            $scope.sendMessageclick();
        }
    };


    $scope.$watch("messageEvent",function(data){
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.photo = angular.copy($scope.person.photo);
        objmsg.id=Number(new Date);
        var myajax=ajaxService.ajaxFactory(CHATURL+'/Chatroom/getmessage',objmsg,'GET');
        myajax.then(
            function(data){
                $scope.message=data;
            },
            function(error){
                alert(error);
            }
        );
    });


    $scope.emoticon = function () {

        var modalInstance = $modal.open({
            templateUrl: 'templates/emoji.html',
            controller: 'emojiController',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.chattext=angular.copy($scope.chattext) + selectedItem.title;
        });
    };

}]);
