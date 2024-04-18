document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scroll-effect");
    } else {
        navbar.classList.remove("navbar-scroll-effect");
    }
})
// Your code goes here
//storage
var soLuongPost = parseInt(localStorage.getItem("soLuongPost"));
var storage = [];
for (var i = 0; i < soLuongPost; i++) {
    storage[i] = (JSON.parse(localStorage.getItem(i)));
}
//load selected post
var selectedPost = JSON.parse(localStorage.getItem(localStorage.getItem("selectedPost")));
if (selectedPost == null) selectedPost = JSON.parse(localStorage.getItem("0"));
uploadPost();
function uploadPost() {
    var list = document.getElementById("post-wrapper");
    list.innerHTML =
        `<div class="card rounded-4 border-0">
<img class="card-img-top rounded-4" src=${selectedPost.img} alt="Card image">
<div class="card-body px-0">
    <div class="card-info my-4 d-flex flex-row align-items-center">
        <a href="#" class="category text-decoration-none text-black bg-warning-subtle rounded-4 me-2 px-3 py-2">${selectedPost.cat}</a>
        <div onclick="filterAuthor('${selectedPost.author}')" class="m-0 me-2 p-0">
                                <a href="BlogClassic.html" class="author text-decoration-none text-secondary">
                                    <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                                    ${selectedPost.author}
                                </a>
                            </div>
        <a href="#" class="time text-decoration-none text-secondary">
            <span class="me-2"><i class="fas fa-calendar-alt fa-solid text-primary"></i></span>
            ${selectedPost.time}
        </a>
    </div>
    <a href="#" class="card-title text-decoration-none fs-3 fw-bold" >${selectedPost.title}</a>
    <p class="card-text text-secondary mt-4 mb-5">${selectedPost.content}</p>
    <div class="tag">
        <span class="text-black">Tags:</span>
        <span class="text-secondary text-decoration-none">${selectedPost.tags}</span>
    </div>
</div>
<div class="card-footer border-top border-bottom d-flex py-4 bg-white" id="card-footer">
</div>    
</div>`
    var cardFooter = document.getElementById("card-footer");
    if (JSON.parse(localStorage.getItem("selectedPost")) == "0") {
        var prevPost = JSON.parse(localStorage.getItem(parseInt(localStorage.getItem("selectedPost")) + 1));
        cardFooter.innerHTML =
            `<div value="${parseInt(localStorage.getItem("selectedPost")) + 1}" class="col-6 p-0 m-0" onclick="getSelectedPost()">
    <a href="blog-detail.html" class="d-flex flex-row align-items-center p-0 m-0  text-decoration-none">
        <img src=${prevPost.img} alt="" width="60px" height="60px" class="object-fit-cover me-3">
        <div>
            <p class="text-secondary p-0 m-0">PREV</p>
            <p class="font-weight-3 p-0 m-0">${prevPost.title}</p>
        </div>
    </a>
</div>`;
    }
    else if (parseInt(JSON.parse(localStorage.getItem("selectedPost"))) == parseInt(JSON.parse(localStorage.getItem("soLuongPost")) - 1)) {
        var nextPost = JSON.parse(localStorage.getItem(parseInt(localStorage.getItem("selectedPost")) - 1));
        cardFooter.innerHTML =
            `<div value="${parseInt(localStorage.getItem("selectedPost")) - 1}" class="col-12 p-0- m-0 d-flex justify-content-end" onclick="getSelectedPost()">
    <a href="blog-detail.html" class="d-flex flex-row align-items-center p-0 m-0  text-decoration-none">
        <div>
            <p class="text-secondary p-0 m-0 text-end">NEXT</p>
            <p class="font-weight-3 p-0 m-0">${nextPost.title}</p>
        </div>
        <img src=${nextPost.img} alt="" width="60px" height="60px" class="object-fit-cover ms-3">
    </a>
</div>`;
    }
    else {
        var prevPost = JSON.parse(localStorage.getItem(parseInt(localStorage.getItem("selectedPost")) + 1));
        var nextPost = JSON.parse(localStorage.getItem(parseInt(localStorage.getItem("selectedPost")) - 1));
        cardFooter.innerHTML =
            `<div value="${parseInt(localStorage.getItem("selectedPost")) + 1}" class="col-6 p-0 m-0" onclick="getSelectedPost()">
    <a href="blog-detail.html" class="d-flex flex-row p-0 m-0 pe-2 text-decoration-none">
        <img src=${prevPost.img} alt="" width="60px" height="60px" class="object-fit-cover me-3">
        <div>
            <p class="text-secondary p-0 m-0">PREV</p>
            <p class="font-weight-3 p-0 m-0">${prevPost.title}</p>
        </div>
    </a>
</div>
<div value="${parseInt(localStorage.getItem("selectedPost")) - 1}" class="col-6 p-0- m-0 d-flex justify-content-end" onclick="getSelectedPost()">
    <a href="blog-detail.html" class="d-flex flex-row p-0 m-0 ps-2 text-decoration-none">
        <div>
            <p class="text-secondary p-0 m-0 text-end">NEXT</p>
            <p class="font-weight-3 p-0 m-0">${nextPost.title}</p>
        </div>
        <img src=${nextPost.img} alt="" width="60px" height="60px" class="object-fit-cover ms-3">
    </a>
</div>`;
    }
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
        `<a href="blog-detail.html">
<img src=${post.img} alt="">
<span class="recents_post-title">${post.title}</span>
</a>`
    li.classList.add("recents_post-item");
    li.value = i;
    list.appendChild(li);
}
var recents_post = document.getElementsByClassName("recents_post-item");
for (var i = 0; i < recents_post.length; i++) {
    recents_post[i].addEventListener("click", event => {
        getSelectedPost();
    })
}
function getSelectedPost() {
    localStorage.setItem("selectedPost", event.currentTarget.getAttribute("value"));
}
//filter
function filterCat(cat) {
    localStorage.setItem("filterCatSinglePost", cat);
}
function filterAuthor(author) {
    localStorage.setItem("filterAuthorSinglePost", author);
}
function filterTag(tag) {
    localStorage.setItem("filterTagSinglePost", tag);
}
//reply
function reply() {
    var respondList = document.getElementsByClassName("respond");
    for (i = 0; i < respondList.length; i++) {
        respondList[i].innerHTML = "";
        respondList[i].classList.remove("d-block");
        respondList[i].classList.add("d-none");
        if (event.currentTarget.value == respondList[i].getAttribute("value")) {
            respondList[i].classList.add("d-block");
            respondList[i].classList.remove("d-none");
            respondList[i].innerHTML =
                `
    <div>
        <p class="text-black fs-3 fw-bold m-0 d-inline-block">Reply</p>
        <button type="button" onclick="{this.parentNode.parentNode.classList.add('d-none');document.getElementById('post-comment').classList.remove('d-none');}" class="float-end rounded-circle"><i class="fa fa-close" aria-hidden="true"></i></button>
    </div>
    <p class="text-secondary">Your email address will not be published. Required fields are marked<span class="text-danger">*</span></p>
    <form action="" class="px-3">
        <div class="row">
            <div class="col-4">
                <input type="text" class="form-control rounded-5 p-3 ps-4 bg-secondary-subtle" placeholder="Your Name *" required>
            </div>
            <div class="col-4">
                <input type="text" class="form-control rounded-5 p-3 ps-4 bg-secondary-subtle" placeholder="Email Address *" required>
            </div>
            <div class="col-4">
                <input type="text" class="form-control rounded-5 p-3 ps-4 bg-secondary-subtle" placeholder="Your Website">
            </div> 
        </div> 
        <div class="row mt-4">
            <div class="col">
                <textarea name="" id="" class="form-control rounded-5 p-3 ps-4 bg-secondary-subtle" rows="5" placeholder="Comment"></textarea>
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <input type="checkbox" class="me-2"><span class="text-secondary">Save my name, email, and website in this browser for the next time I comment.</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="reset" class="btn btn-warning fw-bold py-3">POST COMMENT<i class="fa fa-play-circle ms-2" aria-hidden="true"></i></button>
            </div>
        </div>
    </form>`;
        }
    }
    document.getElementById("post-comment").classList.add("d-none");
}
function closeRespond() {
}