package com.tuandai.cg.html.dto;

/**
 * Created by weidaping on 2018/12/19.
 */
public class UserDto {
    private Integer id;
    private String username;
    private String password;
    private String gitUsername;
    private String gitPassword;
    private String userRole;
    private String groupId;

    public Integer getId() {
        return id;
    }

    public UserDto setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getGitUsername() {
        return gitUsername;
    }

    public UserDto setGitUsername(String gitUsername) {
        this.gitUsername = gitUsername;
        return this;
    }

    public String getGitPassword() {
        return gitPassword;
    }

    public UserDto setGitPassword(String gitPassword) {
        this.gitPassword = gitPassword;
        return this;
    }

    public String getUserRole() {
        return userRole;
    }

    public UserDto setUserRole(String userRole) {
        this.userRole = userRole;
        return this;
    }

    public String getGroupId() {
        return groupId;
    }

    public UserDto setGroupId(String groupId) {
        this.groupId = groupId;
        return this;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("UserDto{");
        sb.append("id=").append(id);
        sb.append(", username='").append(username).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append(", gitUsername='").append(gitUsername).append('\'');
        sb.append(", gitPassword='").append(gitPassword).append('\'');
        sb.append(", userRole='").append(userRole).append('\'');
        sb.append(", groupId='").append(groupId).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
