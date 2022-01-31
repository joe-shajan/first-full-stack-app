import React, { useState, useEffect } from "react";
import PostService from "../../services/post-servies";


const Posts = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

 
  useEffect(() => {
    PostService.getAllPrivatePosts()
    .then(
      (response) => {
          
        setPrivatePosts(response.data);
      },
      (error) => {
        console.log("Private page err");
        //Invalid token
        if (error.response && error.response.status === 403) {
        //   AuthService.logout();
        //   navigate("/login");
        //   window.location.reload();
        }
      }
    );
  }, []);

  return (
    <div>
      <h3>{privatePosts.map((post) => post)}</h3>
    </div>
  );
};

export default Posts;