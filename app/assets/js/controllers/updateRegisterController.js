/**
 * Created by king on 4/25/15.
 */


appController.controller("updateRegisterController",['$scope','ajaxService','shareService','FileUploader',function($scope,ajaxService,shareService,FileUploader){
    $scope.person={"email":"","steamid":"","photo":"","fursona":""};

    $scope.error={"email":false,"steamid":false,"fursona":false};

    $scope.saveflag=false;
    $scope.saveclass="";
    $scope.errormsg="";
    $scope.emailmsg="Enter your E-Mail";
    $scope.usernameclass="text-danger";

    $scope.validate=function(){
        var count=0;
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
    $scope.usernamemsg="";
    $scope.$watch("person.username",function(){
        $scope.usernamemsg="";
        $scope.saveflag=false;
        $scope.saveclass="";
        $scope.error.username=false;
        if(shareService.validateUsername($scope.person.username)==true){
            $scope.usernamemsg="You can enter only characters and numbers. No special characters";
            $scope.error.username=true;

        }

    });



    $scope.$watch("person.email",function(){
        if($scope.person.email!=""){
            $scope.error.email=false;
        }

    });
    $scope.$watch("person.steamid",function(){
        if($scope.person.steamid!=""){
            $scope.error.steamid=false;
        }
    });


    $scope.savebtn=function(){
        var mydata={};
        $scope.errormsg="";


        var myajax = ajaxService.ajaxFactory(REGISTERURLNOPHOTO, $scope.person, "POST");

        myajax.then(function(data){
                if(data.state==1) {
                    shareService.setlogin(data);
                    $scope.errormsg = "Register a new account is successfully";
                    $scope.saveflag=true;
                } else if(data.state==2) {
                    $scope.errormsg = "Update your account is successfully";
                    var mydata=data;
                    mydata.photo=angular.copy($scope.person.photo)
                    shareService.setlogin(mydata);
                    $scope.saveflag=true;
                } else {
                    $scope.errormsg="This E-Mail and UserName are already existed in our database system";
                }
                $scope.saveclass="";
            },
            function(error){
                alert(error);
                $scope.saveclass="";
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
                $scope.saveclass="disable";
                $scope.savebtn();
            } else {
                $scope.saveclass="disable";
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
        if(data.state==1) {
            shareService.setlogin(data);
            $scope.errormsg = "Register a new account is successfully";
            $scope.saveflag=true;
        } else if(data.state==2) {
            $scope.errormsg = "Update your account is successfully";
            var mydata=data;
            mydata.photo=angular.copy($scope.person.photo);
            shareService.setlogin(mydata);
            $scope.saveflag=true;
        } else {
            $scope.errormsg="This E-Mail and UserName are already existed in our database system";
        }
    };
    uploader.onCompleteAll = function() {
        $scope.progressflag=false;
        $scope.saveclass="";
    };
}]);