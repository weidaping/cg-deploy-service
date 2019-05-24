package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.model.Menu;
import com.tuandai.cg.html.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/menu/getMenu")
    public Map<String, Object> getMenu() {
        Map<String, Object> map = new HashMap<>();

        List<Menu> menuList = menuService.getMenuList();
        map.put("menuList", menuList);

        return map;
    }
}
