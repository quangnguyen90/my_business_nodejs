var currentPage = 1;

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
                <h1>${element.username} : ${element.password}</h1>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API Error')
    })
}

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
                <h1>${element.username} : ${element.password}</h1>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API Error')
    })
}

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
                <h1>${element.username} : ${element.password}</h1>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API Error')
    })
}