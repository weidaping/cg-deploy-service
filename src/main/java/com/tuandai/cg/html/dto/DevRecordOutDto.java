package com.tuandai.cg.html.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2018/12/7.
 */
public class DevRecordOutDto {
    private String serviceName;
    private Integer buildNo;
    private String gitVersion;
    private String fileName;
    private String textUrl;
    private String remark;
    private Integer alreadyPush;
    private Integer hasSend;
    @JsonFormat
    private LocalDateTime pushTime;
    @JsonFormat
    private LocalDateTime createTime;

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getGitVersion() {
        return gitVersion;
    }

    public void setGitVersion(String gitVersion) {
        this.gitVersion = gitVersion;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getBuildNo() {
        return buildNo;
    }

    public void setBuildNo(Integer buildNo) {
        this.buildNo = buildNo;
    }

    public Integer getAlreadyPush() {
        return alreadyPush;
    }

    public void setAlreadyPush(Integer alreadyPush) {
        this.alreadyPush = alreadyPush;
    }

    public String getPushTime() {
        return pushTime == null ? null : pushTime.toString().replace("T", " ");
    }

    public void setPushTime(LocalDateTime pushTime) {
        this.pushTime = pushTime;
    }

    public String getCreateTime() {
        return createTime == null ? null : createTime.toString().replace("T", " ");
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public String getTextUrl() {
        return textUrl;
    }

    public void setTextUrl(String textUrl) {
        this.textUrl = textUrl;
    }

    public Integer getHasSend() {
        return hasSend;
    }

    public void setHasSend(Integer hasSend) {
        this.hasSend = hasSend;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("DevRecordOutDto{");
        sb.append("serviceName='").append(serviceName).append('\'');
        sb.append(", buildNo=").append(buildNo);
        sb.append(", gitVersion='").append(gitVersion).append('\'');
        sb.append(", fileName='").append(fileName).append('\'');
        sb.append(", textUrl='").append(textUrl).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append(", alreadyPush=").append(alreadyPush);
        sb.append(", hasSend=").append(hasSend);
        sb.append(", pushTime=").append(pushTime);
        sb.append(", createTime=").append(createTime);
        sb.append('}');
        return sb.toString();
    }
}
