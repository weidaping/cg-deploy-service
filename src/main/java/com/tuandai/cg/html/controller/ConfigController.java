package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.dto.ConfigDto;
import com.tuandai.cg.html.service.ConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class ConfigController {

    private static final Logger logger = LoggerFactory.getLogger(ConfigController.class);

    @Autowired
    private ConfigService configService;

    @GetMapping("/config/getAllInUse")
    public List<ConfigDto> getAllInUse() {
        List<ConfigDto> configDtos = configService.getAllInUse();

        return configDtos;
    }


    @PostMapping("/config/saveConfig")
    public Map<String, Object> saveUser(@RequestParam String serviceName) {
        logger.info("执行保存配置接口：{}", serviceName);
        Map<String, Object> map = new HashMap<>();

        try {
            configService.insert(serviceName);
            map.put("code", 200);
        } catch (Exception e) {
            logger.error("保存配置异常：{}", serviceName, e);
            if (e instanceof DuplicateKeyException) {
                map.put("code", 403);
            } else {
                map.put("code", 404);
            }
        }

        return map;
    }
}
