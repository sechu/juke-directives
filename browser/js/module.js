'use strict';

var juke = angular.module('juke', ['ui.router', 'ngMessages']);

juke.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });
});

juke.directive('jukeSidebar', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/sidebar/template/sidebar.html',
	}
})

juke.directive('player', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/player/template/player.html',
		link: function(scope, element, attr) {
			angular.extend(scope, PlayerFactory);
			scope.toggle = function () {
				if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
				else PlayerFactory.resume();
			};

			scope.getPercent = function () {
				return PlayerFactory.getProgress() * 100;
			};	
		}
	}
})

juke.directive('albumList', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/album/templates/albums.html',
		scope: {
			albums: '='
		}
	}
})

juke.directive('songList', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/artist/templates/artist-songs.html',
		scope: {
			songs: '='
		},
		link: function(scope, element, attr) {

			scope.toggle = function (song) {
				if (song !== PlayerFactory.getCurrentSong()) {
					PlayerFactory.start(song, $scope.playlist.songs);
				} else if ( PlayerFactory.isPlaying() ) {
					PlayerFactory.pause();
				} else {
					PlayerFactory.resume();
				}
			};

			scope.getCurrentSong = function () {
				return PlayerFactory.getCurrentSong();
			};

			scope.isPlaying = function (song) {
				return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
			};
		}
	}
})



