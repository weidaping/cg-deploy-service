package com.tuandai.cg.html.model;

import java.time.LocalDateTime;

/**
 * Created by weidaping on 2019/1/30.
 */
public class SqlDetail {
    private Long id;
    private String mainRecordNo;
    private String fileName;
    private String fileDir;
    private LocalDateTime createTime;

    public Long getId() {
        return id;
    }

    public SqlDetail setId(Long id) {
        this.id = id;
        return this;
    }

    public String getMainRecordNo() {
        return mainRecordNo;
    }

    public SqlDetail setMainRecordNo(String mainRecordNo) {
        this.mainRecordNo = mainRecordNo;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public SqlDetail setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public String getFileDir() {
        return fileDir;
    }

    public SqlDetail setFileDir(String fileDir) {
        this.fileDir = fileDir;
        return this;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public SqlDetail setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SqlDetail{");
        sb.append("id=").append(id);
        sb.append(", mainRecordNo='").append(mainRecordNo).append('\'');
        sb.append(", fileName='").append(fileName).append('\'');
        sb.append(", fileDir='").append(fileDir).append('\'');
        sb.append(", createTime=").append(createTime);
        sb.append('}');
        return sb.toString();
    }
}
