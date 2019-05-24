package com.tuandai.cg.html.model;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2018/12/7.
 */
public class DevRecord {
    private Integer id;
    private String serviceName;
    private String devUsername;
    private Integer buildNo;
    private String fileName;
    private String fileDir;
    private String gitVersion;
    private String textUrl;
    private String remark;
    private Integer alreadyPush;
    private Integer hasSend;
    private LocalDateTime createTime;
    private LocalDateTime pushTime;

    public Integer getId() {
        return id;
    }

    public DevRecord setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getServiceName() {
        return serviceName;
    }

    public DevRecord setServiceName(String serviceName) {
        this.serviceName = serviceName;
        return this;
    }

    public String getDevUsername() {
        return devUsername;
    }

    public DevRecord setDevUsername(String devUsername) {
        this.devUsername = devUsername;
        return this;
    }

    public Integer getBuildNo() {
        return buildNo;
    }

    public DevRecord setBuildNo(Integer buildNo) {
        this.buildNo = buildNo;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public DevRecord setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public String getFileDir() {
        return fileDir;
    }

    public DevRecord setFileDir(String fileDir) {
        this.fileDir = fileDir;
        return this;
    }

    public String getGitVersion() {
        return gitVersion;
    }

    public DevRecord setGitVersion(String gitVersion) {
        this.gitVersion = gitVersion;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public DevRecord setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public Integer getAlreadyPush() {
        return alreadyPush;
    }

    public void setAlreadyPush(Integer alreadyPush) {
        this.alreadyPush = alreadyPush;
    }

    public LocalDateTime getPushTime() {
        return pushTime;
    }

    public void setPushTime(LocalDateTime pushTime) {
        this.pushTime = pushTime;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public DevRecord setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    public String getTextUrl() {
        return textUrl;
    }

    public DevRecord setTextUrl(String textUrl) {
        this.textUrl = textUrl;
        return this;
    }

    public Integer getHasSend() {
        return hasSend;
    }

    public DevRecord setHasSend(Integer hasSend) {
        this.hasSend = hasSend;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("DevRecord{");
        sb.append("id=").append(id);
        sb.append(", serviceName='").append(serviceName).append('\'');
        sb.append(", devUsername='").append(devUsername).append('\'');
        sb.append(", buildNo=").append(buildNo);
        sb.append(", fileName='").append(fileName).append('\'');
        sb.append(", fileDir='").append(fileDir).append('\'');
        sb.append(", gitVersion='").append(gitVersion).append('\'');
        sb.append(", textUrl='").append(textUrl).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append(", alreadyPush=").append(alreadyPush);
        sb.append(", hasSend=").append(hasSend);
        sb.append(", createTime=").append(createTime);
        sb.append(", pushTime=").append(pushTime);
        sb.append('}');
        return sb.toString();
    }
}
