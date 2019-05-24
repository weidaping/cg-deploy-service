package com.tuandai.cg.html.service;

import com.google.common.base.Charsets;
import com.tuandai.cg.html.config.Globals;
import org.apache.commons.lang.StringUtils;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.Iterator;

/**
 * Created by zhoufurong on 2018/12/7.
 */
public class JGitUtil {

    private static String LOCAL_REPO_PATH;
    private static String REMOTE_REPO_URI;
    private static String INIT_LOCAL_CODE_DIR;
    private static String LOCAL_CODE_CT_SQL_DIR;
    private static String BRANCH_NAME = "master";
    private static String GIT_USERNAME;
    private static String GIT_PASSWORD;
    private static String GIT_REALNAME;
    private static String REMOTE_SQL_URI;

    private static ThreadLocal<String> serviceNameLocal = new ThreadLocal<>();

    public static void setServiceName(String serviceName) {
        serviceNameLocal.set(serviceName);
    }

    public static String get() {
        return serviceNameLocal.get();
    }


    final static Logger LOG = LoggerFactory.getLogger(JGitUtil.class);

    static {

        Globals globals = (Globals) SpringUtil.getBean("globals");
        LOCAL_REPO_PATH = globals.getRepoPath();
        REMOTE_REPO_URI = globals.getRepoUrl(); // git@github.com:xxx/project.git
        INIT_LOCAL_CODE_DIR = globals.getSourcePath();
        LOCAL_CODE_CT_SQL_DIR = globals.getSourcePath();
        GIT_USERNAME = globals.getUserName();
        GIT_PASSWORD = globals.getPassword();
        GIT_REALNAME=globals.getRealName();
        REMOTE_SQL_URI = globals.getSqlUrl(); // SQL上传的URL地址

    }


    /**
     * sql脚本文件同步到git仓库
     *
     * @param fileName 文件名
     * @param comment  提交说明
     * @return
     */
    public static boolean writeFileToGit(String sqlConent, String fileName, String comment) {
/*
        JGitUtil.pull();
        String dest = LOCAL_CODE_CT_SQL_DIR + qte.name().toLowerCase();
        String path = LOCAL_REPO_PATH + "/" + dest;
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();
        }
        dest = dest + "/" + fileName;
        path = path + "/" + fileName;
        return true == JGitUtil.createFile(sqlConent, path) == JGitUtil.commitAndPush(dest, comment);*/
        return false;
    }


    private static String getConfigPath() {
        return LOCAL_REPO_PATH + get() + File.separator + ".git";
    }

    public static String servicePath(){
        return LOCAL_REPO_PATH + get();
    }

    /**
     * 添加文件
     *
     * @param fileName
     * @return
     */
    public static boolean addFile(String fileName) {

        boolean addFileFlag = true;
        String configName=getConfigPath();
        System.out.println(configName);
        try (Git git = Git.open(new File(configName))) {

            git.add()
                    .addFilepattern(fileName)
                    .call();

        } catch (Exception e) {
            LOG.error("addFile error", e);
            throw new RuntimeException("addFile error");
        }
        return addFileFlag;
    }

    /**
     * 提交代码到本地仓库
     *
     * @param comment 提交git内容描述
     * @return
     */
    public static String commitFile(String comment) {

        String commitVersion = "";
        try (Git git = Git.open(new File(getConfigPath()))) {

            RevCommit revCommit = git.commit().setMessage(comment).setAuthor(GIT_REALNAME,"").call();
            commitVersion = revCommit.getName();
            LOG.info("Committed to repository at " + git.getRepository().getDirectory());
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("commitFile error! ", e);
            throw new RuntimeException("commitFile error");
        }
        return commitVersion;
    }

