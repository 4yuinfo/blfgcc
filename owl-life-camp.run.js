$(function () {
    reload_owllccc();
});

function reload_owllccc(search) {
    waitingDialog.show('特約營區資料整理中...');
    var initPagination = function (pageTotal) {
        $("#pagination").pagination(pageTotal, {
            num_edge_entries: 5, //
            num_display_entries: 5, //
            callback: pageselectCallback,
            items_per_page: 12, //
            prev_show_always: true,
            next_show_always: true,
            prev_text: "上一頁",
            next_text: "下一頁"
        });
    };

    function pageselectCallback(page_index, jq) {
        $(".campblock").hide();
        camp_beging = page_index * 12;
        camp_ending = camp_beging + 12;
        for ($i = camp_beging; $i < camp_ending; $i++) {
            $(".campblock").eq($i).show();
        }
        return false;
    }

    $('#owllccc').load('owl-life-camp.html', function () {
        oldata = $('#owl-life-search-store').val();
        search = $('#owl-life-search-text').val();
        if (oldata != search) {
            if (search.length > 0) {
                $('.campblock').each(function () {
                    if ($(this).context.innerText.search(search) < 0) {
                        $(this).remove();
                    }
                });
            }
            pageTotal = $('.campblock').size();
            initPagination(pageTotal);
            $('#owl-life-search-store').val(search);
        }
    });
    waitingDialog.hide();
}

$('#owl-life-search-button').click(function () {
    reload_owllccc();
});
$('#owl-life-search-submit').click(function () {
    reload_owllccc();
});

$('#owl-life-search-text').bind('keypress', function (event) {
    if (event.keyCode == 13) {
        reload_owllccc();
    }
});

