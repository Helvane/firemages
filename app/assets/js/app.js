/**
 * Created by king on 12/25/14.
 */

var app=angular.module("app",['ui.router','appController', 'appService','appFilter','ngSanitize','angularFileUpload','emoji','ui.bootstrap','ngCookies','topicDirective','colorpicker.module']);

app.config(['$stateProvider','$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            /*
            .state('home', {
                url:'/home',
                views: {
                    "viewA": {
                        templateUrl: 'templates/home.html',
                        controller: 'homeController'

                    },
                    'viewB@home':{
                        templateUrl: 'templates/media.html',
                        controller: 'mediaController'
                    },
                    'viewC@home':{
                        templateUrl: 'templates/online.html',
                        controller: 'onlineController'
                    },
                    'viewD@home':{
                        templateUrl: 'templates/gaming.html',
                        controller: 'gamingController'
                    },
                    'viewE@home':{
                        templateUrl: 'templates/announcement.html',
                        controller: 'announcementController'
                    }
                }
            })
            */
            .state('home', {
                url:'/home',
                views: {
                    "viewA": {
                        templateUrl: 'templates/forumTopic.html',
                        controller: 'forumTopicController'
                    }
                }
            })
            .state('login', {
                url:'/login',
                views: {
                    "viewA": {
                        templateUrl: 'templates/login.html',
                        controller: 'loginController'
                    }
                }
            })
            .state('inbox', {
                url:'/inbox/:userid',
                views: {
                    "viewA": {
                        templateUrl: 'templates/inbox.html',
                        controller: 'inboxController'
                    }
                }
            })
            .state('profile', {
                url:'/profile/:id',
                views: {
                    "viewA": {
                        templateUrl: 'templates/profile.html',
                        controller: 'profileController'
                    }
                }
            })
            .state('updateRegister', {
                url:'/updateRegister',
                views: {
                    "viewA": {
                        templateUrl: 'templates/updateRegister.html',
                        controller: 'updateRegisterController'
                    }
                }
            })
            .state('register', {
                url:'/register',
                views: {
                    "viewA": {
                        templateUrl: 'templates/register.html',
                        controller: 'registerController'
                    }
                }
            })
            .state('chatroom', {
                url:'/chatroom',
                views: {
                    "viewA": {
                        templateUrl: 'templates/chatroom.html',
                        controller: 'chatroomController'
                    }

                }
            })
            .state('members', {
                url:'/members',
                views: {
                    "viewA": {
                        templateUrl: 'templates/members.html',
                        controller: 'membersController'
                    }

                }
            })
            .state('blog', {
                url:'/blog',
                views: {
                    "viewA": {
                        templateUrl: 'templates/blog.html',
                        controller: 'blogController'
                    }
                }
            })
            /*
            .state('forums', {
                url:'/forums',
                views: {
                    "viewA": {
                        templateUrl: 'templates/forumTopic.html',
                        controller: 'forumTopicController'
                    }
                }
            })
            */
            .state('servers', {
                url:'/servers',
                views: {
                    "viewA": {
                        templateUrl: 'templates/servers.html',
                        controller: 'serversController'
                    }
                }
            })
            .state('subcat', {
                url:'/subcat/:id',
                views: {
                    "viewA": {
                        templateUrl: 'templates/subcat.html',
                        controller: 'subcatController'
                    }
                }
            })

            .state('forumtopic', {
                url:'/forumtopic/:id',
                views: {
                    "viewA": {
                        templateUrl: 'templates/forums.html',
                        controller: 'forumsController'
                    },
                    "pinView@forumtopic":{
                        templateUrl: 'templates/pindata.html',
                        controller: 'pindataController'
                    }
                }
            })

            .state('forumpost', {
                url:'/forumpost/:id',
                views: {
                    "viewA": {
                        templateUrl: 'templates/forumpost.html',
                        controller: 'forumpostController'
                    },
                    "texteditorMenu@forumpost":{
                        templateUrl: 'templates/texteditorMenu.html',
                        controller: 'texteditorMenuController'
                    }
                }
            })

            .state('replyforum', {
                url:'/replyforum/:id',
                views: {
                    "viewA": {
                        templateUrl: 'templates/replyforum.html',
                        controller: 'replyforumController'
                    },
                    "texteditorMenu@forumpost":{
                        templateUrl: 'templates/texteditorMenu.html',
                        controller: 'texteditorMenuController'
                    }
                }
            })

            .state('summary', {
                url:'/summary/:forumid',
                views: {
                    "viewA": {
                        templateUrl: 'templates/summary.html',
                        controller: 'summaryController'
                    },
                    "moderatorView@summary":{
                        templateUrl: 'templates/moderatorTools.html'

                    }
                }
            })
            .state('forumlayout', {
                url:'/forumlayout',
                views: {
                    "viewA": {
                        templateUrl: 'templates/forumlayout.html',
                        controller: 'forumlayoutController'
                    }
                }
            })
            .state('forumlock', {
                url:'/forumlock',
                views: {
                    "viewA": {
                        templateUrl: 'templates/forumlock.html'
                    }
                }
            })


    }

    ]);



var appController=angular.module('appController',['ui.router','ngResource','ngCookies','ngSanitize','emoji']);

var appService=angular.module('appService',['ngResource']);

var appFilter=angular.module("appFilter",[]);
