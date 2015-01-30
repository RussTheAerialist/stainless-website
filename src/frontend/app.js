/* jshint browser: true, debug: true */

(function () {
    var nav = require('./lib/nav')
    var scroll_to = require('./lib/scroll')

    nav('top-button', function (evt) {
        var element = evt.target

        scroll_to(element.id+ '-section', 500)
    })
})()
