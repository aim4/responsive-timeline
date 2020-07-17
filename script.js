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
