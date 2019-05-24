package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.dto.GroupDto;
import com.tuandai.cg.html.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class GroupController {

    private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private GroupService groupService;

    @GetMapping("/group/getAllGroup")
    public List<GroupDto> getAllInUse() {
        List<GroupDto> groupList = groupService.getAllGroup();

        return groupList;
    }

}
