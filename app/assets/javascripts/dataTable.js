/**
 * Author: Richard Lively and Jesse Russell
 * Initializes DataTable with AJAX
 */
$(document).ready(function () {
    $("#search-table").DataTable({
        scrollY: 'calc(100% - 30px)',
        scrollCollapse: true,
        paging: false,
        order: [1, 'asc'],
        ajax: {
            url: 'judah.cedarville.edu/~gallaghd/cs3220/termProject/getCourseList.php',
            dataSrc: ''
        },
        columns: [
            {data: 'name'},
            {data: 'number'},
            {data: 'description'},
            {data: 'credits'}
        ]
    });
});
$('#search-table').DataTable();