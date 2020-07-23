import { http } from "./http";
import { ui } from "./ui";

// Get Posts
const getPosts = () => {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.getPosts(data))
    .catch((err) => console.log(err));
};

// Submit Posts
const submitPosts = () => {
  // Posts Title & Body
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const data = {
    title,
    body,
  };

  http
    .post("http://localhost:3000/posts", data)
    .then((data) => {
      ui.showAlert("Post added!", "alert alert-success");
      ui.clearFields();
      getPosts(data);
    })
    .catch((err) => console.log(err));
};

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPosts);
