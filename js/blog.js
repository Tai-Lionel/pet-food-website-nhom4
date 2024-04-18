//setting for page
const limitPostEachPage = 4;
const limitPostContent = 500;
var currentPageNumber = 1;
//storage
var storage = blogList
for (i = 0; i < storage.length; i++) {
    localStorage.setItem(i, JSON.stringify(storage[i]));
}
localStorage.setItem("soLuongPost", storage.length);
//auto create pagination
function autoPagination(storage) {
    var Pagination = document.getElementById("pagination");
    numberPage = Math.ceil(storage.length / limitPostEachPage);
    Pagination.innerHTML = "";
    for (i = 1; i <= numberPage; i++) {
        var li = document.createElement('li');
        if (i == 1) {
            li.innerHTML = `<li class="nav-item" value="${i}"><a href="#" class="pageNumber nav-link text-secondary active">${i}</a></li>`
        }
        else {
            li.innerHTML = `<li class="nav-item" value="${i}"><a href="#" class="pageNumber nav-link text-secondary">${i}</a></li>`
        }
        li.classList.add("nav-item");
        Pagination.appendChild(li);
    }
    //page number bar change
    var pageNumberLink = document.getElementsByClassName("pageNumber");
    for (i = 0; i < pageNumberLink.length; i++) {
        pageNumberLink[i].addEventListener('click', event => {
            for (l of pageNumberLink) {
                l.classList.remove("active");
            }
            event.target.classList.add("active");
            currentPageNumber = event.target.innerHTML;
            uploadPost(storage);
        })
    }
}
autoPagination(storage);

