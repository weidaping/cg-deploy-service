//生成菜单
var menuItem = Vue.extend({
    name: 'menu-item',
    props: {
        item: {}, index: 0
    },
    template: [
        '<li :class="{active: (item.urls==null && index === 0)}">',
        '<a v-if="item.urls==null" href="javascript:;" :id = "\'m_\'+item.id">',
        '<i v-if="item.icon != null" :class="item.icon"></i>',
        '<span>{{item.name}}</span>',
        '<i class="fa fa-angle-left pull-right"></i>',
        '</a>',
        '<ul v-if="item.urls==null" class="treeview-menu">',
        '<menu-item :item="item" :index="index" v-for="(item, index) in item.children"></menu-item>',
        '</ul>',
        '<a v-if="item.urls!=null" :href="\'#\'+item.urls" :data-pid = "\'m_\'+item.parentId">' +
        '<i v-if="item.icon != null" :class="item.icon"></i>' +
        '<i v-else class="fa fa-circle-o"></i> {{item.name}}' +
        '</a>',
        '</li>'
    ].join('')
});

//iframe自适应
$(window).on('resize', function () {
    var $content = $('.content');
    $content.height($(this).height() - 120);
    $content.find('iframe').each(function () {
        $(this).height($content.height());
    });
}).resize();

//注册菜单组件
Vue.component('menuItem', menuItem);

var vm = new Vue({
    el: '#rrapp',
    data: {
        user: {},
        menuList: {},
        main: "default.html",
        oldPassword: '',
        newPassword: '',
        twicePassword: '',
        preNavTitle: "",
        navTitle: "欢迎"
    },
    methods: {
        getMenuList: function () {
            $.getJSON("/menu/getMenu", function (r) {
                console.log(r);
                vm.menuList = r.menuList;
                //路由
                var router = new Router();
                routerList(router, vm.menuList);
                router.start();
            });
        },
        logout: function () {
        }
    },
    created: function () {
        this.getMenuList();
    }
});


function routerList(router, menuList) {
    for (var key in menuList) {
        var menuOne = menuList[key];
        if (menuOne.urls == null) {
            routerList(router, menuOne.children);
        } else if (menuOne.urls != null) {
            router.add('#' + menuOne.urls, function () {
                var url = window.location.hash;

                //替换iframe的url
                vm.main = url.replace('#', '');

                //导航菜单展开
                $(".treeview-menu li").removeClass("active");
                $(".sidebar-menu li").removeClass("active");
                $("a[href='" + url + "']").parents("li").addClass("active");
                var pid = $("a[href='" + url + "']").data("pid");
                vm.preNavTitle = $("#" + pid + " span").text();
                vm.navTitle = $("a[href='" + url + "']").text();
                console.log(vm.navTitle);
            });
        }
    }
}
