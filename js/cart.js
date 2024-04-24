function showCartOnTable() {
    let ListCodeSP = JSON.parse(localStorage.getItem("ListCodeSP")) || []
    let ListCart = JSON.parse(localStorage.getItem("ListCart")) || []
    let ListQtyCart = JSON.parse(localStorage.getItem("ListQtyCart")) || [];

    getTotalPriceInCart = function () {
        return dataCart
            .map((item) => {
                temp = parseInt(ListQtyCart[ListCart.indexOf(item.code)]);
                return (item.price * (100 - item.discount) * temp) / 100;
            })
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            .toFixed(2);
    }

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
                <tr data-codeSPCommon=${item.code}>
                    <td>
                        <a class="d-flex align-items-center gap-3 text-decoration-none cursor-pointer product-link">
                            <img style="max-width: 100px;" src="${item.imgUrl}" alt="">
                            <p class="mb-0">${item.name}</p>
                        </a>
                    </td>
                    <td>
                        <p class="mb-0">$${((item.price * (100 - item.discount)) / 100).toFixed(2)}</p>
                    </td>
                    <td>
                        <input style="max-width: 100px" class="quantity form-control" type="number" value="${ListQtyCart[ListCart.indexOf(item.code)]}" min=1 max=100    >
                    </td>
                    <td>
                        <p class="mb-0">$${(((item.price * (100 - item.discount)) / 100) * ListQtyCart[ListCart.indexOf(item.code)]).toFixed(2)}</p>
                    </td>
                    <td>
                        <div class="text-danger cursor-pointer remove-button text-end">Remove</div>
                    </td>
                </tr>
            `
    });
    const shoppingCartBody = document.querySelector(".shopping-cart-body")
    if (storageCartValue.length == 0) {
        shoppingCartBody.innerHTML = `<tr><td colspan="5">No products in the cart<td></tr>`;
        document.querySelector(".subtotal-container").innerHTML = ""
    } else {
        shoppingCartBody.innerHTML = cartShowContent.join("")
        document.querySelector(".subtotal-container").innerHTML = `
            <div class="d-flex justify-content-end mb-3">
                <div class="row">
                    <div class="col-md-4 d-flex align-items-center">
                        <p class="mb-0 fs-5">Subtotal: </p>
                    </div>
                    <div class="col-md-8">
                        <p class="mb-0 fs-1 text-primary ps-2">$${getTotalPriceInCart()}</p>
                    </div>
                </div>
            </div>
        `
        document.querySelectorAll(".product-link").forEach(link => {
            link.addEventListener("click", e => {
                localStorage.setItem("ItemDetailSelected", JSON.stringify(e.currentTarget.parentNode.parentNode.getAttribute("data-codeSPCommon")))
                window.location.href = "shop-details.html"
            })
        })
        document.querySelectorAll(".quantity").forEach(quantity => {
            quantity.addEventListener("change", e => {
                if (e.currentTarget.value == 0) {
                    e.currentTarget.value = 1
                }
                if (e.currentTarget.value > 100) {
                    e.currentTarget.value = 100
                }
                // change the quantity in the shopping cart
                ListQtyCart[ListCart.indexOf(e.currentTarget.parentNode.parentNode.getAttribute("data-codeSPCommon"))] = e.currentTarget.value
                localStorage.setItem("ListQtyCart", JSON.stringify(ListQtyCart))
                // change linetotal and subtotal
                showCartOnTable()
            })
        })
    }

    if (storageCartValue.length === 0) {
        document.querySelector(".action-button-container").innerHTML = `
            <div class="d-flex justify-content-center">
                <a href="shop.html" class="btn btn-primary px-7 py-3 fs-6 rounded-10 return-to-shop fw-semibold">
                    Rerturn to shop
                    <span class="fa-stack sm-text ms-1" style="margin-bottom: 2px;">
                        <i class="fas fa-circle fa-stack-2x text-black"></i>
                        <i class="fas fa-play fa-stack-1x text-primary"></i>
                    </span>
                </a>
            </div>
        `
    } else {
        // Create a button element
        const checkoutButton = document.createElement("button");
        checkoutButton.className = "btn btn-primary px-8 py-3 fs-6 rounded-10 checkout fw-semibold";
        checkoutButton.innerHTML = `
            Checkout
            <span class="fa-stack sm-text ms-1" style="margin-bottom: 2px;">
                <i class="fas fa-circle fa-stack-2x text-black"></i>
                <i class="fas fa-play fa-stack-1x text-primary"></i>
            </span>
        `
        // Add event listener to the button
        checkoutButton.addEventListener("click", e => {
            document.body.style.cursor = "wait"
            checkoutButton.style.cursor = "wait"
            setTimeout(() => {
                localStorage.setItem("ListCart", JSON.stringify([]));
                localStorage.setItem("ListQtyCart", JSON.stringify([]));
                window.location.href = "shop.html";
                localStorage.setItem("flash", JSON.stringify({ type: "success", message: "You have successfully checked out" }));
                document.body.style.cursor = "default"
                checkoutButton.style.cursor = "default"
            }, 3000);
        });
        // Append the button to the container
        document.querySelector(".action-button-container").innerHTML = ""
        const checkoutContainer = document.createElement("div")
        checkoutContainer.className = "d-flex justify-content-end"
        checkoutContainer.appendChild(checkoutButton)
        document.querySelector(".action-button-container").appendChild(checkoutContainer);
    }

    document.querySelectorAll(".remove-button").forEach((item) =>
        item.addEventListener("click", function (e) {
            // remove it from the cart in the local storage
            let codeRemove = e.currentTarget.parentNode.parentNode.getAttribute("data-codeSPCommon");
            const temp = JSON.parse(localStorage.getItem("ListCart")); temp.splice(temp.indexOf(codeRemove), 1); localStorage.setItem("ListCart", JSON.stringify(temp));

            // show number of products on the cart count
            document.querySelector(".cart-count").textContent = temp.length;

            // set the number of products inside the cart in the localstorage 
            storageQtyCartValue.splice(storageCartValue.indexOf(codeRemove), 1);
            localStorage.setItem(storageQtyCart, JSON.stringify(storageQtyCartValue));
            listCodeCart = localStorage.getItem(storageCart);
            storageCartValue = JSON.parse(listCodeCart) || [];

            // update the table
            showCartOnTable()
        })
    );
}
showCartOnTable();