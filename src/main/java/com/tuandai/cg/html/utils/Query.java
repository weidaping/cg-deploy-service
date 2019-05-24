package com.tuandai.cg.html.utils;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

/**
 * 查询参数
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-14 23:15
 */
public class Query extends LinkedHashMap<String, Object> {
    private static final long serialVersionUID = 1L;
    //当前页码
    private int page;
    //每页条数
    private int limit;

    public Query(Map<String, Object> params) {
        this.putAll(params);
        //统一去除参数空格
        Set<String >  keys = this.keySet();
        if(keys!=null && keys.size()>0){
            Iterator  iterator = keys.iterator();
            while (iterator.hasNext()){
                Object key = iterator.next();
                Object object = this.get(key);
                this.put(key.toString(),object.toString().trim());
            }
        }
        //分页参数
        if (params.get("page") == null) {
            this.page = 1;
        } else {
            this.page = Integer.parseInt(params.get("page").toString());
        }
        if (params.get("limit") == null) {
            this.limit = 20;
        } else {
            this.limit = Integer.parseInt(params.get("limit").toString());
        }
        this.put("offset", (page - 1) * limit);
        this.put("page", page);
        this.put("limit", limit);
        //Sql Server 需要用到startRow,endRow参数,Mysql不需要
        this.put("startRow", (page - 1) * limit);
        this.put("endRow", page * limit);

    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
