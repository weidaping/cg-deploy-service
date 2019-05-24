package com.tuandai.cg.html.dto;

/**
 * Created by weidaping on 2018/12/7.
 */
public class ConfigDto {
    private Integer id;
    private String serviceName;
    private Integer currentBuildNo;
    private Integer inUse;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public Integer getCurrentBuildNo() {
        return currentBuildNo;
    }

    public void setCurrentBuildNo(Integer currentBuildNo) {
        this.currentBuildNo = currentBuildNo;
    }

    public Integer getInUse() {
        return inUse;
    }

    public void setInUse(Integer inUse) {
        this.inUse = inUse;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("ConfigDto{");
        sb.append("id=").append(id);
        sb.append(", serviceName='").append(serviceName).append('\'');
        sb.append(", currentBuildNo=").append(currentBuildNo);
        sb.append(", inUse=").append(inUse);
        sb.append('}');
        return sb.toString();
    }
}
