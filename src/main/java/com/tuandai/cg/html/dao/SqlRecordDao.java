package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.SqlRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SqlRecordDao {
    int insert(@Param("sqlRecord") SqlRecord sqlRecord);

    int insertList(@Param("sqlRecords") List<SqlRecord> sqlRecords);

    List<SqlRecord> getSqlList(Map<String, Object> query);

    int getSqlListCount();

    SqlRecord getByRecordNo(@Param("recordNo") String recordNo);

    int updatePushTime(@Param("recordNo") String recordNo, @Param("commitVersion") String commitVersion);

    int updateHasSend(@Param("recordNo") String recordNo);
}
