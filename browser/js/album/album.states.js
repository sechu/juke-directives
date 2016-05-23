'use strict';

juke.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("/", '/albums').otherwise('/');

  $stateProvider.state('albums', {
    url: '/albums',
    template: '<album-list albums="albums"></album-list>',
    controller: 'AlbumsCtrl',
    resolve: {
      allAlbums: function (AlbumFactory) {
        return AlbumFactory.fetchAll();
      }
    }
  });

  $stateProvider.state('album', {
    url: '/albums/:albumId',
    templateUrl: '/js/album/templates/album.html',
    controller: 'AlbumCtrl',
    resolve: {
      theAlbum: function (AlbumFactory, $stateParams) {
        return AlbumFactory.fetchById($stateParams.albumId);
      }
    }
  });

});
