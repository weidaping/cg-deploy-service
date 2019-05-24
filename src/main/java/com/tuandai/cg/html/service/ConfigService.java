package com.tuandai.cg.html.service;

import com.tuandai.cg.html.dao.ConfigDao;
import com.tuandai.cg.html.dto.ConfigDto;
import com.tuandai.cg.html.model.Config;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConfigService {

    @Resource
    private ConfigDao configDao;

    
    public int insert(String serviceName){
        return configDao.insert(serviceName);
    }

    
    public int insertSelective(Config config){
        return configDao.insertSelective(config);
    }

    
    public int insertList(List<Config> configs){
        return configDao.insertList(configs);
    }

    
    public int update(Config config){
        return configDao.update(config);
    }

    public List<ConfigDto> getAllInUse() {
        List<Config> configs = configDao.getAllInUse();
        List<ConfigDto> configDtos = new ArrayList<>();

        for (Config config : configs) {
            ConfigDto configDto = new ConfigDto();

            BeanUtils.copyProperties(config, configDto);

            configDtos.add(configDto);
        }

        return configDtos;
    }

    public int getCurrentBuildNo(String serviceName) {
        return configDao.getCurrentBuildNo(serviceName);
    }

    public int updateCurrentBuildNo(String serviceName, int newBuildNo) {
        return configDao.updateCurrentBuildNo(serviceName, newBuildNo);
    }

}
