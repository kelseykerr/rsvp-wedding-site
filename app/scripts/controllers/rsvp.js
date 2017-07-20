'use strict';

angular.module('kevKelseyWedApp')
  .controller('RsvpCtrl', function($scope, RsvpService) {

    $scope.rsvp = {
      showLogin: false,

      username: '',

      password: '',

      invitation: {},

      additionalGuests: [],

      doLogin: function() {
        RsvpService.authenticate($scope.rsvp.username, $scope.rsvp.password)
          .then(function(resp) {
            console.log(resp.data.token);
            localStorage.setItem('rsvp.token', resp.data.token);
            $scope.rsvp.showLogin = false;
            $scope.rsvp.getInvite();
          });
      },

      addGuest: function() {
        var newGuest = {
          firstname: "",
          lastname: "",
          guestof: $scope.rsvp.invitation.guests[0].id,
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
        console.log($scope.rsvp.invitation);
        for (var i = 0; i < $scope.rsvp.additionalGuests.length; i++) {
          console.log($scope.rsvp.additionalGuests[i]);
          $scope.rsvp.invitation.guests.push($scope.rsvp.additionalGuests[i]);
        }
        for (var i = 0; i < $scope.rsvp.invitation.guests.length; i++) {
          if ($scope.rsvp.invitation.guests[i].guestof != undefined) {
            $scope.rsvp.invitation.guests[i].guestof = parseInt($scope.rsvp.invitation.guests[i].guestof);
          }
          if ($scope.rsvp.invitation.guests[i].attending === 'true') {
            $scope.rsvp.invitation.guests[i].attending = true;
          } else if ($scope.rsvp.invitation.guests[i].attending === 'false') {
            $scope.rsvp.invitation.guests[i].attending = false;
          }
        }
        RsvpService.updateInvitation($scope.rsvp.invitation)
          .then(function(resp) {

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
        });
      },

      getGuestName: function(guest) {
        return guest.firstname + " " + guest.lastname;
      },

      init: function() {
        var token = localStorage.getItem('rsvp.token');
        if (token === undefined || token === null) {
          $scope.rsvp.showLogin = true;
        } else {
          $scope.rsvp.getInvite();
        }
      }
    }

    $scope.rsvp.init();

  })
