-- ============================================================
-- SocialConnect Standard Database Queries Suite
-- ============================================================

USE testdb;

-- ============================================================
-- SECTION 1: JOIN Queries (5 Queries)
-- ============================================================

-- Query 1: Get all posts with creator's username, bio, and post visibility
SELECT p.post_id, u.username, u.bio, p.content, p.media_url, p.visibility, p.created_at
FROM Post p
JOIN User u ON p.created_by = u.user_id
ORDER BY p.created_at DESC;

-- Query 2: Get comment details on posts, showing commenter username and post author username
SELECT c.comment_id, u_commenter.username AS commenter, c.comment_text, 
       p.post_id, u_author.username AS post_author
FROM Comment c
JOIN User u_commenter ON c.commented_by = u_commenter.user_id
JOIN Post p ON c.post_id = p.post_id
JOIN User u_author ON p.created_by = u_author.user_id;

-- Query 3: Find all messages sent, displaying sender and receiver usernames
SELECT m.message_id, u_sender.username AS sender, u_receiver.username AS receiver,
       m.message_text, m.sent_time
FROM Message m
JOIN User u_sender ON m.sender = u_sender.user_id
JOIN User u_receiver ON m.receiver = u_receiver.user_id
ORDER BY m.sent_time ASC;

-- Query 4: List all groups along with their creator's username
SELECT ug.group_id, ug.group_name, ug.description, u.username AS creator_username, ug.created_on
FROM UserGroup ug
LEFT JOIN User u ON ug.created_by = u.user_id;

-- Query 5: Find all hashtags associated with posts, showing the post content and tag names
SELECT p.post_id, p.content AS post_content, h.tag_name AS hashtag
FROM Post_Contains_HashTag pch
JOIN Post p ON pch.post_id = p.post_id
JOIN HashTag h ON pch.hashtag_id = h.hashtag_id;


-- ============================================================
-- SECTION 2: Aggregate Queries (5 Queries)
-- ============================================================

-- Query 1: Count the total number of registered users
SELECT COUNT(*) AS total_users FROM User;

-- Query 2: Get total likes count for each post
SELECT post_id, COUNT(user_id) AS likes_count 
FROM User_Likes_Post 
GROUP BY post_id;

-- Query 3: Find the youngest and oldest users based on date of birth
SELECT MIN(dateOfBirth) AS oldest_birth_date, MAX(dateOfBirth) AS youngest_birth_date 
FROM User;

-- Query 4: Find the average length of post content across all public posts
SELECT AVG(CHAR_LENGTH(content)) AS average_post_length 
FROM Post 
WHERE visibility = 'public';

-- Query 5: Find total group memberships across all groups
SELECT COUNT(*) AS total_group_memberships FROM User_Joins_UserGroup;


-- ============================================================
-- SECTION 3: Nested / Subqueries (3 Queries)
-- ============================================================

-- Query 1: Find users who have never created a post
SELECT user_id, username, email 
FROM User 
WHERE user_id NOT IN (SELECT DISTINCT created_by FROM Post);

-- Query 2: Find posts that have received more likes than the average number of likes per post
SELECT post_id, content 
FROM Post 
WHERE post_id IN (
    SELECT post_id 
    FROM User_Likes_Post 
    GROUP BY post_id 
    HAVING COUNT(user_id) > (
        SELECT AVG(like_count) 
        FROM (
            SELECT COUNT(user_id) AS like_count 
            FROM User_Likes_Post 
            GROUP BY post_id
        ) AS sub_likes
    )
);

-- Query 3: Find users who joined the group created by the user 'alice_dev'
SELECT u.user_id, u.username, u.email 
FROM User u
JOIN User_Joins_UserGroup ujg ON u.user_id = ujg.user_id
WHERE ujg.group_id IN (
    SELECT group_id 
    FROM UserGroup 
    WHERE created_by = (SELECT user_id FROM User WHERE username = 'alice_dev')
);


-- ============================================================
-- SECTION 4: GROUP BY ... HAVING Queries (3 Queries)
-- ============================================================

-- Query 1: Get users who have created more than 1 post
SELECT created_by AS user_id, COUNT(*) AS posts_count 
FROM Post 
GROUP BY created_by 
HAVING posts_count > 1;

-- Query 2: List groups that have more than 2 members
SELECT group_id, COUNT(user_id) AS member_count 
FROM User_Joins_UserGroup 
GROUP BY group_id 
HAVING member_count > 2;

-- Query 3: Find hashtags that are linked to more than 1 post
SELECT hashtag_id, COUNT(post_id) AS post_count 
FROM Post_Contains_HashTag 
GROUP BY hashtag_id 
HAVING post_count > 1;


-- ============================================================
-- SECTION 5: Views (2 Views)
-- ============================================================

-- View 1: User activity summary showing post, comment, and like counts
CREATE OR REPLACE VIEW UserInteractionStats AS
SELECT 
    u.user_id,
    u.username,
    (SELECT COUNT(*) FROM Post WHERE created_by = u.user_id) AS total_posts_created,
    (SELECT COUNT(*) FROM Comment WHERE commented_by = u.user_id) AS total_comments_made,
    (SELECT COUNT(*) FROM User_Likes_Post WHERE user_id = u.user_id) AS total_likes_given
FROM User u;

-- View 2: High level post statistics for public posts
CREATE OR REPLACE VIEW PublicPostDetails AS
SELECT 
    p.post_id,
    p.content,
    u.username AS creator_username,
    (SELECT COUNT(*) FROM Comment WHERE post_id = p.post_id) AS comments_count,
    (SELECT COUNT(*) FROM User_Likes_Post WHERE post_id = p.post_id) AS likes_count
FROM Post p
JOIN User u ON p.created_by = u.user_id
WHERE p.visibility = 'public';


-- ============================================================
-- SECTION 6: Analytics Queries (2 Queries)
-- ============================================================

-- Query 1: Rank users by their engagement rate (Likes + Comments received on their posts)
SELECT 
    u.username,
    COUNT(DISTINCT p.post_id) AS total_posts,
    COUNT(DISTINCT l.user_id) AS total_likes_received,
    COUNT(DISTINCT c.comment_id) AS total_comments_received,
    (COUNT(DISTINCT l.user_id) + COUNT(DISTINCT c.comment_id)) / COUNT(DISTINCT p.post_id) AS avg_engagement_per_post
FROM User u
LEFT JOIN Post p ON u.user_id = p.created_by
LEFT JOIN User_Likes_Post l ON p.post_id = l.post_id
LEFT JOIN Comment c ON p.post_id = c.post_id
GROUP BY u.user_id, u.username
HAVING total_posts > 0
ORDER BY avg_engagement_per_post DESC;

-- Query 2: Direct messaging volume analytics between interacting user pairs
SELECT 
    LEAST(sender, receiver) AS user_a_id,
    GREATEST(sender, receiver) AS user_b_id,
    COUNT(*) AS total_messages_exchanged,
    MAX(sent_time) AS last_message_sent
FROM Message
GROUP BY user_a_id, user_b_id
ORDER BY total_messages_exchanged DESC;
