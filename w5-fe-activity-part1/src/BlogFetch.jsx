import { useState, useEffect } from "react";

const BlogFetch = () => {
  const [blog, setBlog] = useState(null);

  const apiUrl = "https://jsonplaceholder.typicode.com/posts/1"; // temporary dummy API

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(apiUrl);
      const json = await response.json();

      if (response.ok) {
        setBlog(json);
      }
    };

    fetchBlog();
  }, []);

  return (
    <div>
      <h1>Blog Fetch Example</h1>
      {!blog && <p>Loading...</p>}
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
        </div>
      )}
    </div>
  );
};

export default BlogFetch;
