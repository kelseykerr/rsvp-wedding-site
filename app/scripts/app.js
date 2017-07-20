'use strict';

/**
 * @ngdoc overview
 * @name kevinKelseyWedApp
 * @description
 * # kevinKelseyWedApp
 *
 * Main module of the application.
 */
angular
  .module('kevKelseyWedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'akoenig.deckgrid',
    'duScroll'
  ])
  .config(function($stateProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('saveTheDate', {
        url: '/savethedate',
        templateUrl: 'views/save-the-date.html',
        controller: 'StdCtrl'
      })
      .state('rsvp', {
        url: '/rsvp',
        templateUrl: 'views/rsvp.html',
        controller: 'RsvpCtrl'
      });
    $locationProvider.html5Mode(true);
  });
