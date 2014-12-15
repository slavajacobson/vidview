# VidView.js

jQuery plugin to help enable video preview.

## Prerequisites:
- [FFmpeg Installation](https://trac.ffmpeg.org/wiki/CompilationGuide)
- [ImageMagick Installation](http://www.imagemagick.org/script/binary-releases.php)


## Generate a Montage:
```
ffmpeg -i input.mp4 -f image2 -vsync vfr -vframes 50 thumb%04d.jpg
    
```

```
montage *.jpg -quality 65 -geometry 320x180 -tile 5x10 montage.jpg
```


## Installation:

Include script *after* the jQuery library:

```html
<script src="/path/to/vidview.js"></script>
```


## Usage:


```javascript
$(".vidview").vidView({
  image_url: 'images/montage.jpg', 
  width: 320, 
  height: 180, 
  autoPlay: 'hover'
});
```

## More Info:

[VidView.js Page](http://vidview.slavajacobson.com)