-- ============================================================
-- SocialConnect Sample Data (150+ records)
-- ============================================================

USE testdb;

-- ============================================================
-- 25 Users (password = 'password123' hashed with bcrypt)
-- ============================================================
INSERT INTO User (user_id, username, email, password, bio, dateOfBirth) VALUES
(1,  'alice',       'alice@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Full-stack developer and tech blogger.', '1995-04-12'),
(2,  'bob',         'bob@example.com',         '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Travel photographer and blogger.', '1992-08-25'),
(3,  'charlie',     'charlie@example.com',     '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Design lover and foodie.', '1998-11-03'),
(4,  'diana',       'diana@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Data scientist at BigTech.', '1993-01-15'),
(5,  'ethan',       'ethan@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Music producer and DJ.', '1996-07-22'),
(6,  'fiona',       'fiona@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Yoga instructor and wellness coach.', '1990-03-08'),
(7,  'george',      'george@example.com',      '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Startup founder. Building the future.', '1988-12-30'),
(8,  'hannah',      'hannah@example.com',      '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Book reviewer and literary critic.', '1997-06-14'),
(9,  'ivan',        'ivan@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Cybersecurity analyst.', '1994-09-19'),
(10, 'julia',       'julia@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Graphic designer and illustrator.', '1991-05-27'),
(11, 'kevin',       'kevin@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'College student studying CS.', '2001-02-10'),
(12, 'lisa',        'lisa@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Marketing specialist and content creator.', '1989-11-05'),
(13, 'mike',        'mike@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Fitness trainer and nutritionist.', '1993-08-18'),
(14, 'natalie',     'natalie@example.com',      '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Environmental activist and blogger.', '1995-12-01'),
(15, 'oscar',       'oscar@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Film critic and screenwriter.', '1987-04-25'),
(16, 'priya',       'priya@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Machine learning researcher.', '1996-10-09'),
(17, 'quinn',       'quinn@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Professional gamer and streamer.', '2000-01-30'),
(18, 'rachel',      'rachel@example.com',      '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Fashion designer in NYC.', '1992-07-16'),
(19, 'sam',         'sam@example.com',         '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Backend engineer at a SaaS company.', '1994-03-22'),
(20, 'tina',        'tina@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Chef and restaurant owner.', '1986-09-11'),
(21, 'umar',        'umar@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Civil engineer and urban planner.', '1991-06-05'),
(22, 'vera',        'vera@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Digital nomad and freelance writer.', '1993-12-28'),
(23, 'will',        'will@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Philosophy student and podcast host.', '1999-08-14'),
(24, 'xena',        'xena@example.com',        '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Veterinarian and animal rights advocate.', '1990-02-17'),
(25, 'yusuf',       'yusuf@example.com',       '$2b$10$tM.yF5sV6d0H9K.Fh67EaO2qK8DqHqgB4v3bS9/8W.dG8Z2JpU5u.', 'Journalist covering world affairs.', '1988-05-20');

-- ============================================================
-- User_Phone (25 phone records)
-- ============================================================
INSERT INTO User_Phone (user_id, phone_number) VALUES
(1,  '123-456-7890'),
(1,  '098-765-4321'),
(2,  '555-555-5555'),
(3,  '111-222-3333'),
(4,  '444-555-6666'),
(5,  '777-888-9999'),
(6,  '321-654-0987'),
(7,  '654-321-0000'),
(8,  '999-888-7777'),
(9,  '222-333-4444'),
(10, '555-666-7777'),
(11, '888-999-0000'),
(12, '111-000-2222'),
(13, '333-444-5555'),
(14, '666-777-8888'),
(15, '999-000-1111'),
(16, '222-111-3333'),
(17, '444-333-5555'),
(18, '666-555-7777'),
(19, '888-777-9999'),
(20, '000-999-1111'),
(21, '333-222-4444'),
(22, '555-444-6666'),
(23, '777-666-8888'),
(24, '999-888-0000'),
(25, '111-999-2222');

-- ============================================================
-- 30 Posts
-- ============================================================
INSERT INTO Post (post_id, created_by, content, media_url, visibility) VALUES
(1,  1,  'Excited to launch my new website built with Node.js and MySQL! #developer #database #webdev', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', 'public'),
(2,  2,  'Amazing view from my trip to the mountains today! #nature #photography #travel', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', 'public'),
(3,  3,  'Just cooked a delicious homemade lasagna. Cooking is art! #foodie #cooking', NULL, 'public'),
(4,  4,  'Finished my research paper on neural networks. #AI #machinelearning #research', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600', 'public'),
(5,  5,  'New beat dropped on SoundCloud! Check it out. #music #producer #newrelease', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600', 'public'),
(6,  6,  'Morning yoga session by the beach. Namaste! #yoga #wellness #morning', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', 'public'),
(7,  7,  'Our startup just closed Series A funding! #startup #business #funding', NULL, 'public'),
(8,  8,  'Reading Atomic Habits - such a game changer. #books #reading #selfimprovement', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600', 'public'),
(9,  9,  'Just completed a CTF challenge in under 30 minutes! #cybersecurity #hacking #infosec', NULL, 'public'),
(10, 10, 'New digital painting finished after 20 hours of work. #art #digitalart #illustration', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600', 'public'),
(11, 11, 'Aced my database systems exam today! #college #student #database', NULL, 'public'),
(12, 12, 'Our latest campaign reached 1M impressions! #marketing #socialmedia #growth', NULL, 'public'),
(13, 13, 'New personal best on deadlift - 200kg! #fitness #gym #powerlifting', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', 'public'),
(14, 14, 'Planted 500 trees this weekend with volunteers. #environment #sustainability #green', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600', 'public'),
(15, 15, 'Watched Oppenheimer for the third time. Still breathtaking. #cinema #movies #review', NULL, 'public'),
(16, 16, 'Published my first paper in NeurIPS! #AI #deeplearning #research', NULL, 'public'),
(17, 17, 'Won the regional esports tournament! #gaming #esports #victory', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600', 'public'),
(18, 18, 'My new fashion collection is inspired by 90s grunge. #fashion #design #style', 'https://images.unsplash.com/photo-1558171813-01a9f954263e?w=600', 'public'),
(19, 19, 'Deployed a microservices architecture with Kubernetes today. #devops #kubernetes #cloud', NULL, 'public'),
(20, 20, 'Tonights special: truffle risotto with parmesan foam. #chef #finedining #food', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600', 'public'),
(21, 1,  'Working on a new open-source project. Contributors welcome! #opensource #coding', NULL, 'public'),
(22, 2,  'Sunset at Santorini. Absolutely magical. #greece #travel #sunset', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600', 'public'),
(23, 3,  'Tried making sushi for the first time. Not bad! #sushi #homecooking #foodie', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600', 'public'),
(24, 4,  'Data visualization tip: always label your axes! #datascience #tips #analytics', NULL, 'public'),
(25, 5,  'Collaborating with an amazing vocalist on my next track. #collaboration #music', NULL, 'public'),
(26, 21, 'Visited the new sustainable housing project downtown. #architecture #urban #design', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600', 'public'),
(27, 22, 'Writing from a cafe in Lisbon today. Life is good. #digitalnomad #remote #travel', 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600', 'public'),
(28, 23, 'Does free will really exist? New podcast episode is live. #philosophy #podcast #debate', NULL, 'public'),
(29, 24, 'Rescued a stray kitten today. Meet Whiskers! #animals #rescue #cats', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600', 'public'),
(30, 25, 'Breaking: New climate accord signed by 50 nations. #journalism #climate #breaking', NULL, 'public');

-- ============================================================
-- 25 Comments
-- ============================================================
INSERT INTO Comment (comment_id, post_id, commented_by, comment_text) VALUES
(1,  1,  2,  'Looks awesome Alice! Congrats on the launch!'),
(2,  1,  3,  'Great stack choice! Node plus MySQL is solid.'),
(3,  2,  1,  'Incredible shot, Bob! Where is this?'),
(4,  2,  5,  'The lighting is perfect. Amazing capture!'),
(5,  3,  1,  'That looks delicious! Share the recipe?'),
(6,  4,  16, 'Would love to read your paper. Link?'),
(7,  5,  17, 'Fire beat! Adding it to my playlist.'),
(8,  6,  14, 'Beach yoga is the best kind of yoga!'),
(9,  7,  4,  'Congratulations George! Huge milestone.'),
(10, 8,  23, 'That book changed my daily routine completely.'),
(11, 9,  19, 'Impressive time! Which CTF platform?'),
(12, 10, 18, 'The colors are stunning. What software do you use?'),
(13, 11, 1,  'Nice job Kevin! Databases are fun once you get them.'),
(14, 13, 6,  'Amazing strength! Keep pushing!'),
(15, 14, 24, 'This is wonderful work Natalie. Inspiring!'),
(16, 15, 8,  'Such a masterpiece of a film. Agree 100 percent.'),
(17, 17, 11, 'GG! What game was the tournament for?'),
(18, 18, 10, 'The 90s grunge vibe is making a comeback!'),
(19, 20, 3,  'That risotto looks incredible, Tina!'),
(20, 22, 14, 'Santorini is on my bucket list!'),
(21, 23, 20, 'Not bad for a first attempt! Keep practicing.'),
(22, 26, 7,  'Sustainable housing is the future. Great visit!'),
(23, 27, 22, 'Lisbon cafes have the best pasteis de nata.'),
(24, 29, 6,  'Whiskers is adorable! Bless you for rescuing.'),
(25, 30, 21, 'This is huge news. Hope nations follow through.');

-- ============================================================
-- 20 Messages
-- ============================================================
INSERT INTO Message (message_id, sender, receiver, message_text) VALUES
(1,  1,  2,  'Hey Bob, did you finish those mountain photos?'),
(2,  2,  1,  'Hey! Yes, sending them over shortly.'),
(3,  3,  1,  'Hi Alice, love your recent post about Node.js!'),
(4,  1,  3,  'Thanks Charlie! Let me know if you need help setting up.'),
(5,  4,  16, 'Priya, can we discuss the neural network paper?'),
(6,  16, 4,  'Sure Diana! Let us schedule a call this week.'),
(7,  5,  17, 'Quinn, want to collab on a gaming soundtrack?'),
(8,  17, 5,  'That sounds awesome! I am in.'),
(9,  7,  19, 'Sam, our startup needs a backend engineer. Interested?'),
(10, 19, 7,  'Definitely interested George! Let us talk details.'),
(11, 6,  14, 'Natalie, would you like to join our wellness retreat?'),
(12, 14, 6,  'I would love to Fiona! When is it?'),
(13, 8,  23, 'Will, I loved your podcast on existentialism.'),
(14, 23, 8,  'Thanks Hannah! More episodes coming soon.'),
(15, 10, 18, 'Rachel, your fashion designs are incredible.'),
(16, 18, 10, 'Thank you Julia! Lets collaborate sometime.'),
(17, 9,  11, 'Kevin, need help with cybersecurity basics?'),
(18, 11, 9,  'That would be great Ivan! I am a beginner.'),
(19, 20, 3,  'Charlie, want to try cooking together sometime?'),
(20, 3,  20, 'Absolutely Tina! I will bring the ingredients.');

-- ============================================================
-- 10 Hashtags
-- ============================================================
INSERT INTO HashTag (hashtag_id, tag_name) VALUES
(1,  'developer'),
(2,  'database'),
(3,  'webdev'),
(4,  'nature'),
(5,  'photography'),
(6,  'travel'),
(7,  'foodie'),
(8,  'cooking'),
(9,  'AI'),
(10, 'music');

-- ============================================================
-- Post_Contains_HashTag (30 links)
-- ============================================================
INSERT INTO Post_Contains_HashTag (post_id, hashtag_id) VALUES
(1,  1),
(1,  2),
(1,  3),
(2,  4),
(2,  5),
(2,  6),
(3,  7),
(3,  8),
(4,  9),
(5,  10),
(6,  4),
(8,  1),
(9,  1),
(10, 5),
(11, 2),
(14, 4),
(16, 9),
(17, 10),
(19, 3),
(19, 1),
(21, 1),
(21, 3),
(22, 6),
(22, 5),
(23, 7),
(23, 8),
(24, 9),
(25, 10),
(27, 6),
(30, 4);

-- ============================================================
-- 5 Groups
-- ============================================================
INSERT INTO UserGroup (group_id, group_name, description, created_by) VALUES
(1, 'Web Developers',       'A group for discussing web technologies and databases.', 1),
(2, 'Travel Club',          'Share photos and tips from your trips around the world.', 2),
(3, 'AI and ML Enthusiasts', 'Discussions on artificial intelligence and machine learning.', 4),
(4, 'Fitness Freaks',       'Share workout routines, nutrition tips, and progress.', 13),
(5, 'Bookworms United',     'Book reviews, recommendations, and reading challenges.', 8);

-- ============================================================
-- User_Joins_UserGroup (20 memberships)
-- ============================================================
INSERT INTO User_Joins_UserGroup (user_id, group_id) VALUES
(1,  1),
(2,  1),
(3,  1),
(11, 1),
(19, 1),
(2,  2),
(1,  2),
(22, 2),
(14, 2),
(6,  2),
(4,  3),
(16, 3),
(9,  3),
(1,  3),
(13, 4),
(6,  4),
(5,  4),
(8,  5),
(23, 5),
(15, 5);

-- ============================================================
-- User_Likes_Post (20 likes)
-- ============================================================
INSERT INTO User_Likes_Post (user_id, post_id) VALUES
(2,  1),
(3,  1),
(1,  2),
(3,  2),
(1,  3),
(16, 4),
(4,  4),
(17, 5),
(14, 6),
(4,  7),
(23, 8),
(19, 9),
(18, 10),
(1,  11),
(6,  13),
(24, 14),
(8,  15),
(11, 17),
(10, 18),
(3,  20);

-- ============================================================
-- User_Follows_User (20 follow relationships)
-- ============================================================
INSERT INTO User_Follows_User (follower_id, following_id) VALUES
(1,  2),
(1,  3),
(2,  1),
(3,  1),
(4,  16),
(5,  17),
(6,  14),
(7,  19),
(8,  23),
(9,  11),
(10, 18),
(11, 1),
(12, 7),
(13, 6),
(14, 24),
(16, 4),
(17, 5),
(19, 7),
(22, 2),
(25, 21);
