import { http } from "./http";
import { ui } from "./ui";

// Get Posts
const getPosts = () => {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.getPosts(data))
    .catch((err) => console.log(err));

  console.log("working");
};

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
