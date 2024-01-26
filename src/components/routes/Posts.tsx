import { useGetPosts } from "../../api/posts/useGetPosts";
import { useGetUsers } from "../../api/users/useGetUsers";
import { Card } from "../common/Card";
import { Box, CircularProgress } from "@mui/material";
import "./Posts.css";

export default function Posts() {
  const posts = useGetPosts();
  const users = useGetUsers();
  if (!posts) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <div className="posts">
      {posts.map((post) => {
        const user = users?.find(
          (user) => Number(user.id) === Number(post.userId)
        );
        return (
          <Card
            description={post.body}
            title={post.title}
            userId={post.userId}
            name={user?.name}
            userName={user?.username}
            postId={post.id}
          ></Card>
        );
      })}
    </div>
  );
}
