package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.dto.SqlRecordInDto;
import com.tuandai.cg.html.dto.SqlRecordOutDto;
import com.tuandai.cg.html.service.SQLRecordService;
import com.tuandai.cg.html.utils.PageUtils;
import com.tuandai.cg.html.utils.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class SQLRecordController {

    private static final Logger logger = LoggerFactory.getLogger(SQLRecordController.class);

    @Autowired
    private SQLRecordService sqlRecordService;


    @GetMapping("/sqlRecord/viewFile")
    public String uploadFile(String filePath) {
        logger.info("执行上传文件接口");
        filePath = "C:/Users/shixi08/Desktop/ass_project_config_04.sql";
        String result = "";

        if (filePath == null) {
            logger.error("文件路径为空");
            return "";
        }

        try {
            result = sqlRecordService.readFile(filePath);
        } catch (Exception e) {
            logger.error("文件操作错误");
        }
        System.out.println(result);
        return result;
    }

    @PostMapping("/sqlRecord/uploadFile")
    public Map uploadFile(SqlRecordInDto sqlRecordInDto) {
        logger.info("执行上传SQL接口,sqlRecordInDto：{}", sqlRecordInDto);
        Map<String, Integer> map = new HashMap<>();

        if (sqlRecordInDto == null) {
            logger.error("上传SQL错误");
            map.put("code", 503);
            return map;
        }

        MultipartFile[] files = sqlRecordInDto.getFiles();

        if (files == null || files.length == 0) {
            logger.error("上传SQL为空");
            map.put("code", 404);
            return map;
        }

        try {
            sqlRecordService.handleUploadFile(sqlRecordInDto);
            map.put("code", 200);
        } catch (Exception e) {
            logger.error("上传SQL异常：", e);
            map.put("code", -1);
        }

        return map;
    }


    @GetMapping("/sqlRecord/sqlList")
    public Map<String, Object> sqlList(@RequestParam Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        Query query = new Query(params);

        //查询数据列表
        List<SqlRecordOutDto> sqlRecordOutDtoList = sqlRecordService.getSqlList(query);
        int count = sqlRecordService.getSqlListCount();

        PageUtils pageUtils = new PageUtils(sqlRecordOutDtoList, count, query.getLimit(), query.getPage());

        map.put("page", pageUtils);

        return map;
    }

//    @PostMapping("/devRecord/saveTextUrl")
//    public Map<String, Object> saveTextUrl(@RequestParam String serviceName, @RequestParam String textUrl, @RequestParam Integer buildNo) {
//        logger.info("执行修改发布评审地址接口,serviceName：{},textUrl：{},buildNo：{}", serviceName, textUrl, buildNo);
//        Map<String, Object> map = new HashMap<>();
//
//        if (StringUtils.isBlank(serviceName)) {
//            logger.error("服务名为空");
//            map.put("code", "404");
//        } else {
//            try {
//                devRecordService.updateTextUrl(serviceName, buildNo, textUrl);
//                map.put("code", 200);
//            } catch (Exception e) {
//                logger.error("修改发布评审地址错误:", e);
//                map.put("code", 404);
//            }
//        }
//
//        return map;
//    }

}
