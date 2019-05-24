package com.tuandai.cg.html.model;

import java.util.List;

/**
 * Created by weidaping on 2019/1/17.
 */
public class Menu {
    private Integer id;
    private Integer appId;
    private String name;
    private Boolean link;
    private Boolean menu;
    private Integer parentId;
    private String urls;
    private List<Menu> children;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAppId() {
        return appId;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getLink() {
        return link;
    }

    public void setLink(Boolean link) {
        this.link = link;
    }

    public Boolean getMenu() {
        return menu;
    }

    public void setMenu(Boolean menu) {
        this.menu = menu;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public List<Menu> getChildren() {
        return children;
    }

    public String getUrls() {
        return urls;
    }

    public void setUrls(String urls) {
        this.urls = urls;
    }

    public void setChildren(List<Menu> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Menu{");
        sb.append("id=").append(id);
        sb.append(", appId=").append(appId);
        sb.append(", name='").append(name).append('\'');
        sb.append(", link=").append(link);
        sb.append(", menu=").append(menu);
        sb.append(", parentId=").append(parentId);
        sb.append(", urls='").append(urls).append('\'');
        sb.append(", children=").append(children);
        sb.append('}');
        return sb.toString();
    }
}
