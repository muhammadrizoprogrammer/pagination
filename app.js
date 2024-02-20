// https://react-bootstrap.netlify.app/docs/components/pagination/
const posts = document.getElementById("posts");
const currentLimit = document.getElementById("limit");
const btnCuttentLimit = document.getElementById("btn-limit");
const pagination = document.getElementById("pagination");

let total = 100;
let limit = 10;
let page = 1;
let currentPage = 1;

const getData = async (page = 1, limit = 10) => {
  while (posts.firstChild) {
    posts.removeChild(posts.firstChild);
  }
  await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((element) => {
        const post = document.createElement("div");
        post.innerText = element.title;
        posts.appendChild(post);
      });
      setPagination();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handlePage = (page) => {
  page = page;
  getData(page);
};

getData();

btnCuttentLimit.addEventListener("click", async () => {
  limit = currentLimit.value;
  getData(page, limit);
  // console.log(btnPages());
});

const ellipsis = "...";

const btnPages = () => {
  const c = currentPage;
  const t = Math.ceil(total / limit);

  if (t <= 7) {
    const pages = [];
    for (let i = 1; i <= t; i++) pages.push(i);
    return pages;
  } else {
    let pages = [];
    if (c <= 3) {
      pages = [1, + 2, 3, 4, 5, ellipsis, t];
    } else if (c >= t - 3) {
      pages = [1, ellipsis, t - 4, t - 3, t - 2, t - 1, t];
    } else {
      pages = [1, ellipsis, c, c + 1, c + 2, ellipsis, t];
    }
    return pages;
  }
};

function setPagination() {

  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }
  const prev = document.createElement("button");
  prev.textContent = "prev";
  prev.classList.add("prev");

  prev.addEventListener("click", () => {
    getData(--currentPage, limit);
  });

  if (currentPage <= 1 && currentPage == 1) {
    prev.style.display = "none"
  }
  pagination.appendChild(prev);

  btnPages().forEach((i) => {

    const btn = document.createElement("button");
    btn.classList.add("page_i");

    btn.addEventListener("click", () => {

      getData(i, limit);
      currentPage = i;

    });

    btn.textContent = i;
    pagination.appendChild(btn);

    if (currentPage == i) {
      btn.classList.add("active");
    }

    if (i == ellipsis) {
      btn.classList.remove("page_i");
      btn.classList.add("bor");
      btn.remove();

      const span = document.createElement("span");
      span.classList.add("btn_dot");
      span.textContent="...";
      pagination.appendChild(span);
    }
  });

  const next = document.createElement("button");
  next.textContent = "next";
  next.classList.add("next");

  next.addEventListener("click", () => {
    getData(++currentPage, limit);
  });
  
  if (currentPage >= Math.ceil(total / limit)) {
    next.style.display = "none";
  }

  pagination.appendChild(next);
}



