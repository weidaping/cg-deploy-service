package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDao {
    int insert(@Param("user") User user);

    int insertSelective(@Param("user") User user);

    int insertList(@Param("users") List<User> users);

    int update(@Param("user") User user);

    List<User> getUserList(Map<String, Object> query);

    int getUserListCount(@Param("username") String username);

    User getUserByUsername(@Param("username") String username);

    List<User> getAllUser();
}
