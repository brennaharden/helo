SELECT posts.title, posts.img, posts.content, posts.author_id, users.username, users.profile_pic FROM posts
JOIN users on posts.author_id = users.id
WHERE posts.id = $1;