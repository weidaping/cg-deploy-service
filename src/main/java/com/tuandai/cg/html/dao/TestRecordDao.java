package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.TestRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TestRecordDao {
    int insert(@Param("testRecord") TestRecord testRecord);

    String getCommitVersion(@Param("serviceName") String serviceName, @Param("buildNo") int buildNo);
}
