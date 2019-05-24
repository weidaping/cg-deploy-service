package com.tuandai.cg.html.service;

import com.tuandai.cg.html.config.Globals;
import com.tuandai.cg.html.dao.DevRecordDao;
import com.tuandai.cg.html.dto.DevRecordDto;
import com.tuandai.cg.html.model.DevRecord;
import com.tuandai.cg.html.utils.FileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class DevRecordService {

    private static final Logger logger = LoggerFactory.getLogger(DevRecordService.class);

    @Resource
    private DevRecordDao devRecordDao;

    @Autowired
    private ConfigService configService;


    @Autowired
    private Globals globals;

    @Autowired
    private LoginService loginService;

    
    public int insert(DevRecord devRecord){
        logger.info("插入开发操作表，：devRecord{}", devRecord);
        return devRecordDao.insert(devRecord);
    }


    public int updatePushTime(String serviceName, int buildNo){
        return devRecordDao.updatePushTime(serviceName, buildNo);
    }

    /**
     * 获取构建列表
     * @param query
     * @return
     */
    public List<DevRecord> getBuildList(Map<String, Object> query) {
        return devRecordDao.getBuildList(query);
    }

    /**
     * 获取构建列表总条数
     * @param serviceName
     * @return
     */
    public Integer getBuildListCount(String serviceName) {
        return devRecordDao.getBuildListCount(serviceName);
    }

    /**
     * 处理文件上传
     * @param devRecordDto
     */
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public int handleUploadFile(DevRecordDto devRecordDto) {
        MultipartFile file = devRecordDto.getFile();
        String serviceName = devRecordDto.getServiceName();
        int currentBuildNo = configService.getCurrentBuildNo(serviceName);
        int newBuildNo = currentBuildNo + 1;
        String fileName = FileUpload.getFileName(file);
        String filePath = this.getFilePath(serviceName, newBuildNo);
        //保存文件
        String fileNameWithExt = FileUpload.fileUpLoad(file, filePath, fileName);

        //更新当前构建号
        int result = configService.updateCurrentBuildNo(serviceName, newBuildNo);

        if (result < 1) {
            logger.warn("更新版本号失败");
            return -1;
        }

        //插入开发表
        this.insert(this.buildDevRecord(devRecordDto, newBuildNo, filePath, fileNameWithExt));

        return newBuildNo;
    }

    /**
     * 获取文件路径
     * @param buildNo
     * @param serviceName
     * @return
     */
    public String getFilePath(String serviceName, int buildNo) {
        String basePath = globals.getFirstStep();
        String timePath = LocalDate.now().toString() + File.separator + serviceName + File.separator + buildNo;
        String filePath = basePath + File.separator + timePath;

        return filePath;
    }


    /**
     * 构建对象
     * @param devRecordDto
     * @param newBuildNo
     * @param filePath
     * @param fileName
     * @return
     */
    public DevRecord buildDevRecord(DevRecordDto devRecordDto, int newBuildNo, String filePath, String fileName) {
        DevRecord devRecord = new DevRecord();
        String name = loginService.getCurrentUser().getUsername();

        devRecord.setBuildNo(newBuildNo)
                .setGitVersion(devRecordDto.getGitVersion())
                .setServiceName(devRecordDto.getServiceName())
                .setDevUsername(name)    //根据登录的用户写入
                .setFileName(fileName)
                .setFileDir(filePath)
                .setRemark(devRecordDto.getRemark())
                .setTextUrl(devRecordDto.getTextUrl());

        return devRecord;
    }


    public List<Integer> getBuildNoByServiceName(String serviceName) {
        return devRecordDao.getBuildNoByServiceName(serviceName);
    }

    public String getBuildNoDesc(String serviceName, int buildNo) {
        return devRecordDao.getBuildNoDesc(serviceName, buildNo);
    }

    public DevRecord getByServiceNameAndBuildNo(String serviceName, int buildNo) {
        return devRecordDao.getByServiceNameAndBuildNo(serviceName, buildNo);
    }

    public int updateHasSend(String serviceName, int buildNo) {
        return devRecordDao.updateHasSend(serviceName, buildNo);
    }

    public int updateTextUrl(String serviceName, int buildNo, String textUrl) {
        return devRecordDao.updateTextUrl(serviceName, buildNo, textUrl);
    }

}
