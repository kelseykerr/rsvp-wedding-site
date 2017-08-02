'use strict';

angular.module('kevKelseyWedApp')
  .controller('MainCtrl', function($scope) {

    $scope.main = {

      bridalParty: [{
        'src': '/images/kylie.jpg',
        'title': 'Kylie - Maid of Honor'
      }, {
        'src': '/images/tyler.jpg',
        'title': 'Tyler'
      }, {
        'src': '/images/am.jpg',
        'title': 'Ann Marie'
      }, {
        'src': '/images/chris.jpg',
        'title': 'Chris'
      }, {
        'src': '/images/lauren.jpg',
        'title': 'Lauren'
      }, {
        'src': '/images/doyle.jpg',
        'title': 'Doyle - Best Man'
      }, {
        'src': '/images/ally.jpeg',
        'title': 'Allyson - Maid of Honor'
      }, {
        'src': '/images/victor.jpg',
        'title': 'Victor - Best Man'
      }, {
        'src': '/images/jill.png',
        'title': 'Jill'
      }, {
        'src': '/images/sam.jpg',
        'title': 'Sam'
      }, {
        'src': '/images/therese.jpg',
        'title': 'Therese'
      }],

      engagementPhotos: [{
          image: '/images/engagement_1.jpg'
        },
        {
          image: 'images/engagement_2.jpg'
        },
        {
          image: 'images/engagement_3.jpg'
        },
        {
          image: 'images/engagement_4.jpg'
        }
      ],

      currentIndex: 0,

      deadline: 'October 14 2017 17:00:00 GMT-0500',

      setCurrentSlideIndex: function(index) {
        $scope.main.currentIndex = index;
      },

      isCurrentSlideIndex: function(index) {
        return $scope.main.currentIndex === index;
      },

      nextSlide: function() {
        $scope.main.currentIndex = ($scope.main.currentIndex < $scope.main.engagementPhotos.length - 1) ? ++$scope.main.currentIndex : 0;
      },

      prevSlide: function() {
        $scope.main.currentIndex = ($scope.main.currentIndex > 0) ? --$scope.main.currentIndex : $scope.main.engagementPhotos.length - 1;
      },

      getTimeRemaining: function(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes
        };
      },

      initializeClock: function(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');

        function updateClock() {
          var t = $scope.main.getTimeRemaining(endtime);

          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);

          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 60000);
      }
    };

    $scope.main.initializeClock('clockdiv', $scope.main.deadline);
  })

  .animation('.slide-animation', function() {
    return {
      addClass: function(element, className, done) {
        if (className === 'ng-hide') {
          TweenMax.to(element, 0.5, {
            left: -element.parent().width(),
            onComplete: done
          });
        } else {
          done();
        }
      },
      removeClass: function(element, className, done) {
        if (className === 'ng-hide') {
          element.removeClass('ng-hide');
          TweenMax.set(element, {
            left: element.parent().width()
          });
          TweenMax.to(element, 0.5, {
            left: 0,
            onComplete: done
          });
        } else {
          done();
        }
      }
    };
  });
