angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)

      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.song', {
        url: '/song',
        views: {
          'tab-song': {
            templateUrl: 'templates/tab-song.html',
            controller: 'SongsCtrl as ctrl'
          }
        }
      })

      .state('tab.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: 'templates/tab-list.html',
            controller: 'ListCtrl as ctrl'
          }
        }
      })

      .state('tab.setlist', {
        url: '/setlist',
        views: {
          'tab-setlist': {
            templateUrl: 'templates/tab-setlist.html',
            controller: 'SetlistCtrl as ctrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/tab/song')

  })
