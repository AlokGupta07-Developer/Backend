
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Smile,
} from "lucide-react";



const Posts = ({ user, post }) => {


  return (
    <div>
      {/* User Details */}
      <div className="user">
        <div className="user-info">
         <img
  src={user?.profileImage}
  alt={user.userName || "User"}
/>

          <p>{user?.userName}</p>
        </div>

        <MoreHorizontal size={24} />
      </div>

      {/* Post Image */}
      <img className="post-image" src={post.imgURL} alt="Post" />

      {/* Action Buttons */}
      <div className="actions">
        <div className="left-actions">
          <Heart size={26} />
          <MessageCircle size={26} />
          <Send size={25} />
        </div>

        <Bookmark size={25} />
      </div>

      {/* Post Caption */}
      <div className="bottom">
        <p className="likes">123</p>

        <p className="caption">
          <strong>alok123</strong>{" "}
        {post.caption}
        </p>

        <p className="view-comments">View all 12 comments</p>

        {/* Comment Input */}
        <div className="add-comment">
          <Smile size={22} />

          <input type="text" placeholder="Add a comment..." />

          <button>Post</button>
        </div>

        <p className="time">2 HOURS AGO</p>
      </div>
    </div>
  );
};

export default Posts;
