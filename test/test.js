var assert = require('assert')
var gutil = require('gulp-util')
var encodeUrlSVG = require('../index')

describe('gulp-svg-url-encode', function () {

  describe('in buffer mode', function () {

    it('should convert url() content', function (done) {
      var fakeFile = new gutil.File({
        contents: new Buffer('.user{background-image: url(user.svg)}')
      })

      var stream = encodeUrlSVG('test/images')
      stream.write(fakeFile)
      stream.once('data', function (file) {
        assert(file.isBuffer())
        assert.equal(file.contents.toString('utf8'), ".user{background-image: url(data:image/svg+xml,%3Csvg width='50px' height='50px' viewBox='0 0 50 50' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E %3Ccircle fill='%23D8D8D8' cx='25' cy='25' r='25'%3E%3C/circle%3E %3C/svg%3E)}")
        done()
      })
    })

  })
  
})