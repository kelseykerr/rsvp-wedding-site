'use strict';

angular.module('kevKelseyWedApp')
  .controller('RsvpCtrl', function($scope, RsvpService, $location) {

    $scope.rsvp = {
      showLogin: false,

      showReceived: false,

      username: '',

      error: '',

      password: '',

      invitation: {},

      additionalGuests: [],

      doLogin: function() {
        if ($scope.rsvp.username == null || $scope.rsvp.username.length == 0 ||
          $scope.rsvp.password == null || $scope.rsvp.password.length == 0) {
          return;
        }
        RsvpService.authenticate($scope.rsvp.username, $scope.rsvp.password)
          .then(function(resp) {
            localStorage.setItem('rsvp.token', resp.data.token);
            $scope.rsvp.showLogin = false;
            $scope.rsvp.getInvite();
            $scope.rsvp.error = '';
          }, function(error) {
            console.log('error');
            $scope.rsvp.error = "invalid login credentials";
          });
      },

      addGuest: function() {
        var newGuest = {
          firstname: "",
          lastname: "",
          guestOf: $scope.rsvp.invitation.guests[0].id,
          email: "",
          attending: true
        }
        $scope.rsvp.additionalGuests.push(newGuest);
      },

      removeGuest: function(newGuest) {
        var index = $scope.rsvp.additionalGuests.indexOf(newGuest);
        if (index > -1) {
          $scope.rsvp.additionalGuests.splice(index, 1);
        }
      },

      submitRsvp: function() {
        for (var i = 0; i < $scope.rsvp.additionalGuests.length; i++) {
          $scope.rsvp.invitation.guests.push($scope.rsvp.additionalGuests[i]);
        }
        for (var i = 0; i < $scope.rsvp.invitation.guests.length; i++) {
          if ($scope.rsvp.invitation.guests[i].guestOf != undefined) {
            $scope.rsvp.invitation.guests[i].guestOf = parseInt($scope.rsvp.invitation.guests[i].guestOf);
          }
          if ($scope.rsvp.invitation.guests[i].attending === 'true') {
            $scope.rsvp.invitation.guests[i].attending = true;
          } else if ($scope.rsvp.invitation.guests[i].attending === 'false') {
            $scope.rsvp.invitation.guests[i].attending = false;
          }
        }
        RsvpService.updateInvitation($scope.rsvp.invitation)
          .then(function(resp) {
            $scope.rsvp.showReceived = true;
          }, function(error) {
            console.log(error);
            if (error.status == 401) {
              $scope.rsvp.showLogin = true;
            }
          })

      },

      canAddMoreGuests: function() {
        if ($scope.rsvp.invitation.guests === undefined) {
          return false;
        }
        return $scope.rsvp.invitation.additionalGuests != 0 &&
          ($scope.rsvp.additionalGuests.length != $scope.rsvp.invitation.additionalGuests) &&
          $scope.rsvp.invitation.totalAllowed > $scope.rsvp.invitation.guests.length;
      },

      getInvite: function() {
        RsvpService.getInvitation().then(function(resp) {
          $scope.rsvp.invitation = resp.data;
          for (var i = 0; i < $scope.rsvp.invitation.guests.length; i++) {
            if ($scope.rsvp.invitation.guests[i].attending) {
              $scope.rsvp.invitation.guests[i].attending = 'true';
            } else {
              $scope.rsvp.invitation.guests[i].attending = 'false';
            }
          }
        }, function(error) {
          if (error.status == 401) {
            $scope.rsvp.showLogin = true;
            $scope.rsvp.showLogin = true;
            if ($location.search().username != null) {
              $scope.rsvp.username = $location.search().username;
              $location.search('username', null);
            }
            if ($location.search().password != null) {
              $scope.rsvp.password = $location.search().password;
              $location.search('password', null);
            }
          }
        });
      },

      getGuestName: function(guest) {
        return guest.firstname + " " + guest.lastname;
      },

      init: function() {
        var token = localStorage.getItem('rsvp.token');
        if (token === undefined || token === null) {
          $scope.rsvp.showLogin = true;
          if ($location.search().username != null) {
            $scope.rsvp.username = $location.search().username;
            $location.search('username', null);
          }
          if ($location.search().password != null) {
            $scope.rsvp.password = $location.search().password;
            $location.search('password', null);
          }
        } else {
          $scope.rsvp.getInvite();
        }
      }
    }

    $scope.rsvp.init();

  })
