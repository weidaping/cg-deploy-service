package com.tuandai.cg.html.service;

import com.tuandai.cg.html.CgDeployApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Created by zhoufurong on 2018/12/7.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CgDeployApplication.class)
@ActiveProfiles("test")
public class JGitUtilTest {

    @Before
    public void init(){
        JGitUtil.setServiceName("cg-dq-service");
    }

    @Test
    public void testAddFile() throws Exception {
        JGitUtil.addFile("123.txt");
    }

    @Test
    public void commitFile() throws Exception {
        JGitUtil.commitFile("测试自动部署");
    }

    @Test
    public void push() throws Exception {
        JGitUtil.push();
    }

    @Test
    public void commitAndPush() throws Exception {

    }

    @Test
    public void pull() throws Exception {
    }

    @Test
    public void testSetupRepository(){
        JGitUtil.setupRepository("");
    }

    @Test
    public void testGetVersion(){
        System.out.println(JGitUtil.getVersion());
    }
}