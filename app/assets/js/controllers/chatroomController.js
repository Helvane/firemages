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
    io.socket.on("messageEvent", function (data) {
        console.log("*** get message ***");
        var param={};
        param.number=Number(new Date);
        io.socket.get('/Chat/getmessage',param,function(data){
           $scope.message=data;
           $scope.$digest();
        });

    });
   var param={};
   param.number=Number(new Date);
   io.socket.get("/Chat/getmessage",param,function(data){
       $scope.message=data;
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
