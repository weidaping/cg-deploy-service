package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.dto.UserDto;
import com.tuandai.cg.html.model.User;
import com.tuandai.cg.html.service.UserService;
import com.tuandai.cg.html.utils.PageUtils;
import com.tuandai.cg.html.utils.Query;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;


    @GetMapping("/user/userList")
    public Map<String, Object> buildList(@RequestParam Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        Query query = new Query(params);
        String username = null;

        //设置查询参数
        if (params.get("username") != null && StringUtils.isNotBlank(params.get("username").toString())) {
            username = params.get("username").toString();
        }

        query.put("username", username);

        //查询数据列表
        List<UserDto> userDtoList = userService.getUserList(query);
        int count = userService.getUserListCount(username);

        PageUtils pageUtils = new PageUtils(userDtoList, count, query.getLimit(), query.getPage());

        map.put("page", pageUtils);

        return map;
    }


    @GetMapping("/user/getAllUser")
    public List<User> getAUser() {
        List<User> userList = new ArrayList<>();

            try {
                userList = userService.getAllUser();
            } catch (Exception e) {
                logger.error("获取所有用户错误:", e);
            }

        return userList;
    }

    @PostMapping("/user/saveUser")
    public Map<String, Object> saveUser(User user) {
        logger.info("执行保存用户接口：{}", user.getUsername());
        Map<String, Object> map = new HashMap<>();

        try {
            userService.insert(user);
            map.put("code", 200);
        } catch (Exception e) {
            logger.error("保存用户异常：{}", user.getUsername(), e);
            if (e instanceof DuplicateKeyException) {
                map.put("code", 403);
            } else {
                map.put("code", 404);
            }
        }

        return map;
    }
}
