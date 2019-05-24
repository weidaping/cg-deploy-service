package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.Config;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ConfigDao {
    int insert(@Param("serviceName") String serviceName);

    int insertSelective(@Param("config") Config config);

    int insertList(@Param("configs") List<Config> configs);

    int update(@Param("config") Config config);

    List<Config> getAllInUse();

    int getCurrentBuildNo(@Param("serviceName") String serviceName);

    int updateCurrentBuildNo(@Param("serviceName") String serviceName, @Param("newBuildNo") int newBuildNo);
}
