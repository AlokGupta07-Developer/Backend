import "../style/Feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import Post from "../components/post";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed-page">
      <Navbar />
      <div className="feed">
        <div className="posts">
          {feed
            .filter((post) => post && post._id)
            .map((post) => (
              <Post key={post._id} user={post.userId} post={post} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Feed;
