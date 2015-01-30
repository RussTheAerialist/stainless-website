/* jshint browser: true */
var _ = require('lodash')
function attach_nav(classname, callback) {
    var buttons = _(document.getElementsByClassName(classname))
    buttons.forEach(function (n) {
        console.log(n, n.parentElement)
        n.parentElement.addEventListener('click', function(evt) {
            evt.preventDefault()
            callback(evt)
        })
    }).value()

}

module.exports = attach_nav
