/**
 * Created by king on 12/27/14.
 */



appController.controller("chatroomController",['$scope','chatSocket','shareService','ajaxService','$location',function($scope, chatSocket, shareService, ajaxService, $location){
    $scope.chattext="";
    $scope.members=[];
    $scope.message=[];


    $scope.person=shareService.getlogin();

    var socket=io.connect(CHATURL);


    socket.on("connect",function(data){
        console.log("*** connect server ***");
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.photo = angular.copy($scope.person.photo);
        socket.emit("joinchat",objmsg);
        // listen to event
        socket.on("getmessage", function (data) {
            console.log("*** get message ***");
            $scope.message = data;
            $scope.$apply();

        });
        // listen to event
        socket.on("chatroom", function (data) {
            console.log("**** receive new user  ****");
            $scope.members = data;
            $scope.$apply();

        });
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
        socket.emit("sendmessage",objmsg);
        $scope.chattext = "";
    };

    $scope.sendMessage = function (event) {
        if (event.which == 13) {
            $scope.sendMessageclick();
        }
    };


    $scope.$on("getmessage",function(data){
        console.log("** getmessage from server **");
        $scope.message=data;
    });


    $scope.emoticon=function(){
        $location.path('/chatroom/emoji');
    }

}]);
