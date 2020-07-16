const $timelineList = $('.timeline-list:first');

$(document).ready(() => {
    $.get('text.txt', (data) => {
        const lines = data.split('\n');
        let year = 2000;
        lines.forEach((line) => {
            createListItem(line, year);
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

    const $div = $('<div>');
    $div.text(data);

    const $listItem = $('<li>');
    $listItem.addClass('timeline-event');

    $div.prepend($year);
    $listItem.append($div);
    $timelineList.append($listItem);
}