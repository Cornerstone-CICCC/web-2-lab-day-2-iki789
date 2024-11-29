$(function () {
  let curId = 1;
  const prevBtn = $("header").children().first();
  const nextBtn = $("header").children().last();

  const getUser = (id) => {
    const USER_ENDPOINT = `https://dummyjson.com/users/${id}`;
    return $.ajax({
      url: USER_ENDPOINT,
      method: "GET",
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  const getPosts = (userId) => {
    const USER_ENDPOINT = `https://dummyjson.com/users/${userId}/posts`;
    return $.ajax({
      url: USER_ENDPOINT,
      method: "GET",
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  const getTodos = (userId) => {
    const USER_ENDPOINT = `https://dummyjson.com/users/${userId}/todos`;
    return $.ajax({
      url: USER_ENDPOINT,
      method: "GET",
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  const updateUI = (user, posts, todos) => {
    $(".info__image").find("img").attr("src", user.image);
    updateAbout(user);
    updatePosts(user, posts);
    updateTodos(user, todos);
    handlePrevButton();
  };

  const updateAbout = (user) => {
    const html = `
      <div>
        <h2>${user.firstName} ${user.lastName}</h2>
        <p>  
          <b>Age:</b> ${user.age} 
        </p>
        <p>  
          <b>Email:</b> ${user.email} 
        </p>
        <p>  
          <b>Phone:</b> ${user.phone} 
        </p>
        </ul>
      </div>    
    `;
    $(".info__content").html(html);
  };

  const updatePosts = (user, posts) => {
    $(".posts").find("h3").first().html(`${user.firstName}'s Posts`);

    let html = "";
    if (posts.posts.length) {
      posts.posts.forEach((post) => {
        html += `
          <li>
            <h4 class="post__title">${post.title}</h4>
            <p>${post.body}</p>
          </li>
        `;
      });
    } else {
      html += "<li>User has no posts.</li>";
    }

    $(".posts").find("ul").html(html);
    $(".post__title").on("click", function () {
      const modal = `
        <div class="modal_wrapper">
          <div class="modal">
            <h2>${$(this).text()}</h2>
            <p>${$(this).next().text()}</p>
            <button>Close Modal</button>
          </div>
        </div>
      `;
      $(".container").append(modal);
      $(".modal")
        .find("button")
        .on("click", function () {
          $(".container").find(".modal_wrapper").remove();
        });
    });
  };

  const updateTodos = (user, todos) => {
    $(".todos").find("h3").first().html(`${user.firstName}'s Todos`);
    let html = "";
    if (todos.todos.length) {
      todos.todos.forEach((todo) => {
        html += `
        <li>
          <p>${todo.todo}</p>
        </li>
        `;
      });
    } else {
      html += "<li>User has no todos.</li>";
    }

    $(".todos").find("ul").html(html);
  };

  const handlePrevButton = () => {
    curId <= 1 ? prevBtn.attr("disabled", "") : prevBtn.removeAttr("disabled");
  };

  $(nextBtn).on("click", async function () {
    curId += 1;
    const user = await getUser(curId);
    const posts = await getPosts(curId);
    const todos = await getTodos(curId);
    updateUI(user, posts, todos);
  });

  $(prevBtn).on("click", async function () {
    curId -= 1;
    const user = await getUser(curId);
    const posts = await getPosts(curId);
    const todos = await getTodos(curId);
    updateUI(user, posts, todos);
  });

  $(".posts")
    .find("h3")
    .on("click", function () {
      $(this).next().slideToggle();
    });

  $(".todos")
    .find("h3")
    .on("click", function () {
      $(this).next().slideToggle();
    });

  // initial fetch
  (async () => {
    const user = await getUser(curId);
    const posts = await getPosts(curId);
    const todos = await getTodos(curId);
    updateUI(user, posts, todos);
  })();
});
