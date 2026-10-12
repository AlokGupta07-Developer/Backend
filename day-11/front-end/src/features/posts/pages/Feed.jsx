import Posts from "../components/posts";
import "../style/Feed.scss";
import { usePost } from "../hooks/usePosts";
import { useEffect } from "react";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if(loading || !feed) {
    return (<main><h1>Feed is loading</h1></main>)
  }

  console.log(feed)

  return (
    <main>
      <div className="feed">
        <div className="posts">
          <Posts />
        </div>
      </div>
    </main>
  );
};

export default Feed;
