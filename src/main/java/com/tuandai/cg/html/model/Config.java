package com.tuandai.cg.html.model;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2018/12/7.
 */
public class Config {
    private Integer id;
    private String serviceName;
    private Integer currentBuildNo;
    private Integer inUse;
    private String groupId;
    private LocalDateTime createTime;

    public Integer getId() {
        return id;
    }

    public Config setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getServiceName() {
        return serviceName;
    }

    public Config setServiceName(String serviceName) {
        this.serviceName = serviceName;
        return this;
    }

    public Integer getCurrentBuildNo() {
        return currentBuildNo;
    }

    public Config setCurrentBuildNo(Integer currentBuildNo) {
        this.currentBuildNo = currentBuildNo;
        return this;
    }

    public Integer getInUse() {
        return inUse;
    }

    public Config setInUse(Integer inUse) {
        this.inUse = inUse;
        return this;
    }

    public String getGroupId() {
        return groupId;
    }

    public Config setGroupId(String groupId) {
        this.groupId = groupId;
        return this;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public Config setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Config{");
        sb.append("id=").append(id);
        sb.append(", serviceName='").append(serviceName).append('\'');
        sb.append(", currentBuildNo=").append(currentBuildNo);
        sb.append(", inUse=").append(inUse);
        sb.append(", groupId='").append(groupId).append('\'');
        sb.append(", createTime=").append(createTime);
        sb.append('}');
        return sb.toString();
    }
}
