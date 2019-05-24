package com.tuandai.cg.html.utils;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * 上传文件
 */
public class FileUpload {

	private static final Logger logger = LoggerFactory.getLogger(FileUpload.class);

	/**上传文件
	 * @param file 			//文件对象
	 * @param filePath		//上传路径
	 * @param fileName		//文件名
	 * @return  文件名
	 */
	public static String fileUpLoad(MultipartFile file, String filePath, String fileName){
		String extName = ""; // 扩展名格式：

		try {
			if (file.getOriginalFilename().lastIndexOf(".") >= 0){
				extName = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			}

			transferFile(file, filePath, fileName + extName);
		} catch (IOException e) {
			logger.error("文件上传失败：", e);
		}

		return fileName + extName;
	}
	
	/**
	 * 写文件到目录中
	 * 
	 * @param in
	 * @param dir
	 * @param realName
	 * @throws IOException
	 */
	private static String copyFile(InputStream in, String dir, String realName) throws IOException {
		long start = System.currentTimeMillis();
		File file = new File(dir, realName);

		if (!file.exists()) {
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs();
			}

			file.createNewFile();
		}

		FileUtils.copyInputStreamToFile(in, file);

		long end = System.currentTimeMillis();
		System.out.println("第一种花费时间：" + (end - start));
		return realName;
	}


	/**
	 * 保存文件到新目录
	 *
	 * @param orgfile
	 * @param dir
	 * @param realName
	 * @throws IOException
	 */
	private static String transferFile(MultipartFile orgfile, String dir, String realName) throws IOException {
		long start = System.currentTimeMillis();
		File file = new File(dir, realName);

		if (!file.exists()) {
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs();
			}

			file.createNewFile();
		}

		orgfile.transferTo(file);

		long end = System.currentTimeMillis();
		System.out.println("第二种花费时间：" + (end - start));

		return realName;
	}

	/**
	 * 获取文件名
	 * @param file
	 * @return
	 */
	public static String getFileName(MultipartFile file) {
		String orgName = file.getOriginalFilename();

		return orgName.substring(0, orgName.lastIndexOf("."));
	}

}
