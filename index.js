var through = require('through2')
var gutil = require('gulp-util')
var path = require('path')
var fs = require('fs')

var PLUGIN_NAME = 'gulp-svg-url-encode'
var rImages = /url(?:\(['|"]?)(.*?)(?:['|"]?\))/ig
var imagesPath = ''

module.exports = function encodeUrlSVG(givenImagesPath) {
  var stream = through.obj(function (file, enc, cb) {
    var self = this
    
    imagesPath = givenImagesPath || ''

    // Do nothing if there is no contents
    if (file.isNull()) {
      this.push(file)
      return cb()
    }

    // Not support Stream!
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Stream not supported!'))
      return cb()
    }

    // Transform svg resources
    if (file.isBuffer()) {
      var content = file.contents.toString('utf8')
      var result = content.replace(rImages, encodeSVG)

      file.contents = new Buffer(result)

      this.push(file)
    }

    return cb()
  })

  return stream
}

function encodeSVG(imageExpr, imagePath) {
  try {
    var fileData = fs.readFileSync(path.join(imagesPath, imagePath))
  }
  catch (e) {
    gutil.log(gutil.colors.yellow(PLUGIN_NAME), 'Referenced file not found: ' + path.join(imagesPath, imagePath))
    return imageExpr
  }

  var content = fileData.toString('utf8')
  content = content.replace(/^\s*<\?xml [^>]*>\s*/i, "")
  content = content.replace(/"/g, "'")
  content = content.replace(/\s+/g, " ")
  content = content.replace(/[{}\|\\\^~\[\]`"<>#%]/g, function(match) {
    return '%' + match[0].charCodeAt(0).toString(16).toUpperCase()
  })

  return 'url(data:image/svg+xml,' + content.trim() + ')'
}
