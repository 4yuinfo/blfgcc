$(function () {
    var initPagination = function (pageTotal) {
        $("#pagination").pagination(pageTotal, {
            num_edge_entries: 5, //
            num_display_entries: 5, //
            callback: pageSelectCallback,
            items_per_page: 12, //
            prev_show_always: true,
            next_show_always: true,
            prev_text: "上一頁",
            next_text: "下一頁"
        });
    };

    function pageSelectCallback(page_index, jq) {
        camp_beging = page_index * 12;
        camp_ending = camp_beging + 12;
        var i = 0;
        loopObj = campVue.camps;
        if ($("#cc-search-text").val().length > 0) {
            loopObj = campVue.searc;
        }
        for (var key in loopObj) {
            if (camp_beging <= i && camp_ending > i) {
                Vue.set(campVue.shows, i, loopObj[key]);
            } else {
                Vue.delete(campVue.shows, i);
            }
            i++;
        }
        return false;
    }

    var campVue = new Vue({
        el: '#campcc',
        data: {
            camps: {},
            shows: {},
            searc: {},
        },
        methods: {
            getAllCamps: function () {
                var self = this;
                $.ajax({
                    url: "cc.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        self.camps = data;
                        Object.size = function (obj) {
                            var size = 0, key;
                            for (key in obj) {
                                if (obj.hasOwnProperty(key)) size++;
                            }
                            return size;
                        };
                        var pageTotal = Object.size(data);
                        initPagination(pageTotal);
                    },
                    error: function () {
                        alert("ERROR!!!");
                    }
                });
            },
            searchCamps: function (value) {
                this.shows = null;
                this.shows = {};
                var i = 0;
                for (var key in this.camps) {
                    if (campVue.camps[key].camp_name.indexOf(value) > -1
                        || campVue.camps[key].camp_place.indexOf(value) > -1
                        || campVue.camps[key].blfc_friends.indexOf(value) > -1) {
                        Vue.set(campVue.searc, i, this.camps[key]);
                        i++;
                    }
                }
                initPagination(i);
            }
        },
        created: function () {
            this.getAllCamps();
        },
        filters: {
            pointChang: function (value) {
                return 'http://maps.google.com/?q=' + value;
            },
            imgChang: function (value) {
                return 'images-camp/' + value;
            },
            telLink: function (value) {
                return 'tel:' + value;
            },
        }
    })

    $("#cc-search-text").bind("input", function () {
        campVue.searchCamps(this.value);
    });
});

