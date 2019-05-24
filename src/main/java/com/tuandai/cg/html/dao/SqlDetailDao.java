package com.tuandai.cg.html.dao;

import com.tuandai.cg.html.model.SqlDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SqlDetailDao {
    int insert(@Param("sqlDetail") SqlDetail sqlDetail);

    int insertList(@Param("sqlDetails") List<SqlDetail> sqlDetails);

    List<SqlDetail> getByMainRecordNo(@Param("mainRecordNo") String mainRecordNo);
}
