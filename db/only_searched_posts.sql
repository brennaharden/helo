SELECT posts.title, users.username, users.profile_pic, posts.id FROM posts
JOIN users ON posts.author_id = users.id
WHERE posts.title LIKE $2 AND NOT posts.author_id = $1;