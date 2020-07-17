const $timelineList = $('.timeline-list:first');
// TODO: make the timeline thing a mask for a color underneath that is revealed as you scroll
function createListItem(data, year) {
    if (data.trim() === '') {
        return;
    }

    // Create list item from the inside out
    const $year = $('<time>');
    $year.text(year + ' ');

    // Hide all the event speech bubbles
    const $eventBubble = $('<div>');
    $eventBubble.text(data);

    const $listItem = $('<li>');
    $listItem.addClass('timeline-event');

    $eventBubble.prepend($year);
    $listItem.append($eventBubble);
    $timelineList.append($listItem);
}

// Check if using jQuery, then check if el is a jQuery object
// If jQuery object, get the actual DOM element
function getElement(el) {
    if (typeof jQuery === 'function' && el instanceof jQuery) {
        return el[0];
    }
    return el;
}

// Help from: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
// See user Dan's answer for updated response
function isElementInViewport(el) {
    el = getElement(el);
    // $(window) is the viewport
    const rect = el.getBoundingClientRect();
    const topLeftCornerInView = rect.top >= 0 && rect.left >= 0;
    const bottomRightCornerInView = rect.bottom <= $(window).height() && rect.right <= $(window).width();
    return topLeftCornerInView && bottomRightCornerInView;
}

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

    $(window).scroll();
});

// When DOM content loads, html loads, window is resized, or user scrolls,
// check for visibilty changes
$(window).on('DOMContentLoaded load resize scroll', () => {
    const $events = $('.timeline-event');
    $events.each((i, eventElement) => {
        eventElement = getElement(eventElement);
        if (isElementInViewport(eventElement)) {
            eventElement.classList.add('in-view');
        }
    });
});