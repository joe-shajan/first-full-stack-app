
import authAxios from "../Utils/axios-header";


const getAllPrivatePosts = () => {
  return authAxios.get("/post/private");
};

const postService = {
  getAllPrivatePosts,
};

export default postService;