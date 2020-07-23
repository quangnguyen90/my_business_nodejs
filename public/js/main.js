var currentPage = 1;

$('#paging').pagination({
    dataSource: '/users?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        return response.total;
    },
    pageSize: 2,
    afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
    },
    afterPreviousOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
    },
    afterNextOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
    }
})

function loadPage(page) {
    currentPage = page;
    $.ajax({
        url: '/users?page=' + page,
        type: 'GET'
    })
    .then(data => {
        const records = data.data;
        $('#content').html('');
        for(let i = 0; i < records.length; i++) {
            const element = records[i];
            var item = $(`
                <h3>${element.username} : ${element.password}</h3>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API Error')
    })
}

loadPage(1);

// Unused
function nextPage() {
    currentPage++;
    $.ajax({
        url: '/users?page=' + currentPage,
        type: 'GET'
    })
    .then(data => {
        const records = data.data;
        $('#content').html('');
        for(let i = 0; i < records.length; i++) {
            const element = records[i];
            var item = $(`
                <h3>${element.username} : ${element.password}</h3>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API Error')
    })
}

// Unused
function prevPage() {
    currentPage--;
    $.ajax({
        url: '/users?page=' + currentPage,
        type: 'GET'
    })
    .then(data => {
        const records = data.data;
        $('#content').html('');
        for(let i = 0; i < records.length; i++) {
            const element = records[i];
            var item = $(`
                <h3>${element.username} : ${element.password}</h3>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API Error')
    })
}