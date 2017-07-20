'use strict';

angular.module('kevKelseyWedApp')
  .factory('RsvpService', ['$http', function($http) {

    var baseUrl = "http://localhost:8080/api";
    return {
      authenticate: function(username, password) {
        var authObj = {
          "username": username,
          "password": password
        };
        return $http({
          method: 'POST',
          url: baseUrl + '/login',
          data: authObj
        });
      },

      getInvitation: function() {
        var token = localStorage.getItem('rsvp.token');
        return $http({
          method: 'GET',
          url: baseUrl + '/invite',
          headers: {
            'x-auth-token': token
          }
        });
      },

      updateInvitation: function(invitation) {
        var token = localStorage.getItem('rsvp.token');
        return $http({
          method: 'PUT',
          url: baseUrl + '/invite',
          data: invitation,
          headers: {
            'x-auth-token': token
          }
        });
      }
    };
  }]);
