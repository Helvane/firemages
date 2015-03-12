/**
 * Created by king on 1/10/15.
 */

appController.controller("blogController",['$scope','shareService','ajaxService','FileUploader','$modal',function($scope,shareService,ajaxService,FileUploader,$modal){

    $scope.blogid=0;
    $scope.users=shareService.getusers();
    if($scope.users.length == 0) {
        var myusers=ajaxService.ajaxFactory(USERSURL,{},'GET');
        myusers.then(
            function(data){
                $scope.users=data;
            },
            function(err){
                alert(err);
            }
        );
    }

    $scope.message="";

    $scope.savebtn=function() {
        var person=shareService.getlogin();

        var param={};
        param.message=angular.copy($scope.message);
        param.username=person.username;
        param.photo=person.photo;
        var senddata=ajaxService.ajaxFactory(BLOGURL,param,'POST');
        senddata.then(
            function(data) {
                $scope.blogid=data.blogid;
                $scope.update=Number(new Date);
                $scope.message="";

                if(uploader.queue.length > 0) {
                    uploader.uploadAll();

                }

            },
            function(error){
                alert(error);
            }
        );
    }

   //get blog message
    $scope.update="";
    $scope.listmessages=[];

    $scope.$watch("update",function(){
        var param={};
        param.date=Number(new Date);
       var mydata=ajaxService.ajaxFactory(GETBLOGURL,param,"GET");
        mydata.then(
          function(data){
            console.log(data);
           $scope.listmessages=data;
          },
          function(error){
              alert(error);
          }

        );

    });

    $scope.uploaddata="";
    $scope.myphoto="";
    $scope.progressflag=false;
    $scope.person=shareService.getlogin();

    var uploader=$scope.uploader=new FileUploader({
        url: BLOGURLPHOTO,
        formData:[$scope.message],
        alias:"photo",
        removeAfterUpload:true,
        queueLimit:5,
        filters: [{
            name: 'photofilter',
            // A user-defined filter
            fn: function(item) {
                if(item.type=="image/jpg"||item.type=="image/jpeg"||item.type=="image/png"||item.type=="image/gif"||item.type=="image/pdf") {
                    return true;
                } else {
                    return false;
                }
            }
        }]
    });

    $scope.save=function(){
     $scope.savebtn();


    };

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {


        console.log(fileItem);

        //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        var imagetype = shareService.getImageType(item.file.type);
        console.log("imagetype = "+imagetype);

        item.formData[0]={"blogid":$scope.blogid,"imagetype":imagetype};
        $scope.progressflag=true;
    };
    uploader.onProgressItem = function(fileItem, progress) {
        $scope.progressflag=true;
    };
    uploader.onProgressAll = function(progress) {
        //console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);

    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        //console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.progressflag=false;
        $scope.update=Number(new Date);


    };
    uploader.onCompleteAll = function() {
        $scope.message="";
        $scope.progressflag=false;
        $scope.update=Number(new Date);
    };

    $scope.items = ['item1', 'item2', 'item3'];

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
            if(selectedItem.title) {
                $scope.message = angular.copy($scope.message) + selectedItem.title;
            } else {
                $scope.message = angular.copy($scope.message) + selectedItem;
            }
        });
    };

    $scope.deleteitem=function(item){
        item.remove();
    }


}]);
