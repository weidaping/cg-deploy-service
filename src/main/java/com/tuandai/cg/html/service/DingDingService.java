package com.tuandai.cg.html.service;

import com.tuandai.cg.html.config.Globals;
import com.tuandai.cg.html.model.DingDingText;
import com.tuandai.cg.html.model.SqlRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

/**
 * Created by weidaping on 2019/1/9.
 */
@Service
public class DingDingService {
    final static Logger LOG = LoggerFactory.getLogger(DingDingService.class);

    @Autowired
    private Globals globals;

    @Autowired
    private TestRecordService testRecordService;

    @Autowired
    private SQLRecordService sqlRecordService;

    /**
     * 发送Msg给钉钉机器人
     *
     * @param text 消息内容
     */
    public void sendMsg(String text) {
        RestTemplate restTemplate = new RestTemplate();
        DingDingText dingDingText = new DingDingText("text");
        DingDingText.At at = new DingDingText.At(false);

        at.setAtMobiles(Arrays.asList(globals.getAtNumber()));  //设置@的人

        dingDingText.setText(new DingDingText.Text(text))
                .setAt(at);

        LOG.info("发送msg给钉钉机器人");
        restTemplate.postForEntity(globals.getDingdingUrl(), dingDingText, Object.class);   //发送POST请求
    }

    /**
     * 构建消息内容
     *
     * @param serviceName 服务名
     * @param textUrl 需求文档地址
     * @return
     */
    public String builtText(String serviceName, String textUrl, int buildNo) {
        StringBuffer stringBuffer = new StringBuffer();

        //获取提交的git版本号
        LOG.info("获取git版本号");
        String version = testRecordService.getCommitVersion(serviceName, buildNo);

        stringBuffer.append(serviceName).append("\n")
                .append(version).append("\n")
                .append("----------------------------------------帮忙部署到线上").append("\n")
                .append(textUrl).append("\n");

        return stringBuffer.toString();
    }

    /**
     * 构建消息内容
     *
     * @param recordNo SQL的流水号
     * @return
     */
    public String builtText(String recordNo) {
        StringBuffer stringBuffer = new StringBuffer();

        //获取SQL记录
        LOG.info("获取SQL记录");
        SqlRecord sqlRecord = sqlRecordService.getByRecordNo(recordNo);

        stringBuffer.append(sqlRecord.getDemandName()).append("\n")
                .append(sqlRecord.getCommitVersion()).append("\n")
                .append("----------------------------------------帮忙部署到线上").append("\n")
                .append(sqlRecord.getTextUrl()).append("\n");

        return stringBuffer.toString();
    }

    /**
     * 处理发送钉钉请求
     *
     * @param serviceName 服务名
     * @param textUrl 需求文档地址
     */
    public void handleDingDing(String serviceName, String textUrl, int buildNo) {
        String text = this.builtText(serviceName, textUrl, buildNo);

        this.sendMsg(text);
    }

    /**
     * 处理发送钉钉请求
     *
     * @param recordNo sql的流水号
     */
    public void handleDingDing(String recordNo) {
        String text = this.builtText(recordNo);

        this.sendMsg(text);
    }

    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oapi.dingtalk.com/robot/send?access_token=fec120ab71d1cc6e5ddd79b6ffde99f75e9138a2e3b3010ae0f216ed6398b0d2";
        DingDingText dingDingText = new DingDingText("text");
        DingDingText.At at = new DingDingText.At(false);

//        at.setAtMobiles(Arrays.asList(globals.getAtNumber()));  //设置@的人

        dingDingText.setText(new DingDingText.Text("测试一下@在内容里好不好使~ @陈秋暖 "))
                .setAt(at);

        restTemplate.postForEntity(url, dingDingText, Object.class);
    }
}
