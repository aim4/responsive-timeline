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

    const $year = $('<time>');
    $year.text(year);

    const $listItem = $('<li>');
    $listItem.text(data);
    $listItem.addClass('timeline-event');

    $listItem.prepend($year);
    $timelineList.append($listItem);
}