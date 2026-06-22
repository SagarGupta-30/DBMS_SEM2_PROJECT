-- ============================================================
-- SocialConnect Database Schema (DBMS Capstone ER Compliant)
-- ============================================================

CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

-- ============================================================
-- 1. User
-- ============================================================
CREATE TABLE IF NOT EXISTS User (
    user_id     INT             AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)     NOT NULL UNIQUE,
    email       VARCHAR(100)    NOT NULL UNIQUE,
    password    VARCHAR(255)    NOT NULL,
    bio         TEXT            DEFAULT NULL,
    join_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    dateOfBirth DATE            DEFAULT NULL
) ENGINE=InnoDB;

-- ============================================================
-- 2. User_Phone (multi-valued attribute)
-- ============================================================
CREATE TABLE IF NOT EXISTS User_Phone (
    user_id       INT             NOT NULL,
    phone_number  VARCHAR(15)     NOT NULL,
    PRIMARY KEY (user_id, phone_number),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 3. Post
-- ============================================================
CREATE TABLE IF NOT EXISTS Post (
    post_id     INT             AUTO_INCREMENT PRIMARY KEY,
    visibility  VARCHAR(50)     DEFAULT 'public',
    content     TEXT            NOT NULL,
    media_url   VARCHAR(255)    DEFAULT NULL,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    created_by  INT             NOT NULL,
    FOREIGN KEY (created_by) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_post_created (created_at DESC)
) ENGINE=InnoDB;

-- ============================================================
-- 4. Comment
-- ============================================================
CREATE TABLE IF NOT EXISTS Comment (
    comment_id   INT             AUTO_INCREMENT PRIMARY KEY,
    comment_text TEXT            NOT NULL,
    created_at   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    post_id      INT             NOT NULL,
    commented_by INT             NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Post(post_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (commented_by) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 5. Message
-- ============================================================
CREATE TABLE IF NOT EXISTS Message (
    message_id   INT             AUTO_INCREMENT PRIMARY KEY,
    message_text TEXT            NOT NULL,
    sent_time    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    sender       INT             NOT NULL,
    receiver     INT             NOT NULL,
    FOREIGN KEY (sender)   REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_message_sent (sent_time)
) ENGINE=InnoDB;

-- ============================================================
-- 6. HashTag
-- ============================================================
CREATE TABLE IF NOT EXISTS HashTag (
    hashtag_id  INT             AUTO_INCREMENT PRIMARY KEY,
    tag_name    VARCHAR(100)    NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ============================================================
-- 7. UserGroup
-- ============================================================
CREATE TABLE IF NOT EXISTS UserGroup (
    group_id    INT             AUTO_INCREMENT PRIMARY KEY,
    group_name  VARCHAR(100)    NOT NULL,
    description TEXT            DEFAULT NULL,
    created_on  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    created_by  INT             DEFAULT NULL,
    FOREIGN KEY (created_by) REFERENCES User(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 8. User_Likes_Post (M:N relationship)
-- ============================================================
CREATE TABLE IF NOT EXISTS User_Likes_Post (
    user_id   INT NOT NULL,
    post_id   INT NOT NULL,
    liked_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 9. User_Follows_User (M:N self-referencing)
-- ============================================================
CREATE TABLE IF NOT EXISTS User_Follows_User (
    follower_id  INT NOT NULL,
    following_id INT NOT NULL,
    followed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id)  REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (following_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 10. User_Joins_UserGroup (M:N relationship)
-- ============================================================
CREATE TABLE IF NOT EXISTS User_Joins_UserGroup (
    user_id   INT NOT NULL,
    group_id  INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id)  REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (group_id) REFERENCES UserGroup(group_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 11. Post_Contains_HashTag (M:N relationship)
-- ============================================================
CREATE TABLE IF NOT EXISTS Post_Contains_HashTag (
    post_id    INT NOT NULL,
    hashtag_id INT NOT NULL,
    PRIMARY KEY (post_id, hashtag_id),
    FOREIGN KEY (post_id)    REFERENCES Post(post_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (hashtag_id) REFERENCES HashTag(hashtag_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- End of Schema
-- ============================================================
