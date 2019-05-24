package com.tuandai.cg.html.service;

import com.tuandai.cg.html.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by weidaping on 2019/1/17.
 */
@Service
public class LoginService {
    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private UserService userService;

    /**
     * 登录
     *
     * @param username
     * @param password
     * @return
     */
    public Map<String, Object> login(String username, String password) {
        Map<String, Object> map = new HashMap<>();

        User user = userService.getUserByUsername(username);

        if (user != null) {
            String pass = user.getPassword();

            if (pass.equals(password)) {
                logger.info("登录成功：username:{}", username);
                this.loginSuccess(user);

                map.put("code", 200);
            } else {
                logger.info("密码错误：username:{}", username);
                map.put("code", 96);
            }
        } else {
            logger.info("用户不存在：username:{}", username);
            map.put("code", 404);
        }

        return map;
    }

    /**
     * 登录成功
     *
     * @param user
     */
    public void loginSuccess(User user) {
        //设置session
        HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
        session.setAttribute("user", user);
    }

    /**
     * 获取当前登录的用户
     * @return
     */
    public User getCurrentUser() {
        HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
        return (User) session.getAttribute("user");
    }
}
