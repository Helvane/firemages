/**
 * Created by king on 12/25/14.
 */

var app=angular.module("app",['ui.router','appController', 'appService','ngSanitize','angularFileUpload','emoji','ui.bootstrap','ngCookies']);

app.config(['$stateProvider','$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url:'/home',
                views: {
                    "viewA": {
                        templateUrl: 'templates/home.html'

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

    }

    ]);
