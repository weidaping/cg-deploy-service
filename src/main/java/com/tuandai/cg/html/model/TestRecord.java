package com.tuandai.cg.html.model;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2018/12/7.
 */
public class TestRecord {
    private Integer id;
    private String serviceName;
    private String testUsername;
    private String remark;
    private Integer buildNo;
    private String commitVersion;
    private LocalDateTime createTime;

    public Integer getId() {
        return id;
    }

    public TestRecord setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getServiceName() {
        return serviceName;
    }

    public TestRecord setServiceName(String serviceName) {
        this.serviceName = serviceName;
        return this;
    }

    public String getTestUsername() {
        return testUsername;
    }

    public TestRecord setTestUsername(String testUsername) {
        this.testUsername = testUsername;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public TestRecord setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public Integer getBuildNo() {
        return buildNo;
    }

    public TestRecord setBuildNo(Integer buildNo) {
        this.buildNo = buildNo;
        return this;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public TestRecord setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    public String getCommitVersion() {
        return commitVersion;
    }

    public TestRecord setCommitVersion(String commitVersion) {
        this.commitVersion = commitVersion;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("TestRecord{");
        sb.append("id=").append(id);
        sb.append(", serviceName='").append(serviceName).append('\'');
        sb.append(", testUsername='").append(testUsername).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append(", buildNo=").append(buildNo);
        sb.append(", commitVersion='").append(commitVersion).append('\'');
        sb.append(", createTime=").append(createTime);
        sb.append('}');
        return sb.toString();
    }
}
