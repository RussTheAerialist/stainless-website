/* jshint browser: true */
/* Adapted from:
   https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
 */

function smooth_step(start, end, point) {
    if (point <= start) {
        return 0
    }

    if (point >= end) {
        return 1
    }

    var x = (point - start) / (end - start)
    return x*x*(3-2*x)

}

function scroll_to(scrolling_element, target_position, duration, callback) {

    callback = callback || function () {}

    if (duration <= 0) {
        scrolling_element.scrollTop = target_position
        // Scrolling was interrupted
        callback()
        return
    }

    var start_time = Date.now()
    var end_time = start_time + duration
    var start_top = scrolling_element.scrollTop
    var distance = target_position - start_top

    var previous_top = scrolling_element.scrollTop

    var frame = function () {
        if (scrolling_element.scrollTop != previous_top) {
            callback(true)
            return // Scrolling is done
        }

        var now = Date.now()
        var point = smooth_step(start_time, end_time, now)
        var frameTop = Math.round(start_top + distance * point)
        scrolling_element.scrollTop = frameTop

        if (now >= end_time) {
            // Scrolling is finished
            callback()
            return
        }

        // Couldn't scroll anymore, so let's just quit
        if (scrolling_element.scrollTop == previous_top &&
            scrolling_element.scrollTop !== frameTop) {
            callback()
            return
        }

        previous_top = scrolling_element.scrollTop
        setTimeout(frame, 0)

    }

    setTimeout(frame, 0)
}

function start_scroll(target_id, duration, callback) {
    var body = document.documentElement || document.body
    console.log("Starting scroll:" + target_id + " - " + duration)
    var target_element = document.getElementById(target_id)
    var target_position = target_element.getBoundingClientRect().top

    scroll_to(body, Math.round(target_position), Math.round(duration), callback)
}

module.exports = start_scroll
