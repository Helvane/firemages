/**
 * Created by king on 1/10/15.
 */

appController.controller("blogController",['$scope','shareService','ajaxService','FileUploader',function($scope,shareService,ajaxService,FileUploader){

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

                $scope.update=Number(new Date);
                $scope.message="";
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

           $scope.listmessages=shareService.enhanceblog(data,$scope.users);
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

        if($scope.myphoto=="")
        {
            $scope.savebtn();
        } else {
            uploader.uploadAll();
        }

    };

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.formData[0]={"message":$scope.message,"username":$scope.person.username};
        $scope.myphoto=fileItem.alias;

        //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        item.formData[0]={"message":$scope.message,"username":$scope.person.username};
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
        $scope.progressflag=false;
        $scope.update=Number(new Date);
    };

}]);
