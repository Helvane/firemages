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

    var objmsg = {};
    objmsg.username = angular.copy($scope.person.username);
    objmsg.photo = angular.copy($scope.person.photo);
    io.socket.get('/Chatroom/join',objmsg,function(data){
        console.log(data);
    });


    io.socket.on("joinEvent",function(){
        var objmsg={};
        objmsg.number=Number(new Date);
        io.socket.get('/Chatroom/getmembers',objmsg,function(data){
            $scope.members=data;
            console.log("**** members ****");
            console.log(data);
            $scope.$digest();
        });

    });


    // listen to event
    io.socket.on("messageEvent", function (data) {
        var param={};
        param.number=Number(new Date);
        io.socket.get('/Chat/getmessage',param,function(data){
           $scope.message=data;
           $scope.$digest();
            var element = angular.element('#messages');
            var height=element.innerHeight()+8000;
            angular.element('#messages').animate({scrollTop: height}, "slow");

        });

    });


   var param={};
   param.number=Number(new Date);
   io.socket.get("/Chat/getmessage",param,function(data){
       $scope.message=data;


       var element = angular.element('#messages');
       var height=element.innerHeight()+8000;
       angular.element('#messages').animate({scrollTop: height}, "slow");

       $scope.$digest(); 

   });


    $scope.$on("$stateChangeStart",function(){
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.photo = angular.copy($scope.person.photo);
        io.socket.post("/Chatroom/logout",objmsg,function(data){
            console.log(data);
        })
    });

    $scope.sendMessageclick = function () {
        var objmsg = {};
        objmsg.username = angular.copy($scope.person.username);
        objmsg.message = angular.copy($scope.chattext);
        objmsg.photo="";
        io.socket.post("/Chat/createmessage",objmsg,function(data){
            console.log(data);
        });
        $scope.chattext="";

    };

    $scope.sendMessage = function (event) {
        if (event.which == 13) {
            $scope.sendMessageclick();
        }
    };


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
