package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.Group;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GroupDao {
    int insert(@Param("group") Group group);

    int insertSelective(@Param("group") Group group);

    int insertList(@Param("groups") List<Group> groups);

    int update(@Param("group") Group group);

    List<Group> getAllGroup();
}
