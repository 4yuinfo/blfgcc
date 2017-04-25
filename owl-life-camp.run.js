        $(function () {
            reload_blfgcc();
        });

        function reload_blfgcc(search) {
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


            $('#blfgcc').load('owl-life-camp.html', function () {
                search = $('#blgcc-search').val();
                if (search.length > 0) {
                    $('.campblock').each(function () {
                        if ($(this).context.innerText.search(search) < 0) {
                            $(this).remove();
                        }
                    });
                }
                pageTotal = $('.campblock').size();
                initPagination(pageTotal);
            });
        }


        var logFunc = function () {
            reload_blfgcc();
        };
        var delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        $('input').keyup(function () {
            delay(function () {
                logFunc();
            }, 100);
        });
