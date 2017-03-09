angular.module('starter.services', [])

  .service('constants', function () {
    this.APIURL = 'http://localhost:1337'
  })

  .service('songs', function (constants, $http, $q) {
    var me = this
    me.get = function () {
      var url = constants.APIURL + '/song'
      return $http.get(url).then(function (res) {
        me.allsongs = res.data
      })
    }
    me.getSongByName = function (name) {
      var defer = $q.defer()
      var filtered = me.allsongs.filter(function (song) {
        return song.title === name
      })
      if (filtered.length === 0) {
        var url = constants.APIURL + '/song' + '?where={"title":"' + name + '"}'
        return $http.get(url).then(function (results) {
          return results.data
        })
      } else {
        defer.resolve(filtered)
      }
      return defer.promise
    }
    me.create = function (song) {
      var url = constants.APIURL + '/song'
      return $http.post(url, song)
    }
    me.update = function (song) {
      var url = constants.APIURL + '/song/' + song._id
      return $http.put(url, song)
    }
    me.delete = function (song) {
      var url = constants.APIURL + '/song/' + song._id
      return $http.delete(url, song)
    }
    me.fuzzySearchByName = function (name) {
      var list = []
      me.allsongs.forEach(function (song) {
        list.push(song.title)
      })
      fuzzyList = FuzzySet(list)
      return fuzzyList.get(name)
    }
    return me
  })
  .service('setlist', function (constants, $http, songs) {
    var me = this
    this.get = function () {
      var url = constants.APIURL + '/setlist'
      return $http.get(url).then(function (res) {
        me.allsets = res.data
      })
    }
    this.create = function (setlist) {
      var url = constants.APIURL + '/setlist'
      return $http.post(url, setlist)
    }
    this.update = function (setlist) {
      var url = constants.APIURL + '/setlist/' + setlist.id
      return $http.put(url, setlist)
    }
    this.delete = function (setlist) {
      var url = constants.APIURL + '/setlist/' + setlist.id
      return $http.delete(url, setlist)
    }
    this.addSongByName = function (set, songName) {
      songs.getSongByName(songName).then(function (song) {
        set.songs.push(song)
        me.update(set).then(function (res) {
        })
      })
    }
  })
