import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import "./PostById.css";
import { useGetUser } from "../../api/users/useGetUser";
import { useGetPost } from "../../api/posts/useGetPost";
import { Card } from "../common/Card";
import { useGetCommentsByPostId } from "../../api/comments/useGetCommentsByPostId";
import { useGetUsers } from "../../api/users/useGetUsers";

function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Posts() {
  const { id } = useParams();
  const post = useGetPost(Number(id));
  const userId = post?.userId.toString();
  const user = useGetUser(userId || "");
  const users = useGetUsers();
  const comments = useGetCommentsByPostId(id || "");
  console.log(user);
  const navigate = useNavigate();

  async function onDelete(id: number) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  }
  return (
    <div>
      <Card
        description={post?.body}
        title={post?.title}
        key={post?.id}
        userId={post?.userId}
        name={user?.name}
        userName={user?.username}
      ></Card>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            background: "white",
            position: "absolute",
            top: "-3px",
            width: "Calc(100% - 32px)",
            padding: "16px",
            
          }}
        >
          <Typography>Comment section:</Typography>
          <div className="comments">
            {comments?.map((comment) => (
              <Card
                description={comment.body}
                title={comment.name}
                key={comment.id}
                email={comment.email}
              />
            ))}
          </div>
        </Box>
      </Box>
    </div>
  );
}
