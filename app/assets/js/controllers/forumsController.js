/**
 * Created by king on 4/10/15.
 */

appController.controller("forumsController",['$scope','ajaxService','shareService','$location','$modal','$filter','FileUploader',function($scope, ajaxService, shareService, $location,$modal, $filter, FileUploader){
    $scope.forum={"topic":"","title":"","summary":""};
    $scope.topics=[];
    $scope.myforum=[];
    $scope.update='';
    $scope.logindata=shareService.getlogin();
    $scope.atopic={'id':0};

    $scope.$watch("update",function() {
    var param={};
        param.number=new Date();
        param.topic=$scope.atopic.id;
        param.number=Number(new Date);
    var myajax=ajaxService.ajaxFactory(GETFORUMURL,param,'get');
    myajax.then(
        function(data){
            $scope.myforum=data;
        },
        function(err){
            console.log(err);
        }
    );
    });

    var param={};
    param.number=Number(new Date);
    var myajax2=ajaxService.ajaxFactory(TOPICURL,param,'get');
    myajax2.then(
      function(data){
          $scope.topics=data;
          $scope.atopic=$filter('filter')(data,{name: 'Media'})[0];
          $scope.update=Number(new Date);
      },
      function(err){
          console.log(err);
      }
    );


    $scope.savebtn=function(){
        var mycreate=ajaxService.ajaxFactory(CREATEFORUMURL,$scope.forum,'post');
        mycreate.then(
          function(data){
              $scope.forum.topic='';
              $scope.forum.title='';
              $scope.forum.summary='';
              $scope.update=Number(new Date);
          },
          function(err){
              console.log(err);
          }
        );
    };

    $scope.gotosummary=function(data){
        // you use a setter
        shareService.setForum(data);

        $location.path('/summary/'+data.id);

    };

    $scope.gotoforumlayout=function(){
        // you use a setter


        $location.path('/forumlayout');

    };


    //emoticon button
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

        // this data return when you close the modal dialog
        modalInstance.result.then(function (selectedItem) {
            if(selectedItem.title) {
                $scope.forum.summary = angular.copy($scope.forum.summary) + selectedItem.title;
            } else {
                $scope.forum.summary = angular.copy($scope.forum.summary) + selectedItem;
            }
        });
    };


    $scope.uploaddata="";
    $scope.myphoto="";
    $scope.progressflag=false;

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


}]);