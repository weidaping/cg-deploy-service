package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.dto.DevRecordDto;
import com.tuandai.cg.html.service.DevRecordService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class DevRecordController {

    private static final Logger logger = LoggerFactory.getLogger(DevRecordController.class);

    @Autowired
    private DevRecordService devRecordService;


    @GetMapping("/devRecord/action")
    public ModelAndView action() {
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.setViewName("devUpload");

        return modelAndView;
    }

    @PostMapping("/devRecord/uploadFile")
    public Map uploadFile(DevRecordDto devRecordDto) {
        logger.info("执行上传文件接口,devRecordDto：{}", devRecordDto);
        Map<String, Integer> map = new HashMap<>();

        if (devRecordDto == null) {
            logger.error("上传文件错误");
            map.put("code", 503);
            return map;
        }

        MultipartFile file = devRecordDto.getFile();

        if (file == null || file.isEmpty()) {
            logger.error("上传文件为空");
            map.put("code", 404);
            return map;
        }

        int buildNo = devRecordService.handleUploadFile(devRecordDto);

        if (buildNo == -1) {
            map.put("code", -1);
        } else {
            map.put("code", 200);
            map.put("buildNo", buildNo);
        }

        return map;
    }


    @GetMapping("/devRecord/getBuildNo")
    public List<Integer> getBuildNo(String serviceName) {
        List<Integer> buildNos = devRecordService.getBuildNoByServiceName(serviceName);

        return buildNos;
    }

    @GetMapping("/devRecord/getBuildNoDesc")
    public String getBuildNoDesc(String serviceName, int buildNo) {
        String desc = devRecordService.getBuildNoDesc(serviceName, buildNo);

        return desc;
    }

    @PostMapping("/devRecord/saveTextUrl")
    public Map<String, Object> saveTextUrl(@RequestParam String serviceName, @RequestParam String textUrl, @RequestParam Integer buildNo) {
        logger.info("执行修改发布评审地址接口,serviceName：{},textUrl：{},buildNo：{}", serviceName, textUrl, buildNo);
        Map<String, Object> map = new HashMap<>();

        if (StringUtils.isBlank(serviceName)) {
            logger.error("服务名为空");
            map.put("code", "404");
        } else {
            try {
                devRecordService.updateTextUrl(serviceName, buildNo, textUrl);
                map.put("code", 200);
            } catch (Exception e) {
                logger.error("修改发布评审地址错误:", e);
                map.put("code", 404);
            }
        }

        return map;
    }

}
