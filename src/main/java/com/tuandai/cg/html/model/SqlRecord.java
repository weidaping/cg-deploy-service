package com.tuandai.cg.html.model;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2019/1/30.
 */
public class SqlRecord {
    private Long id;
    private String recordNo;
    private String demandName;
    private String uploadUsername;
    private String textUrl;
    private String remark;
    private Integer alreadyPush;
    private Integer hasSend;
    private LocalDateTime createTime;
    private LocalDateTime pushTime;
    private String commitVersion;

    public Long getId() {
        return id;
    }

    public SqlRecord setId(Long id) {
        this.id = id;
        return this;
    }

    public String getRecordNo() {
        return recordNo;
    }

    public SqlRecord setRecordNo(String recordNo) {
        this.recordNo = recordNo;
        return this;
    }

    public String getDemandName() {
        return demandName;
    }

    public SqlRecord setDemandName(String demandName) {
        this.demandName = demandName;
        return this;
    }

    public String getUploadUsername() {
        return uploadUsername;
    }

    public SqlRecord setUploadUsername(String uploadUsername) {
        this.uploadUsername = uploadUsername;
        return this;
    }

    public String getTextUrl() {
        return textUrl;
    }

    public SqlRecord setTextUrl(String textUrl) {
        this.textUrl = textUrl;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public SqlRecord setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public Integer getAlreadyPush() {
        return alreadyPush;
    }

    public SqlRecord setAlreadyPush(Integer alreadyPush) {
        this.alreadyPush = alreadyPush;
        return this;
    }

    public Integer getHasSend() {
        return hasSend;
    }

    public SqlRecord setHasSend(Integer hasSend) {
        this.hasSend = hasSend;
        return this;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public SqlRecord setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    public LocalDateTime getPushTime() {
        return pushTime;
    }

    public SqlRecord setPushTime(LocalDateTime pushTime) {
        this.pushTime = pushTime;
        return this;
    }

    public String getCommitVersion() {
        return commitVersion;
    }

    public SqlRecord setCommitVersion(String commitVersion) {
        this.commitVersion = commitVersion;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SqlRecord{");
        sb.append("id=").append(id);
        sb.append(", recordNo='").append(recordNo).append('\'');
        sb.append(", demandName='").append(demandName).append('\'');
        sb.append(", uploadUsername='").append(uploadUsername).append('\'');
        sb.append(", textUrl='").append(textUrl).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append(", alreadyPush=").append(alreadyPush);
        sb.append(", hasSend=").append(hasSend);
        sb.append(", createTime=").append(createTime);
        sb.append(", pushTime=").append(pushTime);
        sb.append(", commitVersion='").append(commitVersion).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
