var postNumber;
//input field title
const titleField = document.querySelector(".title-input");

//input field post
const postField = document.querySelector(".post-input");

//form for adding a post
const postForm = document.querySelector(".add-post-form");
postForm.addEventListener("submit", (event) => {
  if (titleField.value === "" || postField.value === "") {
    alert("Please add a post!");
    return;
  }
  let newPost = {
    userId: Math.floor(Math.random() * 10) + 1,
    id: postNumber(),
    title: titleField.value,
    body: postField.value,
  };
  titleField.value = "";
  postField.value = "";
  console.log(newPost);
  addPost(newPost);
  event.preventDefault();
});

//GET post from api
function getPosts() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      let posts = response.data;
      postNumber = postCount(posts.length);
      displayPostsDOM(posts);
    })
    .catch((error) => {
      console.log(error);
    });
}

getPosts();

//display post on the document
function displayPostsDOM(posts) {
  posts.forEach((post) => {
    appendPostDOM(post);
  });
}

//add each post in the document
function appendPostDOM(post) {
  //paragraph for caontaining the post body
  let p = document.createElement("p");
  //header for post title
  let h1 = document.createElement("h1");
  //header for userId
  let h3 = document.createElement("h3");
  //header for postID
  let h4 = document.createElement("h4");
  //card that will caontain all the data
  let cardDiv = document.createElement("div");
  //form for editing the post

  //div for holding the btns
  let btnDiv = document.createElement("div");
  btnDiv.className += "btnDiv";
  //edit btn
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className += "editBtn";
  let updateDiv = document.createElement("div");
  let editForm = document.createElement("form");
  let editTitle = document.createElement("input");
  let editPost = document.createElement("input");
  editBtn.onclick = () => {
    if (editBtn.textContent === "Edit") {
      editForm.appendChild(editTitle);
      editForm.appendChild(editPost);
      updateDiv.appendChild(editForm);
      cardDiv.appendChild(updateDiv);
      editBtn.textContent = "Update";
      editTitle.value = post.title;
      editPost.value = post.body;
    } else {
      editBtn.textContent = "Edit";
      let updatedPost = {
        userId: post.userId,
        body: editPost.value,
        id: post.id,
        title: editTitle.value,
      };
      updateDiv.remove();
      cardDiv.remove()
      updatePost(updatedPost);
    }
  };
  //delete btn
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove";
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = () => {
    deletePost(post.id);
    cardDiv.remove();
  };
  cardDiv.className += "postcard";
  h1.innerHTML = post.title;
  h3.innerHTML = "User Id: " + post.userId;
  h4.innerHTML = "Post Id: " + post.id;
  p.innerHTML = post.body;
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);
  cardDiv.appendChild(h1);
  cardDiv.appendChild(h3);
  cardDiv.appendChild(h4);
  cardDiv.appendChild(p);
  cardDiv.appendChild(btnDiv);
  $(".card-container").prepend(cardDiv);
}

//POST add post to api
function addPost(newPost) {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", newPost)
    .then((response) => {
      console.log(response.data);
      appendPostDOM(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//closure to maintain post count
function postCount(totalPosts) {
  var currentTotal = totalPosts;
  return function () {
    currentTotal++;
    return currentTotal;
  };
}

function deletePost(postId) {
  axios
    .delete("https://jsonplaceholder.typicode.com/posts" + "/" + postId)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updatePost(updatedPost) {
  axios
    .put(
      "https://jsonplaceholder.typicode.com/posts" + "/" + updatedPost.id,
      updatedPost
    )
    .then((response) => {
        console.log(response.data)
      appendPostDOM(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
