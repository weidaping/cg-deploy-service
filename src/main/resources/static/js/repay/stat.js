var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            db: 0,
            key: "",
            value: "",
            redisDb: "",
        },
        stat: {repayCountToday: 0, repayCountTomorrow: 0, repayTableCount: 0},
        preTransStat: {donePreRepayToday: 0, undoPreRepayToday: 0, undo1houPreRepayToday: 0, undoTran1HOUR: 0},
        transStat: {
            transSuccessCount: 0,
            transUnSuccessCount: 0,
            transAbandonCount: 0,
            acceptedSuccessCount: 0,
            maxOffset: 0,
            transFails: 0
        },
        showList: null,
        title: null,
        select_db: false
    },
    created: function () {
        this.query();
    },
    methods: {
        query: function () {
            $.ajax({
                type: "GET",
                url: baseURL + "repay/stat/overviews",
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        setStat(r.stats);
                        setPreStat(r.preTransStats);
                        setTransStat(r.transStats);
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        reloadTable: function () {
            $('#table-container').html('');
            vm.query();
        },

    }
});

function setStat(stat) {
    vm.stat.repayCountToday = stat.repayCountToday;
    vm.stat.repayCountTomorrow = stat.repayCountTomorrow;
    vm.stat.repayTableCount = stat.repayTableCount;
}

function setPreStat(preStat) {
    vm.preTransStat.donePreRepayToday = preStat.donePreRepayToday;
    vm.preTransStat.undoPreRepayToday = preStat.undoPreRepayToday;
    vm.preTransStat.undo1houPreRepayToday = preStat.undo1houPreRepayToday;
    vm.preTransStat.undoTran1HOUR = preStat.undoTran1HOUR;
}

function setTransStat(transStat) {
    vm.transStat.acceptedSuccessCount = transStat.acceptedSuccessCount;
    vm.transStat.transSuccessCount = transStat.transSuccessCount;
    vm.transStat.transAbandonCount = transStat.transAbandonCount;
    vm.transStat.transFails = transStat.transFails;
    vm.transStat.maxOffset = transStat.maxOffset;
}

