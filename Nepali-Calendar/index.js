$("#date-picker").nepaliDatePicker({
    dateFormat: "%y-%m-%d",
    closeOnDateSelect: true
});

function eventLog(event) {
    var datePickerData = event.datePickerData;
    var outputData = {
        "type": event.type,
        "message": event.message,
        "datePickerData": datePickerData
    };

    var output = (outputData);
    $('.output').append(output);

    console.log(output.type)
    const date = output.datePickerData.adDate.toString()
    console.warn(typeof output)
    englishDate.textContent = `English Date :${date.substring(0, 16)}`
}

const englishDate = document.querySelector('.englishDate')


$("#date-picker").on("show", function (event) {
    var output = '<p><code>▸ Show event trigger</code></p>';
    $('.output').append(output);
});

$("#date-picker").on("yearChange", function (event) {
    eventLog(event);
});

$("#date-picker").on("monthChange", function (event) {
    eventLog(event);
});

$("#date-picker").on("dateChange", function (event) {
    eventLog(event);
});

$("#date-picker").on("dateSelect", function (event) {
    eventLog(event);
});