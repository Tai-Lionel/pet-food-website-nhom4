// feature products
const featuredProducts = productList.slice(0, 4)
const featuredProductsHTML = featuredProducts.map(product => `
    <div class="col-md-3">
        <div class="product-block">
            <div class="card border-0 rounded-0 text-decoration-none">
                <div class="mb-3 product-image-container">
                    <img src="${product.imgUrl}" alt="" class="card-img border-0 rounded-0">
                    <div class="group-action position-absolute" style="z-index: 1;">
                        <div class="shop-action">
                            <span class="product-detail-button fa-stack" data-bs-toggle="tooltip"
                                data-bs-title="Quick view">
                                <i class="fas fa-circle fa-stack-2x text-white"></i>
                                <a href="shop-details.html" class="fas fa-link fa-stack-1x text-black product-details-link text-decoration-none" data-productLink="${product.code}"></a>
                            </span>
                            <span class="wish-list-button fa-stack" data-bs-toggle="tooltip"
                                data-bs-title="Browse wishlist">
                                <i class="fas fa-circle fa-stack-2x text-white"></i>
                                <i class="fas fa-heart fa-stack-1x text-black ${(storageFavoriteValue || []).includes(product.code) ? " heart-selected" : ""}" data-codeProduct=${product.code}></i>
                            </span>
                            <span class="wish-list-button fa-stack" data-bs-toggle="tooltip"
                                data-bs-title="Compare">
                                <i class="fas fa-circle fa-stack-2x text-white"></i>
                                <i class="fas fa-refresh fa-stack-1x text-black"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3 text-black">
                        <p class="text-center">${product.name}</p>
                    </div>
                    <div class="d-flex gap-1 align-items-center justify-content-center">
                        <p class="fw-bold text-black">$${product.price}</p>
                    </div>
                </div>
            </div>
            <div class="add-to-cart position-absolute">
                <button
                    class="btn btn-primary text-uppercase fw-bold px-4 py-3 d-flex gap-2 align-items-center cart-in-product ${(storageCartValue || []).includes(product.code) ? " cart-selected" : ""}"  data-codeProduct=${product.code} >
                    <span>Add to cart</span>
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    </div>
`)
featuredProductsHTML.forEach(product => {
    document.querySelector(".product-container").innerHTML += product
});
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
assignDetails()
assignCartEvent()
assignHeartEvent()

// recent blog posts
const recentBlogs = blogList.slice(4, 6)
const recentBlogsHTML = recentBlogs.map(blog => `
            <div class="col-md-6">
                <div class="card mb-7 rounded-4 border-0 shadow">
                    <div class="crop">
                        <img class="card-img-top rounded-4" src=${blog.img} alt="Card image">
                    </div>
                    <div class="card-body px-5">
                        <div class="card-info my-4 d-flex flex-row align-items-center">
                            <div onclick="filterCat('${blog.cat}')">
                                <a href="#"
                                    class="category text-decoration-none text-black bg-warning-subtle rounded-4 me-2 px-3 py-2">${blog.cat}</a>
                            </div>
                            <div onclick="filterAuthor('${blog.author}')" class="m-0 me-2 p-0">
                                <a href="#" class="author text-decoration-none text-secondary">
                                    <span class="me-2"><i class="fa-solid fa-user text-primary"></i></span>
                                    ${blog.author}
                                </a>
                            </div>
                            <a href="#" class="time text-decoration-none text-secondary">
                                <span class="me-2"><i class="fas fa-calendar-alt fa-solid text-primary"></i></span>
                                ${blog.time}
                            </a>
                        </div class="m-0 p-0">
                        <div value="${blog.value}" onclick="getSelectedPost()">
                            <a href="blog-detail.html" class="card-title text-decoration-none fs-3 fw-bold">${blog.title}</a>
                        </div>
                        <p class="card-text text-secondary mt-4 mb-5">${blog.content.substring(0, 200) + '[...]'}</p>
                        <div value="${blog.value}" onclick="getSelectedPost()">
                            <a href="blog-detail.html" class="btnReadmore btn btn-primary">
                                <span class="readmore me-2 text-uppercase fw-bold">Read more</span>
                                <span><i class="fas fa-play-circle fa-solid text-black"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>        
        `)
recentBlogsHTML.forEach(blog => {
    document.querySelector(".blog-container").innerHTML += blog
})
function getSelectedPost(event) {
    localStorage.setItem("selectedPost", event.currentTarget.getAttribute("value"));
}

// register successfully flash
const flashDict = JSON.parse(localStorage.getItem("flash"))
if (flashDict) {
    flash(flashDict.type, flashDict.message)
    setTimeout(() => {
        localStorage.removeItem("flash")
    }, 6);
}

// back to top
const backToTopContainer = document.createElement("div")
backToTopContainer.innerHTML = `
    <span class="back-to-top fa-stack fa-2x cursor-pointer">
        <i class="fas fa-circle fa-stack-2x text-primary"></i>
        <i class="fa-sharp fa-solid fa-angle-up fa-stack-1x text-white"></i>
    </span>
`
document.body.appendChild(backToTopContainer)
document.querySelector(".back-to-top").addEventListener("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow")
})
document.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        document.querySelector(".back-to-top").style.opacity = 1
    } else {
        document.querySelector(".back-to-top").style.opacity = 0
    }
})

let interval = 3000
document.querySelectorAll(".num").forEach(num => {
    let startValue = 0
    let endValue = parseInt(num.getAttribute("data-value"))
    let duration = Math.floor(interval / endValue)
    let counter = setInterval(() => {
        startValue++
        num.textContent = startValue
        if (startValue == endValue) {
            clearInterval(counter)
        }
    }, duration);
})