package com.tuandai.cg.html.service;

import com.tuandai.cg.html.model.Menu;
import com.tuandai.cg.html.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by weidaping on 2019/1/17.
 */
@Service
public class MenuService {

    private static final Logger logger = LoggerFactory.getLogger(MenuService.class);

    /**
     * 获取所有菜单
     *
     * @return
     */
    public List<Menu> getMenuList() {
        List<Menu> menuList = new ArrayList<>();

        Menu menuParent = this.buildTopMenu();
        menuParent.setChildren(this.buildChildrenMenu());
        menuList.add(menuParent);

        return menuList;
    }

    /**
     * 构建子菜单
     *
     * @return
     */
    private List<Menu> buildChildrenMenu() {
        List<Menu> childrenMenu = new ArrayList<>();

        try {
            User user = (User) ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession().getAttribute("user");
            String role = user.getUserRole();

            switch (role) {
                case "dev":
                    childrenMenu = Arrays.asList(this.buildDevMenu());
                    break;
                case "test":
                    childrenMenu = Arrays.asList(this.buildDevMenu(), this.buildTestMenu(), this.buildSqlUploadMenu(), this.buildSqlPushMenu());
                    break;
                case "admin":
                    childrenMenu = Arrays.asList(this.buildDevMenu(), this.buildTestMenu(), this.buildUserMenu(), this.buildSqlUploadMenu(), this.buildSqlPushMenu());
                    break;
                default:
                    logger.error("不存在的用户角色：{}", role);
                    break;
            }
        } catch (Exception e) {
            logger.error("生成子菜单出错：{}", e);
        }

        return childrenMenu;
    }

    /**
     * 父菜单
     *
     * @return
     */
    private Menu buildTopMenu() {
        Menu menuParent = new Menu();

        menuParent.setAppId(67);
        menuParent.setId(1024);
        menuParent.setLink(false);
        menuParent.setMenu(true);
        menuParent.setName("自动部署");
        menuParent.setParentId(0);

        return menuParent;
    }

    /**
     * 开发上传jar包的菜单
     * @return
     */
    private Menu buildDevMenu() {
        Menu menu = new Menu();

        menu.setAppId(68);
        menu.setChildren(null);
        menu.setId(1025);
        menu.setLink(false);
        menu.setMenu(true);
        menu.setName("jar包上传");
        menu.setParentId(1024);
        menu.setUrls("devUpload.html");

        return menu;
    }

    /**
     * 测试推送jar包的菜单
     *
     * @return
     */
    private Menu buildTestMenu() {
        Menu menu = new Menu();

        menu.setAppId(69);
        menu.setChildren(null);
        menu.setId(1026);
        menu.setLink(false);
        menu.setMenu(true);
        menu.setName("jar包推送");
        menu.setParentId(1024);
        menu.setUrls("testPush.html");

        return menu;
    }

    /**
     * 用户管理的菜单
     *
     * @return
     */
    private Menu buildUserMenu() {
        Menu menu = new Menu();

        menu.setAppId(70);
        menu.setChildren(null);
        menu.setId(1027);
        menu.setLink(false);
        menu.setMenu(true);
        menu.setName("用户管理");
        menu.setParentId(1024);
        menu.setUrls("userList.html");

        return menu;
    }

    /**
     * SQL上传的菜单
     *
     * @return
     */
    private Menu buildSqlUploadMenu() {
        Menu menu = new Menu();

        menu.setAppId(71);
        menu.setChildren(null);
        menu.setId(1028);
        menu.setLink(false);
        menu.setMenu(true);
        menu.setName("SQL上传");
        menu.setParentId(1024);
        menu.setUrls("sqlUpload.html");

        return menu;
    }

    /**
     * SQL推送的菜单
     *
     * @return
     */
    private Menu buildSqlPushMenu() {
        Menu menu = new Menu();

        menu.setAppId(72);
        menu.setChildren(null);
        menu.setId(1029);
        menu.setLink(false);
        menu.setMenu(true);
        menu.setName("SQL推送");
        menu.setParentId(1024);
        menu.setUrls("sqlPush.html");

        return menu;
    }
}
