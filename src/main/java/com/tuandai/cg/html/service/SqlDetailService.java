package com.tuandai.cg.html.service;

import com.tuandai.cg.html.dao.SqlDetailDao;
import com.tuandai.cg.html.model.SqlDetail;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SqlDetailService {

    @Resource
    private SqlDetailDao sqlDetailDao;

    
    public int insert(SqlDetail sqlDetail){
        return sqlDetailDao.insert(sqlDetail);
    }

    

    public int insertList(List<SqlDetail> sqlDetails){
        return sqlDetailDao.insertList(sqlDetails);
    }

    public List<SqlDetail> getByMainRecordNo(String mainRecordNo) {
        return sqlDetailDao.getByMainRecordNo(mainRecordNo);
    }
}
