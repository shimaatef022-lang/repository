// ================= CART =================

let cart = [];


// ================= ADD PRODUCT =================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " added to cart!");
}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalElement = document.getElementById("total");

    // لو الصفحة مش فيها Cart
    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <span>
                ${item.name} - ${item.price} EGP
            </span>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });


    if (cartCount) {
        cartCount.textContent = cart.length;
    }


    if (totalElement) {
        totalElement.textContent = total;
    }
}


// ================= REMOVE PRODUCT =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ================= OPEN CART =================

function openCart() {

    document.getElementById("cart").style.display = "flex";
}


// ================= CLOSE CART =================

function closeCart() {

    document.getElementById("cart").style.display = "none";
}


// ================= GO TO CHECKOUT =================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // حفظ المنتجات

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // فتح صفحة Checkout

    window.location.href = "checkout.html";
}



// ==================================================
// ================= CHECKOUT PAGE ==================
// ==================================================

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutForm =
    document.getElementById("checkout-form");


if (checkoutItems && checkoutTotal) {

    const savedCart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let total = 0;


    checkoutItems.innerHTML = "";


    savedCart.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `
            <span>
                ${item.name}
            </span>

            <span>
                ${item.price} EGP
            </span>
        `;


        checkoutItems.appendChild(div);


        total += item.price;
    });


    checkoutTotal.textContent = total;
}



// ==================================================
// ================= CONFIRM ORDER =================
// ==================================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Customer Name

            const customerName =
                document
                .getElementById("customer-name")
                .value
                .trim();


            // Phone

            const phone =
                document
                .getElementById("phone")
                .value
                .trim();


            // Location

            const location =
                document
                .getElementById("location")
                .value
                .trim();


            // Check fields

            if (
                customerName === "" ||
                phone === "" ||
                location === ""
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            // Get cart

            const savedCart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];


            if (savedCart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;
            }


            // Create WhatsApp message

            let message =
                "Hello Cairo Bites!\n\n";


            message +=
                "NEW ORDER\n\n";


            message +=
                "Customer Name: " +
                customerName +
                "\n";


            message +=
                "Mobile Number: " +
                phone +
                "\n";


            message +=
                "Location: " +
                location +
                "\n\n";


            message +=
                "ORDER DETAILS:\n";


            let total = 0;


            savedCart.forEach(item => {

                message +=
                    "- " +
                    item.name +
                    ": " +
                    item.price +
                    " EGP\n";


                total += item.price;
            });


            message +=
                "\nTotal: " +
                total +
                " EGP";


            // Restaurant WhatsApp

            const restaurantPhone =
                "201111537244";


            // Create WhatsApp URL

            const whatsappURL =
                "https://wa.me/" +
                restaurantPhone +
                "?text=" +
                encodeURIComponent(message);


            // Open WhatsApp

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );
}



// ==================================================
// ================= HERO SLIDER ====================
// ==================================================

const slider =
    document.querySelector(".hero-slider");

let slideIndex = 0;


if (slider) {

    setInterval(() => {

        slideIndex++;


        slider.style.transform =
            `translateX(-${slideIndex * 25}%)`;


        // الصورة الرابعة هي نسخة من الأولى

        if (slideIndex === 3) {

            setTimeout(() => {

                slider.style.transition =
                    "none";


                slideIndex = 0;


                slider.style.transform =
                    "translateX(0)";


                setTimeout(() => {

                    slider.style.transition =
                        "transform 1s ease";

                }, 100);

            }, 1000);

        }

    }, 3000);
}