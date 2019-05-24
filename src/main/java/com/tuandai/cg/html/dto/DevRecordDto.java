package com.tuandai.cg.html.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by weidaping on 2018/12/7.
 */
public class DevRecordDto {
    private MultipartFile file;
    private String serviceName;
    private String textUrl;
    private String gitVersion;
    private String remark;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
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

    public String getTextUrl() {
        return textUrl;
    }

    public void setTextUrl(String textUrl) {
        this.textUrl = textUrl;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("DevRecordDto{");
        sb.append("file=").append(file);
        sb.append(", serviceName='").append(serviceName).append('\'');
        sb.append(", textUrl='").append(textUrl).append('\'');
        sb.append(", gitVersion='").append(gitVersion).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
