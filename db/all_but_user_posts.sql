SELECT posts.title, users.username, users.profile_pic, posts.id FROM posts
JOIN users ON users.id = posts.author_id
WHERE NOT posts.author_id = $1;
