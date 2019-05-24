package com.tuandai.cg.html.service;

import com.tuandai.cg.html.dao.TestRecordDao;
import com.tuandai.cg.html.dto.DevRecordOutDto;
import com.tuandai.cg.html.dto.TestRecordDto;
import com.tuandai.cg.html.model.DevRecord;
import com.tuandai.cg.html.model.SqlDetail;
import com.tuandai.cg.html.model.SqlRecord;
import com.tuandai.cg.html.model.TestRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TestRecordService {

    private static final Logger logger = LoggerFactory.getLogger(TestRecordService.class);

    @Resource
    private TestRecordDao testRecordDao;

    @Autowired
    private DevRecordService devRecordService;

    @Autowired
    private SQLRecordService sqlRecordService;

    @Autowired
    private SqlDetailService sqlDetailService;

    @Autowired
    private LoginService loginService;
    
    public int insert(TestRecord testRecord){
        return testRecordDao.insert(testRecord);
    }

    public String getCommitVersion(String serviceName, int buildNo) {
        return testRecordDao.getCommitVersion(serviceName, buildNo);
    }

    
    /**
     * 获取构建列表
     * @param query
     * @return
     */
    public List<DevRecordOutDto> getBuildList(Map<String, Object> query) {
        List<DevRecord> devRecordList = devRecordService.getBuildList(query);
        List<DevRecordOutDto> devRecordOutDtoList = new ArrayList<>();

        for (DevRecord devRecord : devRecordList) {
            DevRecordOutDto devRecordOutDto = new DevRecordOutDto();

            BeanUtils.copyProperties(devRecord, devRecordOutDto);

            devRecordOutDtoList.add(devRecordOutDto);
        }

        return devRecordOutDtoList;
    }

    /**
     * 处理推送
     * @param testRecordDto
    */
    @Transactional
    public void handlePushFile(TestRecordDto testRecordDto) throws Exception {
        DevRecord devRecord = devRecordService.getByServiceNameAndBuildNo(testRecordDto.getServiceName(), testRecordDto.getBuildNo());

        if (devRecord == null) {
            logger.error("没有找到构建记录，testRecordDto：{}", testRecordDto);
            throw new Exception("没有找到构建记录");
        }

        testRecordDto.setRemark(testRecordDto.getRemark() + ",git版本号：" + devRecord.getGitVersion());

        //操作git
        String commitVersion = this.handleGit(devRecord, testRecordDto.getRemark());

        //插入测试步骤表
        this.insert(this.buildTestRecord(testRecordDto, commitVersion));
        //更新开发步骤表的推送时间
        devRecordService.updatePushTime(testRecordDto.getServiceName(), testRecordDto.getBuildNo());
    }

    /**
     * 构建对象
     * @param testRecordDto
     * @return
     */
    public TestRecord buildTestRecord(TestRecordDto testRecordDto, String commitVersion) {
        TestRecord testRecord = new TestRecord();
        String name = loginService.getCurrentUser().getUsername();

        testRecord.setBuildNo(testRecordDto.getBuildNo())
                .setServiceName(testRecordDto.getServiceName())
                .setRemark(testRecordDto.getRemark())
                .setCommitVersion(commitVersion)
                .setTestUsername(name); //根据登录名写入

        return testRecord;
    }

    /**
     * 构建对象
     *
     * @param serviceName
     * @param remark
     * @param commitVersion
     * @return
     */
    public TestRecord buildTestRecord(String serviceName, String remark, String commitVersion) {
        TestRecord testRecord = new TestRecord();
        String name = loginService.getCurrentUser().getUsername();

        testRecord.setBuildNo(0)
                .setServiceName(serviceName)
                .setRemark(remark)
                .setCommitVersion(commitVersion)
                .setTestUsername(name); //根据登录名写入

        return testRecord;
    }

    /**
     * 操作git
     * @param devRecord
     * @param remark 提交时用的备注
     */
    public String handleGit(DevRecord devRecord, String remark) throws Exception {
        //设置服务名
        JGitUtil.setServiceName(devRecord.getServiceName());
        //clone
        JGitUtil.cloneIfNotExist();
        //pull文件
        JGitUtil.pull();
        //复制文件
        this.copyFile(devRecord);
        //add文件
        JGitUtil.addFile(devRecord.getFileName());
        //commit文件
        String commitVersion = JGitUtil.commitFile(remark);
        //push文件
        JGitUtil.push();

        return commitVersion;
    }

    /**
     * 复制文件jar包
     * @param devRecord
     * @throws Exception
     */
    public void copyFile(DevRecord devRecord) throws Exception {
        String sourcePath = devRecord.getFileDir() + File.separator + devRecord.getFileName();
        String targetPath = JGitUtil.servicePath()  + File.separator + devRecord.getFileName();

        this.copyFile(sourcePath, targetPath);
    }


    /**
     * 处理推送SQL
     * @param recordNo
     */
    @Transactional
    public void handlePushSql(String recordNo, String remark) throws Exception {
        SqlRecord sqlRecord = sqlRecordService.getByRecordNo(recordNo);

        if (sqlRecord == null) {
            logger.error("没有找到构建记录，recordNo：{}", recordNo);
            throw new Exception("没有找到构建记录");
        }

        //操作git
        String commitVersion = this.handleGitSql(sqlRecord, remark);

//        //插入测试步骤表
        this.insert(this.buildTestRecord(sqlRecord.getDemandName(), remark, commitVersion));
        //更新开发步骤表的推送时间和git提交版本号
        sqlRecordService.updatePushTime(recordNo, commitVersion);
    }


    /**
     * 操作git，SQL提交时使用
     * @param sqlRecord
     * @param remark 提交时用的备注
     */
    public String handleGitSql(SqlRecord sqlRecord, String remark) throws Exception {
        String serviceName = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        //获取sql明细
        List<SqlDetail> sqlDetailList = sqlDetailService.getByMainRecordNo(sqlRecord.getRecordNo());

        //设置服务名
        JGitUtil.setServiceName(serviceName);
        //clone
        JGitUtil.cloneSqlIfNotExist();
        //pull文件
        JGitUtil.pull();
        //复制文件
        for (SqlDetail sqlDetail : sqlDetailList) {
            this.copySql(sqlDetail, sqlRecord.getDemandName());
        }
        //add文件
        JGitUtil.addFile(".");
        //commit文件
        String commitVersion = JGitUtil.commitFile(remark);
        //push文件
        JGitUtil.push();

        return commitVersion;
    }


    /**
     * 复制sql文件
     * @param sqlDetail
     * @throws Exception
     */
    public void copySql(SqlDetail sqlDetail, String demandName) throws Exception {
        String day = LocalDate.now().getDayOfMonth() + "";
        String sourcePath = sqlDetail.getFileDir() + File.separator + sqlDetail.getFileName();
        String targetPath = JGitUtil.servicePath()  + File.separator + day  + File.separator  + demandName  + File.separator  + sqlDetail.getFileName();

        File f = new File(targetPath);

        if (!f.getParentFile().exists()) {
            f.getParentFile().mkdirs();
        }

        this.copyFile(sourcePath, targetPath);

    }

    /**
     * 复制文件
     * @param sourcePath
     * @param targetPath
     * @throws Exception
     */
    public void copyFile(String sourcePath, String targetPath) throws Exception {
        File source = new File(sourcePath);
        File target = new File(targetPath);
        FileChannel inputChannel = null;
        FileChannel outputChannel = null;

        try {
            inputChannel = new FileInputStream(source).getChannel();
            outputChannel = new FileOutputStream(target).getChannel();

            outputChannel.transferFrom(inputChannel, 0, inputChannel.size());
        } finally {
            inputChannel.close();
            outputChannel.close();
        }
    }


    public static void main(String[] args) {
        String day = LocalDate.now().getDayOfMonth() + "";
        System.out.println(day);
    }
}
