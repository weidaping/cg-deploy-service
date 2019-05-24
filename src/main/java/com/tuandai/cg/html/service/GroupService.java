package com.tuandai.cg.html.service;

import com.tuandai.cg.html.dao.GroupDao;
import com.tuandai.cg.html.dto.ConfigDto;
import com.tuandai.cg.html.dto.GroupDto;
import com.tuandai.cg.html.model.Config;
import com.tuandai.cg.html.model.Group;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {

    @Resource
    private GroupDao groupDao;

    
    public int insert(Group group){
        return groupDao.insert(group);
    }

    
    public int insertSelective(Group group){
        return groupDao.insertSelective(group);
    }

    
    public int insertList(List<Group> groups){
        return groupDao.insertList(groups);
    }

    
    public int update(Group group){
        return groupDao.update(group);
    }

    public List<GroupDto> getAllGroup() {
        List<Group> groups = groupDao.getAllGroup();
        List<GroupDto> groupDtos = new ArrayList<>();

        for (Group group : groups) {
            GroupDto groupDto = new GroupDto();

            BeanUtils.copyProperties(group, groupDto);

            groupDtos.add(groupDto);
        }

        return groupDtos;
    }
}
