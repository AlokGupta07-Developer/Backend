
import "../style/Feed.scss";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import Post from "../components/post";

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

  console.log(feed)

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
           {feed.map((post) => (
  <Post
    key={post._id}
    user={post.userId}
    post={post}
  />
))}
        </div>
      </div>
    </main>
  );
};

export default Feed;