//upload post from storage
function uploadPost(storage) {
    var list = document.getElementById("post-wrapper");
    var countPost = 0;
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (i = (currentPageNumber - 1) * limitPostEachPage; i < storage.length; i++) {
        if (countPost >= limitPostEachPage) {
            break;
        }
        var li = document.createElement('li');
        li.innerHTML = `<div class="card mb-7 rounded-4 border-0 shadow">
                            <img class="card-img-top rounded-4" src=${storage[i].img} alt="Card image">
                            <div class="card-body px-5">
                                <div class="card-info my-4 d-flex flex-row align-items-center">
                                    <div onclick="filterCat('${storage[i].cat}')">
                                        <a href="#" class="category text-decoration-none text-black bg-warning-subtle rounded-4 me-2 px-3 py-2">${storage[i].cat}</a>
                                    </div>
                                    <div onclick="filterAuthor('${storage[i].author}')" class="m-0 me-2 p-0">
                                        <a href="#" class="author text-decoration-none text-secondary">
                                        <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                                        ${storage[i].author}
                                        </a>
                                    </div>
                                    <a href="#" class="time text-decoration-none text-secondary">
                                        <span class="me-2"><i class="fas fa-calendar-alt fa-solid text-primary"></i></span>
                                        ${storage[i].time}
                                    </a>
                                </div class="m-0 p-0">
                                    <div value="${storage[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="card-title text-decoration-none fs-3 fw-bold" >${storage[i].title}</a>
                                    </div>
                                    <p class="card-text text-secondary mt-4 mb-5">${storage[i].content.substring(0, limitPostContent) + '[...]'}</p>
                                    <div value="${storage[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="btnReadmore btn btn-primary">
                                            <span class="readmore me-2 text-uppercase fw-bold">Read more</span>
                                            <span><i class="fas fa-play-circle fa-solid text-black"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>`
        list.appendChild(li);
        countPost++;
    }
}
//upload post first time visit page
uploadPost(storage);
if (localStorage.getItem("filterCatSinglePost") != null) {
    filterCat(localStorage.getItem("filterCatSinglePost"));
    localStorage.removeItem("filterCatSinglePost");
}
if (localStorage.getItem("filterAuthorSinglePost") != null) {
    filterAuthor(localStorage.getItem("filterAuthorSinglePost"));
    localStorage.removeItem("filterAuthorSinglePost");
}
if (localStorage.getItem("filterTagSinglePost") != null) {
    filterTag(localStorage.getItem("filterTagSinglePost"));
    localStorage.removeItem("filterTagSinglePost");
}
//count post by cate
function catCount(cat, catCountId) {
    var count = 0;
    for (var i = 0; i < storage.length; i++) {
        if (storage[i].cat == cat) count++;
    }
    document.getElementById(catCountId).innerText = `(${count})`;
}
catCount("Company News", "cat-count1");
catCount("Electronics", "cat-count2");
catCount("Lifestyle", "cat-count3");
catCount("Social Media", "cat-count4");
catCount("Tips & Tricks", "cat-count5");
//recent post on widget
var numberRecentPost = parseInt(localStorage.getItem("soLuongPost")) > 3 ? 3 : parseInt(localStorage.getItem("soLuongPost"));
for (var i = 0; i < numberRecentPost; i++) {
    var list = document.getElementById("recents_post-list");
    var li = document.createElement("li");
    var post = JSON.parse(localStorage.getItem(i));
    li.innerHTML =
        `<a href="blog-detail.html" class="d-flex flex-row align-items-center">
        <img src=${post.img} alt="">
        <div>
            <span class="recents_post-title">${post.title}</span>
        </div>
    </a>`
    li.classList.add("recents_post-item");
    li.value = i;
    list.appendChild(li);
}
var recents_post = document.getElementsByClassName("recents_post-item");
for (var i = 0; i < recents_post.length; i++) {
    recents_post[i].addEventListener("click", event => {
        getSelectedPost(event);
    })
}
//get and load selected post to SinglePost.html
function getSelectedPost(event) {
    localStorage.setItem("selectedPost", event.currentTarget.getAttribute("value"));
}
//filter by categories
function filterCat(cat) {
    var list = document.getElementById("post-wrapper");
    var countPost = 0;
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var filterResult = [];
    for (var i = 0; i < storage.length; i++) {
        if (storage[i].cat == cat) filterResult.push(storage[i]);
    }
    for (i = (currentPageNumber - 1) * limitPostEachPage; i < filterResult.length; i++) {
        if (countPost >= limitPostEachPage) {
            break;
        }
        var li = document.createElement('li');
        li.innerHTML = `<div class="card mb-7 rounded-4 border-0 shadow">
                            <img class="card-img-top rounded-4" src=${filterResult[i].img} alt="Card image">
                            <div class="card-body px-5">
                                <div class="card-info my-4">
                                    <a href="#" class="category text-decoration-none text-black bg-warning-subtle rounded-4 px-3 py-2">${filterResult[i].cat}</a>
                                    <a href="#" class="author text-decoration-none text-secondary">
                                       <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                                       ${filterResult[i].author}
                                    </a>
                                    <a href="#" class="time text-decoration-none text-secondary">
                                        <span class="me-2"><i class="fas fa-calendar-alt fa-solid text-primary"></i></span>
                                        ${filterResult[i].time}
                                    </a>
                                </div class="m-0 p-0">
                                    <div value="${filterResult[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="card-title text-decoration-none fs-3 fw-bold" >${filterResult[i].title}</a>
                                    </div>
                                    <p class="card-text text-secondary mt-4 mb-5">${filterResult[i].content.substring(0, limitPostContent)}</p>
                                    <div value="${filterResult[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="btnReadmore btn btn-primary">
                                            <span class="readmore me-2 text-uppercase fw-bold">Read more</span>
                                            <span><i class="fas fa-play-circle fa-solid text-black"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>`
        list.appendChild(li);
        countPost++;
    }
    autoPagination(filterResult);
}
//filter by author
function filterAuthor(author) {
    var list = document.getElementById("post-wrapper");
    var countPost = 0;
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var filterResult = [];
    for (var i = 0; i < storage.length; i++) {
        if (storage[i].author == author) filterResult.push(storage[i]);
    }
    for (i = (currentPageNumber - 1) * limitPostEachPage; i < filterResult.length; i++) {
        if (countPost >= limitPostEachPage) {
            break;
        }
        var li = document.createElement('li');
        li.innerHTML = `<div class="card mb-7 rounded-4 border-0 shadow">
                            <img class="card-img-top rounded-4" src=${filterResult[i].img} alt="Card image">
                            <div class="card-body px-5">
                                <div class="card-info my-4">
                                    <a href="#" class="category text-decoration-none text-black bg-warning-subtle rounded-4 px-3 py-2">${filterResult[i].cat}</a>
                                    <a href="#" class="author text-decoration-none text-secondary">
                                       <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                                       ${filterResult[i].author}
                                    </a>
                                    <a href="#" class="time text-decoration-none text-secondary">
                                        <span class="me-2"><i class="fas fa-calendar-alt fa-solid text-primary"></i></span>
                                        ${filterResult[i].time}
                                    </a>
                                </div class="m-0 p-0">
                                    <div value="${filterResult[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="card-title text-decoration-none fs-3 fw-bold" >${filterResult[i].title}</a>
                                    </div>
                                    <p class="card-text text-secondary mt-4 mb-5">${filterResult[i].content.substring(0, limitPostContent)}</p>
                                    <div value="${filterResult[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="btnReadmore btn btn-primary">
                                            <span class="readmore me-2 text-uppercase fw-bold">Read more</span>
                                            <span><i class="fas fa-play-circle fa-solid text-black"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>`
        list.appendChild(li);
        countPost++;
    }
    autoPagination(filterResult);
}
//filter by tag
function filterTag(tag) {
    var list = document.getElementById("post-wrapper");
    var countPost = 0;
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    var filterResult = [];
    for (var i = 0; i < storage.length; i++) {
        if (storage[i].tags.find((tagName) => { return tagName == tag })) filterResult.push(storage[i]);
    }
    for (i = (currentPageNumber - 1) * limitPostEachPage; i < filterResult.length; i++) {
        if (countPost >= limitPostEachPage) {
            break;
        }
        var li = document.createElement('li');
        li.innerHTML = `<div class="card mb-7 rounded-4 border-0 shadow">
                            <img class="card-img-top rounded-4" src=${filterResult[i].img} alt="Card image">
                            <div class="card-body px-5">
                                <div class="card-info my-4">
                                    <a href="#" class="category text-decoration-none text-black bg-warning-subtle rounded-4 px-3 py-2">${filterResult[i].cat}</a>
                                    <a href="#" class="author text-decoration-none text-secondary">
                                       <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                                       ${filterResult[i].author}
                                    </a>
                                    <a href="#" class="time text-decoration-none text-secondary">
                                        <span class="me-2"><i class="fas fa-calendar-alt fa-solid text-primary"></i></span>
                                        ${filterResult[i].time}
                                    </a>
                                </div class="m-0 p-0">
                                    <div value="${filterResult[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="card-title text-decoration-none fs-3 fw-bold" >${filterResult[i].title}</a>
                                    </div>
                                    <p class="card-text text-secondary mt-4 mb-5">${filterResult[i].content.substring(0, limitPostContent)}</p>
                                    <div value="${filterResult[i].value}" onclick="getSelectedPost()">
                                        <a href="blog-detail.html" class="btnReadmore btn btn-primary">
                                            <span class="readmore me-2 text-uppercase fw-bold">Read more</span>
                                            <span><i class="fas fa-play-circle fa-solid text-black"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>`
        list.appendChild(li);
        countPost++;
    }
    autoPagination(filterResult);
}