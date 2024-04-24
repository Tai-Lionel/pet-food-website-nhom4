var storageFavorite = "ListCodeSP";
let listCodeFavorite = localStorage.getItem(storageFavorite);
let storageFavoriteValue = JSON.parse(listCodeFavorite) || [];

var storageCart = "ListCart";
let listCodeCart = localStorage.getItem(storageCart);
let storageCartValue = JSON.parse(listCodeCart) || [];

var storageQtyCart = "ListQtyCart";
let listCodeQtyCart = localStorage.getItem(storageQtyCart);
let storageQtyCartValue = JSON.parse(listCodeQtyCart) || [];

const dataProductAll = productList;

// favorite
// event listener of hearts
function assignHeartEvent() {
    const hearts = document.querySelectorAll(".fa-heart");
    hearts.forEach((item) => {
        item.addEventListener("click", function (e) {
            e.target.classList.toggle("heart-selected");
            const codeSP = e.target.getAttribute("data-codeProduct");
            if (e.target.classList.contains("heart-selected")) {
                storageFavoriteValue.push(codeSP);
                localStorage.setItem(
                    storageFavorite,
                    JSON.stringify(storageFavoriteValue)
                );
            } else {
                storageFavoriteValue.splice(storageFavoriteValue.indexOf(codeSP), 1);
                localStorage.setItem(storageFavorite, JSON.stringify(storageFavoriteValue));
            }
        });
    });
}
function cartCount() {
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = storageCartValue.length;
}
cartCount();

// event listener of "add to cart"
let quantityOfCurrentProduct = document.createElement("span");
function assignCartEvent() {
    const carts = document.querySelectorAll(".cart-in-product");
    carts.forEach((item) => {
        item.addEventListener("click", function (e) {
            e.currentTarget.classList.toggle("cart-selected");
            const codeSP = e.currentTarget.getAttribute("data-codeProduct");
            quantityOfCurrentProduct.setAttribute("data-CodeSP", `${codeSP}`);
            quantityOfCurrentProduct.textContent = `${e.target.previousElementSibling?.tagName.toLowerCase() ===
                "input"
                ? e.target.previousElementSibling.value
                : 1
                }`;
            const qtyStorage = quantityOfCurrentProduct.textContent;
            if (e.currentTarget.classList.contains("cart-selected")) {
                storageCartValue.push(codeSP);
                storageQtyCartValue.push(qtyStorage);
                localStorage.setItem(
                    storageCart,
                    JSON.stringify(storageCartValue)
                );
                localStorage.setItem(
                    storageQtyCart,
                    JSON.stringify(storageQtyCartValue)
                );
                flash("success", `Added to cart <a class="view-cart link-primary fw-bold cursor-pointer ms-2">View Cart</a>`)
                document.querySelector(".view-cart").addEventListener("click", () => {
                    renderCart()
                    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('shoppingCartOffcanvas'))
                    bsOffcanvas.show()
                })
            } else {
                storageCartValue.splice(storageCartValue.indexOf(codeSP), 1);
                localStorage.setItem(
                    storageCart,
                    JSON.stringify(storageCartValue)
                );
                storageQtyCartValue.splice(storageCartValue.indexOf(codeSP), 1);
                localStorage.setItem(
                    storageQtyCart,
                    JSON.stringify(storageQtyCartValue)
                );
                flash("success", `Removed from cart <a class="view-cart fw-bold cursor-pointer ms-2">View Cart</a>`)
                document.querySelector(".view-cart").addEventListener("click", () => {
                    renderCart()
                    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('shoppingCartOffcanvas'))
                    bsOffcanvas.show()
                })
            }
            cartCount();
        });
    });
}

