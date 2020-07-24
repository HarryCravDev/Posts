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
  const id = document.getElementById("id").value;
  const data = {
    title,
    body,
  };

  // Validate input
  if (title === "" || body === "") {
    ui.showAlert("Please populate all fields.", "alert alert-danger");
  } else {
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          ui.showAlert("Post added!", "alert alert-success");
          ui.clearFields();
          getPosts(data);
        })
        .catch((err) => console.log(err));
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert("Post updated!", "alert alert-success");
          ui.changeFormState("add");
          getPosts(data);
        })
        .catch((err) => console.log(err));
    }
  }
};

// Delete Post
const deletePost = (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then((data) => {
        ui.showAlert("Post remove.", "alert alert-success");
        getPosts();
      })
      .catch((err) => console.log(err));
  }
};

// Edit Post
const editPost = (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }
};

// Cancel Edit state
const cancelEdit = (e) => {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
};

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPosts);

// Listen for delete post
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for edit post
document.querySelector("#posts").addEventListener("click", editPost);

// Listen for cancel edit state
document.querySelector(".card-form").addEventListener("click", cancelEdit);
