class UI {
  constructor() {
    this.posts = document.getElementById("posts");
    this.titleInput = document.getElementById("title");
    this.bodyInput = document.getElementById("body");
    this.idInput = document.getElementById("id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  // Display Posts to DOM
  getPosts = (posts) => {
    let output = "";

    posts.forEach((post) => {
      output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
          `;
    });
    this.posts.innerHTML = output;
  };

  // Display Alert to DOM
  showAlert = (message, className) => {
    this.clearAlert();

    // Create div
    const div = document.createElement("div");
    // Add class
    div.className = className;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".postsContainer");
    // Get Posts
    const posts = document.querySelector("#posts");
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout for clearAlert
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  };

  // Clear existing alerts
  clearAlert = () => {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  };

  // Clear all input fields
  clearFields = () => {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  };

  // Fill form to edit
  fillForm = (data) => {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
  };
}

export const ui = new UI();
