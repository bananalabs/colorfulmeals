'use strict';

angular.module('MyFoodApp', ['ngRoute', 'MyFoodApp.services.recipes', 'MyFoodApp.directives']).
    config(function($routeProvider) {
        $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl as main'});
        $routeProvider.when('/view', {templateUrl: 'partials/view.html', controller: 'ViewCtrl as view'});
        $routeProvider.otherwise({redirectTo: '/main'});

    });
