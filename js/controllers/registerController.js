/**
 * Created by king on 12/26/14.
 */


appController.controller("registerController",['$scope','ajaxService','shareService','FileUploader',function($scope,ajaxService,shareService,FileUploader){
    $scope.person={"lastname":"","firstname":"","username":"","password":"","confirm":"","email":"","steamid":"","photo":""};

    $scope.error={"lastname":false,"firstname":false,"username":false,"password":false,"confirm":false,"email":false,"steamid":false};


    $scope.errormsg="";
    $scope.emailmsg="Enter your E-Mail";

    $scope.validate=function(){
        var count=0;
        if($scope.person.lastname==""){
            $scope.error.lastname=true;
            count++;
        } else {
            $scope.error.lastname=false;
        }
        if($scope.person.firstname==""){
            $scope.error.firstname=true;
            count++;
        } else {
            $scope.error.firstname=false;
        }

        if($scope.person.username==""){
            $scope.error.username=true;
            count++;
        } else {
            $scope.error.username = false;
        }

        if($scope.person.password==""){
            $scope.error.password=true;
            count++;
        } else {
            $scope.error.password=false;
        }
        if($scope.person.confirm==""){
            $scope.error.confirm=true;
            count++;
        } else {
            $scope.error.confirm=false;
        }
        if($scope.person.email==""){
            $scope.error.email=true;
            count++;
        } else {
            if(shareService.validateEmail($scope.person.email)==false) {
                $scope.error.email = true;
                $scope.emailmsg="You entered the wrong E-Mail make sure that it is spelled right or it is a real E-Mail";
                count++;
            } else {
                $scope.error.email=false;

            }
        }
        if($scope.person.steamid==""){
            $scope.error.steamid=true;

            count++;
        } else {
            $scope.error.steamid=false;
        }


         return count;
    };

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
        $scope.errormsg="";

        myajax = ajaxService.ajaxFactory(REGISTERURLNOPHOTO, $scope.person, "POST");

        myajax.then(function(data){
                if(data.status==1) {
                    shareService.setlogin(data);
                    $scope.errormsg = "Register a new account is successfully";
                } else if(data.status==2) {
                    $scope.errormsg = "Update your account is successfully";
                    var mydata=data;
                    mydata.photo=angular.copy($scope.person.photo)
                    shareService.setlogin(mydata);
                } else {
                    $scope.errormsg="This E-Mail and UserName are already existed in our database system";
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

    $scope.save=function() {
        if ($scope.validate()==0) {
            if ($scope.myphoto == "") {
            $scope.savebtn();
            } else {
                uploader.uploadAll();
            }
       }
    };

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        fileItem.formData[0]=angular.copy($scope.person);
        $scope.myphoto=fileItem.alias;

        //console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        //console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        item.formData[0]=angular.copy($scope.person);
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

        var data=response;
        if(data.status==1) {
            shareService.setlogin(data);
            $scope.errormsg = "Register a new account is successfully";
        } else if(data.status==2) {
            $scope.errormsg = "Update your account is successfully";
            var mydata=data;
            mydata.photo=angular.copy($scope.person.photo);
            shareService.setlogin(mydata);
        } else {
            $scope.errormsg="This E-Mail and UserName are already existed in our database system";
        }
    };
    uploader.onCompleteAll = function() {
        $scope.progressflag=false;
    };
}]);
