package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;


    @RequestMapping("/")
    public ModelAndView loginPage(){

        return new ModelAndView("login");
    }

    @RequestMapping("/index")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();

        mv.setViewName("index");

        return mv;
    }

    @PostMapping("/login")
    public Object login(@RequestParam String username, @RequestParam String password) {
        logger.info("登录接口调用");
        Map<String, Object> map = new HashMap<>();

        try {
            map = loginService.login(username, password);
        } catch (Exception e) {
            logger.info("登录接口异常：username:{}", username);
            map.put("code", 999);
        }

        return map;
    }


}