    public static boolean push() {

        boolean pushFlag = true;
        try (Git git = Git.open(new File(getConfigPath()))) {
            //提交代码到本地仓库
            UsernamePasswordCredentialsProvider provider = new UsernamePasswordCredentialsProvider(GIT_USERNAME, GIT_PASSWORD);
            git.push().setCredentialsProvider(provider).call();
            LOG.info("push " + git.getRepository() + File.separator + git.getRepository().getBranch());
        } catch (Exception e) {
            LOG.error("push error!", e);
            throw new RuntimeException("push error");
        }
        return pushFlag;
    }

    /**
     * 提交并推送代码至远程服务器
     *
     * @param filePath 提交文件路径(相对路径)
     * @param desc     提交描述
     * @return
     */
    public static boolean commitAndPush(String filePath, String desc) {

        boolean commitAndPushFlag = true;
        try (Git git = Git.open(new File(getConfigPath()))) {
//        	 //创建用户文件的过程
//             File myfile = new File(filePath);
//             myfile.createNewFile();
            UsernamePasswordCredentialsProvider provider = new UsernamePasswordCredentialsProvider(GIT_USERNAME, GIT_PASSWORD);
            git.add().addFilepattern(filePath).call();
            //提交
            git.commit().setMessage(desc).call();
            //推送到远程
            if (StringUtils.isBlank(GIT_USERNAME) || StringUtils.isBlank(GIT_PASSWORD)) {
                git.push().setCredentialsProvider(provider).call();
            } else {
                git.push().call();
            }
            LOG.info("Commit And Push file " + filePath + " to repository at " + git.getRepository().getDirectory());
        } catch (Exception e) {
            LOG.error("Commit And Push error! " , e);
            throw new RuntimeException("Commit And Push error");
        }
        return commitAndPushFlag;

    }


    public static boolean pull() {
        return pull(BRANCH_NAME);
    }

    /**
     * 拉取远程代码
     *
     * @param remoteBranchName
     * @return 远程分支名
     */
    public static boolean pull(String remoteBranchName) {

        boolean pullFlag = true;
        try (Git git = Git.open(new File(getConfigPath()))) {
        	 UsernamePasswordCredentialsProvider provider =new UsernamePasswordCredentialsProvider(GIT_USERNAME,GIT_PASSWORD);
            git.pull()
                    .setRemoteBranchName(remoteBranchName)
        	 .setCredentialsProvider(provider)
                    .call();
        } catch (Exception e) {
            LOG.error("pull error! ", e);
            throw new RuntimeException("pull error");
        }
        return pullFlag;
    }

    public static boolean checkout(String branchName) {

        boolean checkoutFlag = true;
        try (Git git = Git.open(new File(getConfigPath()))) {
            git.checkout().setName("refs/heads/" + branchName).setForce(true).call();
        } catch (Exception e) {
            LOG.error("checkout error", e);
            throw new RuntimeException("checkout error");
        }
        return checkoutFlag;
    }

    public static boolean checkout() {

        return checkout(BRANCH_NAME);

    }

    /**
     * 从远程获取最新版本到本地   不会自动合并 merge
     *
     * @return
     */
    public static boolean fetch() {

        boolean fetchFlag = true;
        try (Git git = Git.open(new File(getConfigPath()))) {
            git.fetch().setCheckFetchedObjects(true).call();
        } catch (Exception e) {
            LOG.error("fetch error", e);
            throw new RuntimeException("fetch error");
        }
        return fetchFlag;
    }

    /**
     * 拉取新创建的分支到本地
     *
     * @param cloneURL
     * @return
     */
    @SuppressWarnings("static-access")
    public static boolean pullNewBranchToLocal(String cloneURL) {
        boolean resultFlag = false;
        String[] splitURL = cloneURL.split(" ");
        String branchName = splitURL[1];
        String fileDir = INIT_LOCAL_CODE_DIR + "/" + branchName;
        //检查目标文件夹是否存在
        File file = new File(fileDir);
        if (file.exists()) {
            deleteFolder(file);
        }
        Git git;
        try {
            git = Git.open(new File(getConfigPath()));
            git.cloneRepository().setURI(cloneURL).setDirectory(file).call();
            resultFlag = true;
        } catch (IOException e) {
            LOG.error("pullNewBranchToLocal error", e);
            throw new RuntimeException("pullNewBranchToLocal error");
        } catch (GitAPIException e) {
            LOG.error("pullNewBranchToLocal error", e);
            throw new RuntimeException("pullNewBranchToLocal error");
        }
        return resultFlag;
    }


