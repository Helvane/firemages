/**
 * Created by king on 12/26/14.
 */




appService.factory('ajaxService',['$http','$q',function($http,$q){

    var pService={};

    pService.ajaxFactory=function(myurl,param,methodtype){
        var defer=$q.defer();
        $http({method: methodtype, url:myurl,params:param}).
            success(function(data,status,headers,config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject(status);
            });
        return defer.promise;
    };
    return pService;

}]);