//cart show body
const cartShow = document.querySelectorAll(".cart-show");
const cartShowBody = document.querySelector(".cart-show-body");
let dataCart = dataProductAll.filter(function (item) {
    return storageCartValue.includes(item.code);
});
function getTotalPriceInCart() {
    return dataCart
        .map((item) => {
            temp = parseInt(
                storageQtyCartValue[storageCartValue.indexOf(item.code)]
            );
            return (item.price * (100 - item.discount) * temp) / 100;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toFixed(2);
}
function renderCart() {
    dataCart = dataProductAll.filter(function (item) {
        return storageCartValue.includes(item.code);
    });
    const cartShowContent = dataCart.map((item, index) => {
        let discount = false;
        if (item.discount > 0) {
            discount = true;
        } else {
            discount = false;
        }
        return `
                <div class=" d-flex align-items-center cart-show-fix mb-4 gap-4" style="position:relative" data-codeSPCommon=${item.code}>
                    <div class="">
                        <img class="border border-grey border-1 rounded-3" src=${item.imgUrl} style="max-width:90px" alt=${item.name}/>
                    </div>
                    <div class=" d-flex flex-column gap-2 align-items-start">
                        <a class="list-products__item__name" style="display: block; font-size: 16px; line-height: 1.3;">
                            ${item.name}
                        </a>
                        <div class="product__group-prices">
                            <p class="w-100 m-0 ${discount ? " real__price" : "normal__price"}">$${item.price.toFixed(2)}</p>
                            <p class="w-100 m-0 sale__price ${discount ? "" : " d-none"}">$${((item.price * (100 - item.discount)) / 100).toFixed(2)}</p>
                        </div>
                        <div class="lg-text">Quantity: ${storageQtyCartValue[storageCartValue.indexOf(item.code)]}</div>
                    </div>
                    <div class="cart-remove"
                        style="cursor:pointer;position:absolute;color:gray;z-index:99;top:0;right:0;height:20px;width:20px"><svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>                
               `;
    });
    if (storageCartValue.length == 0) {
        cartShowBody.innerHTML = `<div> No products in the cart</div>`;
        if (document.querySelector(".offcanvas-body").children[1]) {
            document.querySelector(".offcanvas-body").removeChild(document.querySelector(".offcanvas-body").children[1])
        }
    } else {
        cartShowBody.innerHTML = cartShowContent.join("");
        const cartTotalPrice = document.createElement("div")
        cartTotalPrice.className = "w-100 d-flex flex-column car-total-price gap-3 py-3 border-top border-grey"
        cartTotalPrice.innerHTML = `
            <div class="total text-black d-flex justify-content-between gap-2">Subtotal : <span class="total-price text-primary">$${getTotalPriceInCart()}</span></div>
            <button class="btn btn-primary rounded-5 text-uppercase fw-bold py-3 checkout">
                Checkout
                <span class="fa-stack sm-text ms-1" style="margin-bottom: 2px;">
                    <i class="fas fa-circle fa-stack-2x text-black"></i>
                    <i class="fas fa-play fa-stack-1x text-primary"></i>
                </span>
            </button>
        `
        if (document.querySelector(".offcanvas-body").children[1]) {
            document.querySelector(".offcanvas-body").removeChild(document.querySelector(".offcanvas-body").children[1])
        }

        document.querySelector(".offcanvas-body").appendChild(cartTotalPrice)
        document.querySelector(".checkout").addEventListener("click", e => {
            window.location.href = "cart.html"
        })
    }
    assignRemoveCart();
}
renderCart();
const totalPrice = document.querySelector(".total-price");
let textNoProducts = document.querySelector(".text-no-products");
function assignRemoveCart() {
    const removeCarts = document.querySelectorAll(".cart-remove");

    removeCarts.forEach((item) =>
        item.addEventListener("click", function (e) {
            console.log(
                e.currentTarget.parentNode.getAttribute("data-codeSPCommon")
            );
            let codeRemove =
                e.currentTarget.parentNode.getAttribute("data-codeSPCommon");
            const temp = JSON.parse(localStorage.getItem("ListCart"));
            temp.splice(temp.indexOf(codeRemove), 1);
            localStorage.setItem("ListCart", JSON.stringify(temp));
            const cartItems = document.querySelectorAll(".cart-show-fix");
            let cartRemove;
            cartItems.forEach((item) => {
                if (item.getAttribute("data-codespcommon") == codeRemove) {
                    cartRemove = item;
                }
            });
            item.parentNode.removeChild(item);
            document.querySelector(".cart-count").textContent = temp.length;
            storageQtyCartValue.splice(storageCartValue.indexOf(codeRemove), 1);
            localStorage.setItem(
                storageQtyCart,
                JSON.stringify(storageQtyCartValue)
            );
            listCodeCart = localStorage.getItem(storageCart);
            storageCartValue = JSON.parse(listCodeCart) || [];
            dataCart = dataProductAll.filter(function (item) {
                return storageCartValue.includes(item.code);
            });
            const cartInProducts =
                document.querySelectorAll(".cart-in-product");
            cartInProducts.forEach((item) => {
                if (item.getAttribute("data-codeProduct") == codeRemove) {
                    item.classList.remove("cart-selected");
                }
            });
            cartInProducts.forEach((item) => {
                if (item.getAttribute("data-codeproduct") == codeRemove) {
                    item.classList.remove("cart-selected");
                }
            });

            renderCart();
        })
    );
}

cartShow.forEach((item) =>
    item.addEventListener("click", function (e) {
        listCodeCart = localStorage.getItem(storageCart);
        storageCartValue = JSON.parse(listCodeCart) || [];
        renderCart();
    })
);
function assignDetails() {
    document.querySelectorAll(".product-details-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            localStorage.setItem(
                "ItemDetailSelected",
                JSON.stringify(e.target.dataset.productlink)
            );
        });
    });
}
