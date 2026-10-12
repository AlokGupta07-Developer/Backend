import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const {
    feed,
    setFeed,
    posts,
    setPosts,
    loading,
    setLoading,
  } = context;

  const handleGetFeed = async () => {
    setLoading(true);

    try {
      const data = await getFeed();
      setFeed(data.posts);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    feed,
    posts,
    handleGetFeed,
  };
};