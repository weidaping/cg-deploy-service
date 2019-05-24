package com.tuandai.cg.html.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by liulanhua on 2018/6/7.
 */
@RestController
@Api(description = "健康检查")
public class HealthCheckController {


    @GetMapping("/do_not_delete/check.html")
    public String check() {
        return "OK";
    }

}
