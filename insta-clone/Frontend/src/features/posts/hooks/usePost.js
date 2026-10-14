import { useContext, useEffect } from "react";
import { PostContext } from "../PostContext.jsx";
import { getFeed, createPost } from "../services/post.api.js";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

const handleCreatePost = async (imageFile, caption) => {
  try {
    setLoading(true);

    const data = await createPost(imageFile, caption);

    if (!data?.post) {
      throw new Error("Created post was not returned by the API");
    }

    setFeed((prevFeed) => [data.post, ...prevFeed]);
  } catch (error) {
    console.error(
      "Post create failed:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    handleCreatePost();
  }, []);

  return { loading, feed, post, handleGetFeed, handleCreatePost };
};
