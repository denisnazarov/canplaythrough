canplaythrough
==============

Provides an alternative `canplaythrough` event calculation for HTML5 video.

In Chrome, `canplaythrough` is incorrectly fired as soon as media load begins.

See: https://code.google.com/p/chromium/issues/detail?id=73609

This library implements its own `canplaythrough` by returning a promise which is resolved when enough of the video has loaded.

Provides this syntax:

```javascript
  $(video).canPlayThrough(url);
```
