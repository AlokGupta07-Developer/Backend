import "../style/CreatePost.scss";
import { useState, useRef } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setCaption] = useState("");

  const postImageInputFiledRef = useRef(null);

  const { loading, handleCreatePost } = usePost();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const file = postImageInputFiledRef.current.files[0];

    await handleCreatePost(file, caption);

    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Creating post</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create post</h1>
        <label htmlFor="postImage" className="post-image-label">
          Select Image
        </label>
        <form onSubmit={ handleSubmit }>
          <input
            type="file"
            name="postImage"
            id="postImage"
            hidden
            ref={postImageInputFiledRef}
          />
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <button className="button primary-button">Create post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
