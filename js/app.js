// Import data from data.js
var sightingData = data;

// Select features using D3.js
var tableBody = d3.select('tbody');
var tableAll = d3.select('table');


var tableHeader = ['Date', 'City', 'State', 'Country', 'Shape', 'Duration', 'Comments'];


var clickButton = d3.select('#filter-btn');
var inputDate = d3.select('#datetime');
var inputHTML = inputDate.html();
var inputText = inputDate.text();


function click(date) {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    var inputValue = inputDate.property('value');

    var filterDate = filterData(inputValue);

    console.log(filterDate);

    if (filterDate.length == 0) {
        d3.select('thread').remove();
        d3.selectAll('tr').remove();

        var tr = tableBody.append('tr');
        var td = tr.append('td').text('No results');
    }

    else {
        d3.select('thread').remove();
        d3.selectAll('tr').remove();

        tableAll.append('thread');
        var tableHead = d3.select('thread');

        tableHeader.forEach(header => {
            var th = tableHead.append(header);
        });
    

        filterDate.forEach(sightings => {
            var tr = tableBody.append('tr');
            Object.entries(sightings).forEach(function([key, value]) {
                tr.append('td').text(value);
            });
        });
    }
}


function filterData(date) {
    console.log(`The date is ${date}`);
    var filterDate = data.filter(sighting => sighting.datetime === date);
    console.log(`The filtered date is ${filterDate}`);
    return filterDate;
}


clickButton.on('click', click);

