package com.tuandai.cg.html.controller;

import com.tuandai.cg.html.dto.DevRecordOutDto;
import com.tuandai.cg.html.dto.TestRecordDto;
import com.tuandai.cg.html.service.DevRecordService;
import com.tuandai.cg.html.service.DingDingService;
import com.tuandai.cg.html.service.SQLRecordService;
import com.tuandai.cg.html.service.TestRecordService;
import com.tuandai.cg.html.utils.PageUtils;
import com.tuandai.cg.html.utils.Query;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by weidaping on 2018/12/7.
 */
@RestController
public class TestRecordController {

    private static final Logger logger = LoggerFactory.getLogger(TestRecordController.class);

    @Autowired
    private TestRecordService testRecordService;

    @Autowired
    private DevRecordService devRecordService;

    @Autowired
    private DingDingService dingDingService;

    @Autowired
    private SQLRecordService sqlRecordService;

    @GetMapping("/testRecord/action")
    public ModelAndView action() {
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.setViewName("testPush");

        return modelAndView;
    }

    @GetMapping("/testRecord/remark")
    public ModelAndView remark(String serviceName, Integer buildNo) {
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.addObject("serviceName", serviceName)
                .addObject("buildNo", buildNo);
        modelAndView.setViewName("description");

        return modelAndView;
    }

    @GetMapping("/testRecord/buildList")
    public Map<String, Object> buildList(@RequestParam Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        Query query = new Query(params);
        String serviceName = null;

        //设置查询参数
        if (params.get("serviceName") != null && StringUtils.isNotBlank(params.get("serviceName").toString())) {
            serviceName = params.get("serviceName").toString();
        }

        query.put("serviceName", serviceName);

        //查询数据列表
        List<DevRecordOutDto> devRecordOutDtoList = testRecordService.getBuildList(query);
        int count = devRecordService.getBuildListCount(serviceName);

        PageUtils pageUtils = new PageUtils(devRecordOutDtoList, count, query.getLimit(), query.getPage());

        map.put("page", pageUtils);

        return map;
    }


    @PostMapping("/testRecord/pushFile")
    public Map<String, Object> pushFile(TestRecordDto testRecordDto) {
        Map<String, Object> map = new HashMap<>();

        if (testRecordDto == null) {
            logger.error("推送文件错误");
            map.put("code", "404");
        } else {

            try {
                testRecordService.handlePushFile(testRecordDto);
                map.put("code", 200);
            } catch (Exception e) {
                logger.error("推送文件错误:", e);
                map.put("code", 404);
            }
        }

        return map;
    }

    @PostMapping("/testRecord/publish")
    public Map<String, Object> publish(@RequestParam String serviceName, @RequestParam String textUrl, @RequestParam Integer buildNo) {
        logger.info("执行上线接口,serviceName：{},textUrl：{},buildNo：{}", serviceName, textUrl, buildNo);
        Map<String, Object> map = new HashMap<>();

        if (StringUtils.isBlank(serviceName)) {
            logger.error("上线服务名为空");
            map.put("code", "404");
        } else {

            try {
                dingDingService.handleDingDing(serviceName, textUrl, buildNo);
                devRecordService.updateHasSend(serviceName, buildNo);
                map.put("code", 200);
            } catch (Exception e) {
                logger.error("上线服务错误:", e);
                map.put("code", 404);
            }
        }

        return map;
    }

    @PostMapping("/testRecord/pushSql")
    public Map<String, Object> pushSql(String recordNo, String remark) {
        Map<String, Object> map = new HashMap<>();

        if (recordNo == null || remark == null) {
            logger.error("推送SQL错误");
            map.put("code", "404");
        } else {

            try {
                testRecordService.handlePushSql(recordNo, remark);
                map.put("code", 200);
            } catch (Exception e) {
                logger.error("推送SQL错误:", e);
                map.put("code", 404);
            }
        }

        return map;
    }


    @PostMapping("/testRecord/publishSql")
    public Map<String, Object> publishSql(@RequestParam String recordNo) {
        logger.info("执行SQL上线接口,recordNo：{}", recordNo);
        Map<String, Object> map = new HashMap<>();

        if (StringUtils.isBlank(recordNo)) {
            logger.error("SQL上线recordNo为空");
            map.put("code", "404");
        } else {
            try {
                dingDingService.handleDingDing(recordNo);
                sqlRecordService.updateHasSend(recordNo);
                map.put("code", 200);
            } catch (Exception e) {
                logger.error("SQL上线服务错误:", e);
                map.put("code", 404);
            }
        }

        return map;
    }

}
