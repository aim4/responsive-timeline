const $timelineList = $('.timeline-list:first');

$(document).ready(() => {
    $.get('text.txt', (data) => {
        const lines = data.split('\n');
        let year = 2000;
        lines.forEach((line) => {
            createListItem(line, year);
            // TODO add function to reveal element when in view
            year++;
        });
    }, 'text');
});

function createListItem(data, year) {
    console.log('data: ' + data);
    if (data.trim() === '') {
        return;
    }

    // Create list item from the inside out
    const $year = $('<time>');
    $year.text(year + ' ');

    // Hide all the event speech bubbles
    const $eventBubble = $('<div>');
    $eventBubble.text(data);
    $eventBubble.css('visibility', 'hidden');

    const $listItem = $('<li>');
    $listItem.addClass('timeline-event');

    $eventBubble.prepend($year);
    $listItem.append($eventBubble);
    $timelineList.append($listItem);
}

// Help from: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
// See user Dan's answer for updated response
function isElementInViewport(el) {
    // Check if using jQuery, then check if el is a jQuery object
    // If jQuery object, get the actual DOM element
    if (typeof jQuery === 'function' && el instanceof jQuery) {
        el = el[0];
    }

    // $(window) is the viewport
    const rect = el.getBoundingClientRect();
    const topLeftCornerInView = rect.top >= 0 && rect.left >= 0;
    const bottomRightCornerInView = rect.bottom <= $(window).height() && rect.right <= $(window).width();
    return topLeftCornerInView && bottomRightCornerInView;
}