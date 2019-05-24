package com.tuandai.cg.html.dto;

/**
 * Created by weidaping on 2018/12/7.
 */
public class GroupDto {
    private Integer id;
    private String groupId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("GroupDto{");
        sb.append("id=").append(id);
        sb.append(", groupId='").append(groupId).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
