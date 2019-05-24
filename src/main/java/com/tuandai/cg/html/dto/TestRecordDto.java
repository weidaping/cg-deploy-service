package com.tuandai.cg.html.dto;

/**
 * Created by weidaping on 2018/12/7.
 */
public class TestRecordDto {
    private String serviceName;
    private String testUsername;
    private String remark;
    private Integer buildNo;

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getTestUsername() {
        return testUsername;
    }

    public void setTestUsername(String testUsername) {
        this.testUsername = testUsername;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("TestRecordDto{");
        sb.append("serviceName='").append(serviceName).append('\'');
        sb.append(", testUsername='").append(testUsername).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append(", buildNo=").append(buildNo);
        sb.append('}');
        return sb.toString();
    }
}

