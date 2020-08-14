DROP TABLE IF EXISTS users;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(20),
password VARCHAR(20),
profile_pic TEXT
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
id SERIAL PRIMARY KEY,
title VARCHAR(45),
img TEXT,
content TEXT,
author_id INT REFERENCES users(id)
);

INSERT INTO users(username, password, profile_pic)
VALUES
('FinnTheHuman', 'glorioushair', 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-adventure-time-jeremy-shada.jpg'),
('JakeTheDog', 'koreanunicorn', 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-adventure-time-john-dimaggio-jake.jpg'),
('Marceline', 'vamps4ever', 'https://i.pinimg.com/564x/bf/e1/a4/bfe1a4bdf8cd8cb0accfc42585aad450.jpg');

INSERT INTO posts(title, img, content, author_id)
VALUES
('Treatise on Bloodsucking', 'https://thumbs.dreamstime.com/b/cute-happy-smiling-blood-drop-character-vector-modern-trendy-flat-style-cartoon-illustration-icon-design-isolated-white-160709061.jpg', 'It"s cool.', 3),
('Adventure Time!', 'https://www.clipartkey.com/mpngs/m/231-2317814_adventure-time-sword-png-transparent-adventure-time-sword.png', 'Let"s gooooo', 1);

ALTER TABLE users
ALTER password
SET DATA TYPE TEXT;