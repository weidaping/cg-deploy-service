package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.DevRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface DevRecordDao {
    int insert(@Param("devRecord") DevRecord devRecord);

    int updatePushTime(@Param("serviceName") String serviceName, @Param("buildNo") int buildNo);

    List<Integer> getBuildNoByServiceName(@Param("serviceName") String serviceName);

    String getBuildNoDesc(@Param("serviceName") String serviceName, @Param("buildNo") int buildNo);

    DevRecord getByServiceNameAndBuildNo(@Param("serviceName") String serviceName, @Param("buildNo") int buildNo);

    List<DevRecord> getBuildList(Map<String, Object> query);

    int getBuildListCount(@Param("serviceName") String serviceName);

    int updateHasSend(@Param("serviceName") String serviceName, @Param("buildNo") int buildNo);

    int updateTextUrl(@Param("serviceName") String serviceName, @Param("buildNo") int buildNo, @Param("textUrl") String textUrl);
}
