/**
 * Created by king on 6/27/15.
 */

angular.module('topicDirective',[])
    .directive("counttopic", ['ajaxService', function(ajaxService) {
        return {
            restrict: 'EA',
            template: "<span>{{name}}</span>",
            scope: {
                topicid: "="
            },
            link: function(scope) {
                scope.name=0;
                var temp=[];
                var subcat=scope.topicid.subcat;
                for(var i=0; i < subcat.length; i ++){
                    temp[i]=subcat[i].id;
                }
                var param={};
                param.topicid=scope.topicid.id;
                param.subcat=temp;


                var ajax=ajaxService.ajaxFactory('/Forum/counttopic',param,'get');
                ajax.then(function(data){
                        scope.name=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])

    .directive("countsubcat", ['ajaxService', function(ajaxService) {
        return {
            restrict: 'EA',
            template: "<span>{{name}}</span>",
            scope: {
                topicid: "="
            },
            link: function(scope) {
                scope.name=0;
                var param={};
                param.topicid=scope.topicid;
                param.subcat=[];
                var ajax=ajaxService.ajaxFactory('/Forum/counttopic',param,'get');
                ajax.then(function(data){
                        scope.name=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])

    .directive("countpost", ['ajaxService', function(ajaxService) {
        return {
            restrict: 'EA',
            template: "<span>{{name}}</span>",
            scope: {
                topicid: "="
            },
            link: function(scope) {
                scope.name=0;
                var temp=[];
                var subcat=scope.topicid.subcat;
                for(var i=0; i < subcat.length; i ++){
                    temp[i]=subcat[i].id;
                }
                var param={};
                param.topicid=scope.topicid.id;
                param.subcat=temp;


                var ajax=ajaxService.ajaxFactory('/Forumanswer/getcountforum',param,'get');
                ajax.then(function(data){
                        scope.name=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])

    .directive("countpostsubcat", ['ajaxService', function(ajaxService) {
        return {
            restrict: 'EA',
            template: "<span>{{name}}</span>",
            scope: {
                topicid: "="
            },
            link: function(scope) {
                scope.name=0;
                var param={};
                param.topicid=scope.topicid;
                param.subcat=[];


                var ajax=ajaxService.ajaxFactory('/Forumanswer/getcountforum',param,'get');
                ajax.then(function(data){
                        scope.name=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])

    .directive("lastpost", ['ajaxService', function(ajaxService) {
        return {
            restrict: 'EA',
            templateUrl: 'templates/lastpost.html',
            scope: {
                topicid: "="
            },
            link: function(scope) {
                scope.forum={};
                var temp=[];
                if(scope.topicid.subcat) {
                    var subcat = scope.topicid.subcat;
                    for (var i = 0; i < subcat.length; i++) {
                        temp[i] = subcat[i].id;
                    }
                }
                var param={};
                param.topicid=scope.topicid.id;
                param.subcat=temp;


                var ajax=ajaxService.ajaxFactory('/Forum/lastpost',param,'get');
                ajax.then(function(data){
                        scope.forum=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])


    .directive("lastanswer", ['ajaxService','shareService', function(ajaxService,shareService) {
        return {
            restrict: 'EA',
            templateUrl: 'templates/lastanswer.html',
            scope: {
                forumid: "="
            },
            link: function(scope) {
                shareService.getItem({});
                scope.forum={};

                var param={};
                param.forumid=scope.forumid;

                var ajax=ajaxService.ajaxFactory('/Forumanswer/lastanswer',param,'get');
                ajax.then(function(data){
                        scope.forum=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])

    .directive("countreply", ['ajaxService', function(ajaxService) {
        return {
            restrict: 'EA',
            template: "<span>{{name}}</span>",
            scope: {
                forumid: "="
            },
            link: function(scope) {
                scope.name=0;
                var param={};
                param.forumid=scope.forumid;

                var ajax=ajaxService.ajaxFactory('/Forumanswer/getcountreply',param,'get');
                ajax.then(function(data){
                        scope.name=data;
                    },
                    function(err){
                        console.log(err);
                    }
                );
            }
        }
    }])

    .directive("resizeImage", ['$sce','$timeout','$filter', function($sce, $timeout, $filter) {
        return {
            restrict: 'EA',
            template: '<pre ng-bind-html="names"></pre>',
            scope: {
                summary: "="
            },
            link: function(scope, element, attr) {
                scope.$watch('summary',function() {
                    var summary=$filter('bbcodefilter')(scope.summary);
                    summary=$filter('bbcodecolorfilter')(summary);
                    summary=$filter('bbcodeboldfilter')(summary);
                    scope.names = $sce.trustAsHtml(summary);
                });

                $timeout(function(){
                    $('pre img').each(function(i,e){
                        var w=$(this).width();
                        var h=$(this).height();
                        if(w > 550 && h > 500) {
                            $(this).css({width:'550px', height:'500px'});
                        }
                    });
                },100);

            }
        }
    }]);
