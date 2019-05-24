package com.tuandai.cg.html.service;

import com.tuandai.cg.html.config.Globals;
import com.tuandai.cg.html.dao.SqlDetailDao;
import com.tuandai.cg.html.dao.SqlRecordDao;
import com.tuandai.cg.html.dto.DevRecordOutDto;
import com.tuandai.cg.html.dto.SqlRecordInDto;
import com.tuandai.cg.html.dto.SqlRecordOutDto;
import com.tuandai.cg.html.model.DevRecord;
import com.tuandai.cg.html.model.SqlDetail;
import com.tuandai.cg.html.model.SqlRecord;
import com.tuandai.cg.html.utils.FileUpload;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class SQLRecordService {

    private static final Logger logger = LoggerFactory.getLogger(SQLRecordService.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private SqlRecordDao sqlRecordDao;

    @Autowired
    private SqlDetailService sqlDetailService;

    @Autowired
    private Globals globals;

    /**
     * 读取文件显示
     *
     * @param filePath 文件路径
     * @return
     * @throws IOException
     */
    public String readFile(String filePath) throws IOException {
        String s = "";
        StringBuffer sb = new StringBuffer();
        File file = new File(filePath);
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        while ((s = bufferedReader.readLine()) != null) {
            sb.append(s)
                    .append("<Br/>");
        }

        bufferedReader.close();

        return sb.toString();
    }


    /**
     * 处理文件上传
     *
     * @param sqlRecordInDto
     */
    @Transactional
    public void handleUploadFile(SqlRecordInDto sqlRecordInDto) {
        String recordNo = UUID.randomUUID().toString();
        //处理SQL主表
        int count = this.handleRecord(sqlRecordInDto, recordNo);

        if (count > 0) {
            //处理SQL明细表
            this.handleDetail(sqlRecordInDto, recordNo);
        } else {
            logger.warn("插入SQL主表条数为0" + sqlRecordInDto);
        }
    }

    /**
     * 处理SQL主表
     *
     * @param sqlRecordInDto
     * @param recordNo
     * @return
     */
    public int handleRecord(SqlRecordInDto sqlRecordInDto, String recordNo) {
        logger.info("处理SQL主表：{}", sqlRecordInDto);
        SqlRecord sqlRecord = new SqlRecord();
        String username = loginService.getCurrentUser().getUsername();

        sqlRecord.setRecordNo(recordNo)
                .setTextUrl(sqlRecordInDto.getTextUrl())
                .setDemandName(sqlRecordInDto.getName())
                .setRemark(sqlRecordInDto.getRemark())
                .setUploadUsername(username);

        //插入数据库
        logger.info("插入SQL主表：{}", sqlRecord);
        int count = sqlRecordDao.insert(sqlRecord);

        return count;
    }

    /**
     * 处理SQL明细表
     *
     * @param sqlRecordInDto
     * @param recordNo
     */
    public void handleDetail(SqlRecordInDto sqlRecordInDto, String recordNo) {
        logger.info("处理SQL明细：{}", sqlRecordInDto);
        //构建明细列表
        List<SqlDetail> sqlDetailList = this.buildSqlDetailList(sqlRecordInDto, recordNo);

        if (!CollectionUtils.isEmpty(sqlDetailList)) {
            logger.info("插入SQL明细：{}", sqlDetailList);
            sqlDetailService.insertList(sqlDetailList);
        } else {
            logger.error("SQL明细列表为空：{}", sqlRecordInDto);
            throw new RuntimeException("SQL明细列表为空");
        }
    }

    /**
     * 构建明细列表
     *
     * @param sqlRecordInDto
     * @param recordNo
     * @return
     */
    private List<SqlDetail> buildSqlDetailList(SqlRecordInDto sqlRecordInDto, String recordNo) {
        logger.info("构建SQL明细列表");
        List<SqlDetail> sqlDetailList = new ArrayList<>();
        MultipartFile[] files = sqlRecordInDto.getFiles();

        for (int i = 0; i < files.length; i++) {
            SqlDetail sqlDetail = new SqlDetail();
            MultipartFile file = files[i];
            //获取文件名
            String fileName = FileUpload.getFileName(file);
            //获取文件路径
            String filePath = this.getFilePath(sqlRecordInDto.getName());
            //保存文件
            String fileNameWithExt = FileUpload.fileUpLoad(file, filePath, fileName);

            sqlDetail.setFileDir(filePath)
                    .setFileName(fileNameWithExt)
                    .setMainRecordNo(recordNo);

            sqlDetailList.add(sqlDetail);
        }

        return sqlDetailList;
    }

    /**
     * 获取文件路径
     * @param serviceName
     * @return
     */
    public String getFilePath(String serviceName) {
        String basePath = globals.getFirstStep();
        String timePath = LocalDate.now().toString() + File.separator + serviceName + File.separator + System.currentTimeMillis();
        String filePath = basePath + File.separator + timePath;

        return filePath;
    }


    /**
     * 获取SQL列表
     * @param query
     * @return
     */
    public List<SqlRecordOutDto> getSqlList(Map<String, Object> query) {
        List<SqlRecord> sqlRecordList = sqlRecordDao.getSqlList(query);
        List<SqlRecordOutDto> sqlRecordOutDtoList = new ArrayList<>();

        for (SqlRecord sqlRecord : sqlRecordList) {
            SqlRecordOutDto sqlRecordOutDto = new SqlRecordOutDto();
            //获取SQL明细列表
            List<SqlDetail> sqlDetailList = sqlDetailService.getByMainRecordNo(sqlRecord.getRecordNo());

            if (!CollectionUtils.isEmpty(sqlDetailList)) {
                StringBuffer fileName = new StringBuffer();

                for (SqlDetail sqlDetail : sqlDetailList) {
                    fileName.append(sqlDetail.getFileName()).append(";");
                }
                //设置明细文件名
                sqlRecordOutDto.setFileName(fileName.toString());
            } else {
                logger.error("SQL明细列表为空！");
            }

            BeanUtils.copyProperties(sqlRecord, sqlRecordOutDto);

            sqlRecordOutDtoList.add(sqlRecordOutDto);
        }

        return sqlRecordOutDtoList;
    }

    /**
     * 获取总条数
     * @return
     */
    public int getSqlListCount() {
        return sqlRecordDao.getSqlListCount();
    }

    /**
     * 根据recordNo获取
     *
     * @param recordNo
     * @return
     */
    public SqlRecord getByRecordNo(String recordNo) {
        return sqlRecordDao.getByRecordNo(recordNo);
    }

    /**
     * 更新推送时间
     *
     * @param recordNo
     * @return
     */
    public int updatePushTime(String recordNo, String commitVersion) {
        return sqlRecordDao.updatePushTime(recordNo, commitVersion);
    }

    /**
     * 更新为已上线
     *
     * @param recordNo
     * @return
     */
    public int updateHasSend(String recordNo) {
        return sqlRecordDao.updateHasSend(recordNo);
    }

}