    private static void deleteFolder(File file) {
        if (file.isFile() || file.list().length == 0) {
            file.delete();
        } else {
            File[] files = file.listFiles();
            for (int i = 0; i < files.length; i++) {
                deleteFolder(files[i]);
                files[i].delete();
            }
        }
    }

    /**
     * 生成文件写内容
     *
     * @param content  文件内容
     * @param filePath 文件名称
     */
    @SuppressWarnings("unused")
    private static boolean createFile(String content, String filePath) {

        boolean createFileFlag = true;
        File file = new File(filePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (Exception e) {
                e.printStackTrace();
                createFileFlag = false;
            }
        }
        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), Charsets.UTF_8));) {
            bw.write(content);
        } catch (FileNotFoundException e) {
            LOG.error("createFile error", e);
            throw new RuntimeException("createFile error");
        } catch (IOException e) {
            LOG.error("createFile error", e);
            throw new RuntimeException("createFile error");
        }
        return createFileFlag;
    }

    /**
     * 创建本地新仓库
     *
     * @param repoPath 仓库地址 D:/workspace/TestGitRepository
     * @return
     * @throws IOException
     */
    public static Repository createNewRepository(String repoPath) throws IOException {
        File localPath = new File(repoPath);
        // create the directory
        Repository repository = FileRepositoryBuilder.create(new File(localPath, ".git"));
        repository.create();
        return repository;
    }


    /**
     * 创建仓库，仅需要执行一次
     */
    public static boolean setupRepository(String url) {
        boolean setupRepositoryFlag = true;
        try {
            //设置远程服务器上的用户名和密码
            UsernamePasswordCredentialsProvider provider = new UsernamePasswordCredentialsProvider(GIT_USERNAME, GIT_PASSWORD);
            if (StringUtils.isBlank(GIT_USERNAME) || StringUtils.isBlank(GIT_PASSWORD)) {
                Git git = Git.cloneRepository().setURI(url) //设置远程URI
                        .setBranch("master")   //设置clone下来的分支,默认master
                        .setDirectory(new File(LOCAL_REPO_PATH))  //设置下载存放路径
                        .call();
            } else {
                Git git = Git.cloneRepository().setURI(url + get() + ".git") //设置远程URI
                        .setBranch("master")   //设置clone下来的分支,默认master
                        .setDirectory(new File(LOCAL_REPO_PATH + get()))  //设置下载存放路径
                        .setCredentialsProvider(provider) //设置权限验证
                        .call();
            }
        } catch (Exception e) {
            LOG.error("setupRepository error", e);
            throw new RuntimeException("setupRepository error");
        }
        return setupRepositoryFlag;
    }

    /**
     * 如果不存在则clone
     */
    public static void cloneIfNotExist() {
        String path = servicePath();
        File file = new File(path);

        if (!file.exists()) {
            setupRepository(REMOTE_REPO_URI);
        }
    }

    /**
     * 如果不存在则clone，SQL版用
     */
    public static void cloneSqlIfNotExist() {
        String path = servicePath();
        File file = new File(path);

        if (!file.exists()) {
            setupRepository(REMOTE_SQL_URI);
        }
    }

    public static String getVersion() {
        String version = "";

        try {
            Git git = Git.open(new File(getConfigPath()));
            Iterator<RevCommit> itemEvents = git.log().call().iterator();

            if (itemEvents.hasNext()) {
                version = itemEvents.next().getName();
            }
        } catch (Exception e) {
            LOG.error("获取提交版本号异常", e);
            throw new RuntimeException("getVersion error");
        }

        return version;
    }

}
