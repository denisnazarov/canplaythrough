;(function($, undefined){
  'use strict';

  // Provides this syntax:
  //
  //   $(video).canPlayThrough(someUrl);
  //
  $.fn.canPlayThrough = function(newSrc) {
    var $video = this,
        videoElement = $video[0],
        promise = $.Deferred();

    var successCallback = function(){
      $video.off('progress canplaythrough canplay',  checkProgress);
      promise.resolve($video);
    }

    var checkProgress = function(event){
      var currentTime = event.timeStamp;
      var numberOfTimeRangesLoaded = videoElement.buffered.length;
      if (numberOfTimeRangesLoaded > 0) {
        var secondsLoaded = videoElement.buffered.end(0);
        var duration = videoElement.duration / 3;
        var elapsedTime = (currentTime - loadStartTime) / 1000; // in seconds
        var downloadRate = elapsedTime / secondsLoaded;
        var secondsToLoad = duration - secondsLoaded;
        var estimatedRemainingDownloadSeconds = secondsToLoad * downloadRate;

        if (secondsLoaded > estimatedRemainingDownloadSeconds) {
          successCallback();
          // console.log("progress," 1);
        } else {
          var loadingProgress = elapsedTime / ((estimatedRemainingDownloadSeconds - secondsToLoad) + elapsedTime);
          // console.log("progress," loadingProgess);
        }
      }
    };

    var loadStartTime = new Date().valueOf();

    videoElement.preload = "auto";
    videoElement.autobuffer = true;

    $video.on('progress canplaythrough canplay', checkProgress);
    $video.attr('src', newSrc);

    return promise;
  }

}(jQuery));
