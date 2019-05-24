package com.tuandai.cg.html.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2018/12/7.
 */
public class SqlRecordOutDto {
    private String recordNo;
    private String demandName;
    private String fileName;
    private String textUrl;
    private String remark;
    private Integer alreadyPush;
    private Integer hasSend;
    @JsonFormat
    private LocalDateTime pushTime;
    @JsonFormat
    private LocalDateTime createTime;

    public String getRecordNo() {
        return recordNo;
    }

    public void setRecordNo(String recordNo) {
        this.recordNo = recordNo;
    }

    public String getDemandName() {
        return demandName;
    }

    public void setDemandName(String demandName) {
        this.demandName = demandName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getTextUrl() {
        return textUrl;
    }

    public void setTextUrl(String textUrl) {
        this.textUrl = textUrl;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getAlreadyPush() {
        return alreadyPush;
    }

    public void setAlreadyPush(Integer alreadyPush) {
        this.alreadyPush = alreadyPush;
    }

    public Integer getHasSend() {
        return hasSend;
    }

    public void setHasSend(Integer hasSend) {
        this.hasSend = hasSend;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SqlRecordOutDto{");
        sb.append("recordNo='").append(recordNo).append('\'');
        sb.append(", demandName='").append(demandName).append('\'');
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
