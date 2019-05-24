package com.tuandai.cg.html;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Created by liulanhua on 2018/6/7.
 */
@SpringBootApplication
@EnableAsync
public class CgDeployApplication {

    public static void main(String[] args) {
        SpringApplication.run(CgDeployApplication.class, args);
    }


}