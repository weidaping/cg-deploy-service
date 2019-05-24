package com.tuandai.cg.html.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 * 3DES加密解密
 * Created by liulanhua on 2018/6/11.
 */
public class DesUtil {

    private static final Logger logger = LoggerFactory.getLogger(DesUtil.class);

    /**
     * 定义 加密算法,可用 DES,DESede,Blowfish
     */
    //private static final String ALGORITHM_DESEDS = "DES/ECB/PKCS5Padding";
    private static final String ALGORITHM_DESEDS = "DESede";

    /**
     * 转换成十六进制字符串
     */
    private static byte[] hex(String key) {
        byte[] bkeys = DigestUtils.md5Hex(key).getBytes();
        byte[] enk = new byte[24];
        for (int i = 0; i < 24; i++) {
            enk[i] = bkeys[i];
        }
        return enk;
    }



    /**
     * 3DES加密
     *
     * @param key    密钥，24位
     * @param srcStr 将加密的字符串
     * @return 加密后的字符串
     */
    public static String encode3Des(String key, String srcStr) {
        logger.info("3DES加密,密钥:{},待加密内容：{}", key, srcStr);
        byte[] keybyte = hex(key);
        try {
            byte[] src = srcStr.getBytes("utf-8");
            //生成密钥
            SecretKey deskey = new SecretKeySpec(keybyte, ALGORITHM_DESEDS);
            //加密
            Cipher c1 = Cipher.getInstance(ALGORITHM_DESEDS);
            c1.init(Cipher.ENCRYPT_MODE, deskey);

            //return c1.doFinal(src);//在单一方面的加密或解密
            return Base64.encodeBase64String(c1.doFinal(src));
        } catch (java.lang.Exception e) {
            logger.error("3DES加密异常", e);
        }
        return null;
    }

    /**
     * 3DES解密
     *
     * @param key    加密密钥，长度为24字节
     * @param desStr 加密后的字符串
     * @return 解密后的字符串
     */
    public static String decode3Des(String key, String desStr) {
        logger.info("3DES解密,密钥:{},待解密内容：{}", key, desStr);
        Base64 base64 = new Base64();
        byte[] keybyte = hex(key);
        byte[] src = base64.decode(desStr);
        try {
            //生成密钥
            SecretKey deskey = new SecretKeySpec(keybyte, ALGORITHM_DESEDS);
            //解密
            Cipher c1 = Cipher.getInstance(ALGORITHM_DESEDS);
            c1.init(Cipher.DECRYPT_MODE, deskey);
            //return c1.doFinal(src);
            return new String(c1.doFinal(src));
        } catch (java.lang.Exception e) {
            logger.error("3DES解密异常", e);
        }
        return null;
    }


    public static void main(String[] args) {
        //String content = "<html><body><h2>停服站点测试页面</h2></body></html>";
        String content = "123456";
        // 密码长度必须是8的倍数
        String password = "tdwACw!#3321!CG";

        String contentBytes = encode3Des(password, content);
        System.out.println(contentBytes);

        //String desStr = "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";
        String ecode3Des = decode3Des(password, contentBytes);
        System.out.println(ecode3Des);
    }


}
