import { useGetUsers } from "../../api/users/useGetUsers";
import { Card } from "../common/Card";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import "./Posts.css";



export default function Users() {
  const users = useGetUsers();
  const navigate = useNavigate();


  
  if (!users) {
    return (
        <Box style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
          <CircularProgress color="secondary" />
        </Box>
      );
  }
  
  async function onDelete(id: number) {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  }
  return (
    <div className="posts">
      {users.map((user) =>{
        return(
        <Card
          name={user.name}
          userName={user.username}
          companyName={user.company.name}
          email={user.email}
          website={user.website}
          userId={user.id}
        >
        </Card>
      )})}
    </div>
  );
}
