package com.tuandai.cg.html.model;

/**
 * Created by weidaping on 2018/12/19.
 */
public class Group {
    private Integer id;
    private String groupId;

    public Integer getId() {
        return id;
    }

    public Group setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getGroupId() {
        return groupId;
    }

    public Group setGroupId(String groupId) {
        this.groupId = groupId;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Group{");
        sb.append("id=").append(id);
        sb.append(", groupId='").append(groupId).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
