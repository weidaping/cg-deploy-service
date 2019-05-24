package com.tuandai.cg.html.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

/**
 * Created by weidaping on 2018/12/7.
 */
public class SqlRecordInDto {
    private MultipartFile[] files;
    private String name;
    private String textUrl;
    private String remark;

    public MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(MultipartFile[] files) {
        this.files = files;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SqlRecordInDto{");
        sb.append("files=").append(files == null ? "null" : Arrays.asList(files).toString());
        sb.append(", name='").append(name).append('\'');
        sb.append(", textUrl='").append(textUrl).append('\'');
        sb.append(", remark='").append(remark).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
