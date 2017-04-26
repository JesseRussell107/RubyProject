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
    });
});