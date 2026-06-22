-- ============================================================
-- SocialConnect Verification Script
-- ============================================================

USE testdb;

SELECT 'Users' AS entity, COUNT(*) AS total_count FROM User
UNION ALL
SELECT 'Posts', COUNT(*) FROM Post
UNION ALL
SELECT 'Comments', COUNT(*) FROM Comment
UNION ALL
SELECT 'Messages', COUNT(*) FROM Message
UNION ALL
SELECT 'Hashtags', COUNT(*) FROM HashTag
UNION ALL
SELECT 'Groups', COUNT(*) FROM UserGroup;
