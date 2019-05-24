package com.tuandai.cg.html.service;

import com.tuandai.cg.html.dao.UserDao;
import com.tuandai.cg.html.dto.UserDto;
import com.tuandai.cg.html.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Resource
    private UserDao userDao;

    
    public int insert(User user){
        return userDao.insert(user);
    }

    
    public int insertSelective(User user){
        return userDao.insertSelective(user);
    }

    
    public int insertList(List<User> users){
        return userDao.insertList(users);
    }

    
    public int update(User user){
        return userDao.update(user);
    }

    /**
     * 获取用户列表
     *
     * @param query
     * @return
     */
    public List<UserDto> getUserList(Map<String, Object> query) {
        List<User> userList = userDao.getUserList(query);
        List<UserDto> userDtoList = new ArrayList<>();

        for (User user : userList) {
            UserDto userDto = new UserDto();

            BeanUtils.copyProperties(user, userDto);

            userDtoList.add(userDto);
        }

        return userDtoList;
    }

    /**
     * 获取用户总数
     *
     * @param username
     * @return
     */
    public int getUserListCount(String username) {
        return userDao.getUserListCount(username);
    }

    /**
     * 根据用户名获取用户
     *
     * @param username
     * @return
     */
    public User getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }

    /**
     * 获取所有用户
     *
     * @return
     */
    public List<User> getAllUser() {
        return userDao.getAllUser();
    }

}
