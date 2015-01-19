/**
 * Created by king on 12/26/14.
 */


appController.controller("registerController",['$scope','ajaxService','shareService','FileUploader',function($scope,ajaxService,shareService,FileUploader){
    $scope.person={"lastname":"","firstname":"","username":"","password":"","email":"","photo":""};
    $scope.confirm="";
    $scope.error="";
    $scope.progressflag=false;
    var login=shareService.getlogin();
    if(login){
        $scope.person=login;
    }

    $scope.$on("loginEvent",function(){
        $scope.person=shareService.getlogin();
    });

    $scope.savebtn=function(){
        var mydata={};
        $scope.error="";
    
        myajax = ajaxService.ajaxFactory(REGISTERURLNOPHOTO, $scope.person, "POST");

        myajax.then(function(data){
                if(data.status==1) {
                    shareService.setlogin(data);
                    $scope.error = "Register a new account is successfully";
                } else if(data.status==2) {
                    $scope.error = "Update your account is successfully";
                } else {
                    $scope.error="This E-Mail and UserName are already existed in our database system";
                }
            },
            function(error){
                alert(error);
            }

        );
    };

    $scope.uploaddata="";
    $scope.myphoto="";

    var uploader=$scope.uploader=new FileUploader({
        url: REGISTERURL,
        formData:[$scope.person],
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
        fileItem.formData[0]=$scope.person;

        //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        item.formData[0]=$scope.person;
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
        $scope.updatedata=Number(new Date);

        console.log(response);

        var data=response;
        if(data.status==1) {
            shareService.setlogin(data);
            $scope.error = "Register a new account is successfully";
        } else if(data.status==2) {
            $scope.error = "Update your account is successfully";
        } else {
            $scope.error="This E-Mail and UserName are already existed in our database system";
        }
    };
    uploader.onCompleteAll = function() {
        $scope.progressflag=false;
    };
}]);
