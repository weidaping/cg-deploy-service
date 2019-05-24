package com.tuandai.cg.html.model;

import java.util.List;

/**
 * 钉钉消息体
 *
 * Created by weidaping on 2019/1/9.
 */
public class DingDingText {
    private String msgtype;
    private Text text;
    private At at;

    public DingDingText() {
    }

    public DingDingText(String msgtype) {
        this.msgtype = msgtype;
    }

    public String getMsgtype() {
        return msgtype;
    }

    public DingDingText setMsgtype(String msgtype) {
        this.msgtype = msgtype;
        return this;
    }

    public Text getText() {
        return text;
    }

    public DingDingText setText(Text text) {
        this.text = text;
        return this;
    }

    public At getAt() {
        return at;
    }

    public DingDingText setAt(At at) {
        this.at = at;
        return this;
    }

    public static class Text {
        private String content;

        public Text() {
        }

        public Text(String content) {
            this.content = content;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }

    public static class At {
        private List<String> atMobiles;

        private Boolean isAtAll;

        public At() {}

        public At(Boolean isAtAll) {
            this.isAtAll = isAtAll;
        }

        public List<String> getAtMobiles() {
            return atMobiles;
        }

        public void setAtMobiles(List<String> atMobiles) {
            this.atMobiles = atMobiles;
        }

        public Boolean getAtAll() {
            return isAtAll;
        }

        public void setAtAll(Boolean atAll) {
            isAtAll = atAll;
        }

        @Override
        public String toString() {
            final StringBuffer sb = new StringBuffer("At{");
            sb.append("atMobiles=").append(atMobiles);
            sb.append(", isAtAll=").append(isAtAll);
            sb.append('}');
            return sb.toString();
        }
    }
}
