# gulp-svg-url-encode
A gulp plugin which transform all svg resources in url(...) declaration into utf-8 encoded DataUrl string.

## Install
Install with npm:
```shell
npm install --save-dev gulp-svg-url-encode
```

## Usage
```css
// in.css
.user {
  background-image: url(user.svg);
}
```

```javascript
// gulpfile.js
var encodeUrlSVG = require('gulp-svg-url-encode')

gulp.task('css', function () {
  return gulp.src('src/css/in.css')
    .pipe(encodeUrlSVG('src/images'))
    .pipe(gulp.dest('dist'))  
})
```

## License
Copyright (c) 2017 moyu under the MIT License.