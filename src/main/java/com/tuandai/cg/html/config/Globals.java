package com.tuandai.cg.html.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Created by liulanhua on 2018/6/7.
 */
@Configuration
public class Globals {
    @Value("${deploy.repo.url}")
    private String repoUrl;

    @Value("${deploy.userName}")
    private String userName;

    @Value("${deploy.password}")
    private String password;
    @Value("${deploy.realName:陈秋暖}")
    private String realName;


    @Value("${deploy.repo.path}")
    private String repoPath;

    @Value("${deploy.sourcePath:}")
    private String sourcePath;

    /**
     * 第一步的上传路径
     */
    @Value("${deploy.filePath.firstStep:}")
    private String firstStep;

    //钉钉机器人的消息地址
    @Value("${deploy.dingding.url:}")
    private String dingdingUrl;

    //钉钉机器人@的人的号码
    @Value("${deploy.dingding.atNumber:}")
    private String atNumber;

    //sql上传的链接地址
    @Value("${deploy.sql.url:}")
    private String sqlUrl;



    public String getRepoUrl() {
        return repoUrl;
    }

    public void setRepoUrl(String repoUrl) {
        this.repoUrl = repoUrl;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRepoPath() {
        return repoPath;
    }

    public void setRepoPath(String repoPath) {
        this.repoPath = repoPath;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSourcePath() {
        return sourcePath;
    }

    public void setSourcePath(String sourcePath) {
        this.sourcePath = sourcePath;
    }


    public String getFirstStep() {
        return firstStep;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getDingdingUrl() {
        return dingdingUrl;
    }

    public void setDingdingUrl(String dingdingUrl) {
        this.dingdingUrl = dingdingUrl;
    }

    public String getAtNumber() {
        return atNumber;
    }

    public void setAtNumber(String atNumber) {
        this.atNumber = atNumber;
    }

    public String getSqlUrl() {
        return sqlUrl;
    }

    public void setSqlUrl(String sqlUrl) {
        this.sqlUrl = sqlUrl;
    }
}
