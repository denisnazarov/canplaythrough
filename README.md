canplaythrough
==============

Provides an alternative canplaythrough calculation for html5 video.

In Chrome, `canplaythrough` is incorrectly fired as soon as media load begins.

This library implements its own `canplaythrough` by returning a promise which is resolved when enough of the video has loaded.

Provides this syntax:

```javascript
  $(video).canPlayThrough(url);
```
