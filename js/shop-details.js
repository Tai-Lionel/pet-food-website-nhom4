let ItemDetailSelected = "ItemDetailSelected";
let ItemDetailSelectedValue = JSON.parse(
    localStorage.getItem(ItemDetailSelected)
);
const productDetails = document.querySelector(".product-details");
let productDetailsHTML;
let productRelatedHTML;
for (let i = 0; i < dataProductAll.length; i++) {
    if (dataProductAll[i].code === ItemDetailSelectedValue) {
        const dataRelated = dataProductAll.filter(function (item1) {
            return (
                item1.categories.includes(
                    dataProductAll[i].categories[0]
                ) && item1.code !== dataProductAll[i].code
            );
        });

        productRelatedHTML = dataRelated.map((item, index) => {
            let discount = false;
            if (item.discount > 0) {
                discount = true;
            } else {
                discount = false;
            }
            if (index < 4)
                return `
                            <div class="products-item position-relative">
                                <span class="product-item-discount ${discount ? "" : " d-none"}">-${item.discount}%</span>
                                <img src=${item.imgUrl} alt=${item.name} class="product-item-img product-item-img-related" />
                                <p class="product-item-name">${item.name}</p>
                                <div class="product__group-prices">
                                    <p class=${discount ? "real__price" : "normal__price"}>$${item.price.toFixed(2)}</p>
                                    <p class="sale__price ${discount ? "" : " d-none"}">$${((item.price * (100 - item.discount)) / 100).toFixed(2)}</p>
                                </div>
                                <div class="product__actions d-flex flex-column align-items-center justify-content-between gap-2 position-absolute p-3 top-0 start-0 w-100 h-100"
                                    style="
                                    background-color: rgba(256, 256, 256, 0.5);z-index:-10;transform:translateY(80px);border:3px solid rgb(255, 174, 0);opacity:0;visibility:hidden;border-radius:30px">
                                    <div class="product__actions__group-1 d-flex gap-3 position-relative" style="z-index:999">
                                        <a href="./shop-details.html" class="fa-solid fa-link product-details-link" data-productLink=${item.code}></a>
                                        <i class="fa-regular fa-heart ${(storageFavoriteValue || []).includes(item.code) ? " heart-selected" : ""}" data-codeProduct=${item.code}></i>
                                        <i class="fa-solid fa-repeat"></i>
                                    </div>
                                    <div data-codeProduct=${item.code} class="product__actions__group-2 d-flex align-items-center cart-in-product ${(storageCartValue || []).includes(item.code) ? " cart-selected" : ""}" style="color: white;max-width:100%;
                                    background-color: rgb(255, 174, 0);padding:5px 10px; border-radius:30px">
                                        <span>ADD TO CART</span>
                                        <i class="fa-solid fa-cart-shopping text-black border-0 bg-transparent"></i>
                                    </div>
                                </div>
                            </div>
                        `;
        });

        productDetailsHTML = `
                    <div class="product-details__content d-flex">
                        <div class="product-details__content-left position-relative" style=" padding: 60px 100px">
                            <div class="direction position-absolute start-0 top-0 mt-3 ms-3">
                                <button class="direction-link direction-back"><a href="./shop.html"
                                        style="text-decoration:none;color:black!important">Shop -></a></button>
                                <button class="direction-link direction-link--active">Details</button>
                            </div>
                            <div class="product-details__content-left__img-wrapper"> <img src=${dataProductAll[i].imgUrl} alt="bala"
                                    class="product-details__content-left__img w-100 h-100 object-fix-cover border border-2 rounded" /></div>
                        </div>
                        <div class="product-details__content-right  d-flex flex-column justify-content-center "
                            style="width:800px;padding:25px;">
                            <h3 class="product-details__name pb-5">${dataProductAll[i].name}</h3>
                            <div class="product-details__desc pb-5" style="max-width:80%">${dataProductAll[i].desc}</div>

                            <div class="product-details__actions p-5 border rounded d-flex align-items-center gap-5" style="max-width: 90%;
                                ">
                                <input type="number" name="qty" id="qty" value="1" min=1 max=99
                                    style="width:100px;padding:10px;border-radius:5px" />
                                <i class="fa-solid fa-cart-shopping  cart-in-product ${(storageCartValue || []).includes(dataProductAll[i].code) ? " cart-selected" : ""}" data-codeProduct=${dataProductAll[i].code} style="cursor: pointer; padding: 15px; background-color: #fff; border: 1px solid rgb(192, 190, 190); border-radius: 50%;"></i>
                                <i style="cursor: pointer; padding: 15px; background-color: #fff; border: 1px solid rgb(192, 190, 190); border-radius: 50%;" class="fa-regular fa-heart  ${(storageFavoriteValue || []).includes(dataProductAll[i].code) ? " heart-selected" : ""}" data-codeProduct=${dataProductAll[i].code}></i>
                            </div>
                            <div class="product__group-prices p-5 mt-2">
                                <p class=${dataProductAll[i].discount > 0 ? "real__price real__price-details" : "normal__price normal__price-details"}>$${dataProductAll[i].price.toFixed(2)}</p>
                                <p class="sale__price sale__price-details ${dataProductAll[i].discount > 0 ? "" : " d-none"}">$${((dataProductAll[i].price * (100 - dataProductAll[i].discount)) / 100).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div class="product-details__related-products mt-5">
                        <h3 class="p-3">Related products</h3>
                        <div class="list-products__body list-products__body-table list-related mt-5 ">
                            ${productRelatedHTML.join("")}
                        </div>
                    </div>`;
    }
}
productDetails.innerHTML = productDetailsHTML;
assignCartEvent();
assignHeartEvent();
assignDetails();