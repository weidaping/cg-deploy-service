/**
 * Created by zhoufurong on 2018/12/7.
 */
var vm = new Vue({
    el: '#rrapp',
    data: {
        q:{
            serviceName:"",
            num:""
        },

    },
    created: function () {
        $.ajax({
            type: "GET",
            url: baseURL + "config/getAllInUse",
            dataType: "json",
            success: function (data) {
                //this.services = data;
                //this.serviceSelected = this.services[0].serviceName;
            }
        });
    },
    methods: {
        serviceSelected: function(){
            //获取选中的优惠券
            console.log(this.serviceSelected)
        },

        deploy: function () {
            console.log("123")
        }

    }
})