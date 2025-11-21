import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Click a blog to view details:</p>

      <Link to="/blogs/1">Blog 1</Link><br />
      <Link to="/blogs/2">Blog 2</Link><br />
      <Link to="/blogs/3">Blog 3</Link><br />
    </div>
  );
}

export default App;
