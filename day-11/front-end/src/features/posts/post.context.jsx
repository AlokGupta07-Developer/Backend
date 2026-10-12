import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [feed, setFeed] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <PostContext.Provider
      value={{
        feed,
        setFeed,
        posts,
        setPosts,
        loading,
        setLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};