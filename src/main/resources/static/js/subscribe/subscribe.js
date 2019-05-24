var jqgridtemp;

$(function () {
    jqgridtemp = $("#jqGrid").jqGrid({
        url: baseURL + 'cgtSbPreTransaction/getListForPage',
        datatype: "json",
        colModel: colData,
        shrinkToFit: false,
        autowidth: true,
        autoScroll: true,
        viewrecords: true,
        rowNum: 20,
        height: 700,
        rowList: [10, 40, 60],
        rownumbers: true,
        multiselect: false,
        pager: "#jqGridPager",
        gridview: true,
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
        },
        onSelectRow: function (id) {
        },
        postData:{
            'bizType': vm.q.bizType
        }
    });

});

var vm = new Vue({
    el: '#rrapp',
    data: {

    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {

        }
    }
});

