import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const json = await response.json();

      if (response.ok) {
        setBlog(json);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div>
      <h1>Blog Details Page</h1>
      {!blog && <p>Loading...</p>}
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <p><strong>Blog ID:</strong> {id}</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
