
   // CHEETAH FASHION BOUTIQUE

const products = [
    {
        id: 1,
        name: "Royal Silk Saree",
        category: "Sarees",
        price: 2499,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Elegant Party Dress",
        category: "Dresses",
        price: 1899,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Traditional Ethnic Wear",
        category: "Kurtis",
        price: 1299,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Classic Men's Outfit",
        category: "Menswear",
        price: 1599,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Designer Saree",
        category: "Sarees",
        price: 2999,
        badge: "PREMIUM",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Modern Floral Dress",
        category: "Dresses",
        price: 1499,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Chic Ethnic Kurti",
        category: "Kurtis",
        price: 999,
        badge: "FAVOURITE",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Premium Men's Shirt",
        category: "Menswear",
        price: 1199,
        badge: "CLASSIC",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Classic Cotton Saree",
        category: "Sarees",
        price: 999,
        badge: "COTTON",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Designer Party Saree",
        category: "Sarees",
        price: 1899,
        badge: "DESIGNER",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Festive Silk Saree",
        category: "Sarees",
        price: 3499,
        badge: "FESTIVE",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
    }
];

// SAVE AND LOAD DATA

function readStorage(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

let cart = readStorage("CHEETAHCart");
let wishlist = readStorage("CHEETAHWishlist");

function saveData() {
    localStorage.setItem("CHEETAHCart", JSON.stringify(cart));
    localStorage.setItem("CHEETAHWishlist", JSON.stringify(wishlist));
}

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// DISPLAY PRODUCTS

function displayProducts() {
    const grid = document.getElementById("product-grid");
    const search = document.getElementById("search-input");
    const filter = document.getElementById("category-filter");
    const noProducts = document.getElementById("no-products");

    // Other pages may not contain the homepage product grid.
    if (!grid || !search || !filter || !noProducts) return;

    const searchText = search.value.toLowerCase().trim();
    const selectedCategory = filter.value;

    const filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    grid.innerHTML = "";
    noProducts.hidden = filtered.length > 0;

    filtered.forEach(product => {
        const favourite = wishlist.includes(product.id);
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">
                <span class="badge">${product.badge}</span>
                <button class="wishlist-btn ${favourite ? "active" : ""}"
                        data-wishlist="${product.id}"
                        aria-label="Add to wishlist">
                    ${favourite ? "♥" : "♡"}
                </button>
            </div>

            <div class="product-info">
                <p class="category">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="add-cart"
                        data-add-cart="${product.id}">
                    ADD TO BAG +
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// CART

function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    saveData();
    updateCartCount();

    alert(product.name + " added to your shopping bag!");
}

function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    if (!countElement) return;

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    countElement.textContent = count;
}

function updateCartItem(id, action) {
    const item = cart.find(product => product.id === id);
    if (!item) return;

    if (action === "increase") item.quantity++;

    if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    if (action === "remove") {
        cart = cart.filter(product => product.id !== id);
    }

    saveData();
    updateCartCount();
    showCart();
}

// WISHLIST

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    saveData();
    displayProducts();
}

// MODAL

function openModal(title, content) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalTitle || !modalBody) {
        alert("Please open the shopping page to use this feature.");
        return;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.hidden = true;

    document.body.style.overflow = "";
}

// SHOW CART

function showCart() {
    let total = 0;
    let content = "";

    if (cart.length === 0) {
        content = "<p>Your shopping bag is empty!</p>";
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;

            total += product.price * item.quantity;

            content += `
                <div class="cart-item">
                    <div>
                        <strong>${product.name}</strong>
                        <p>${formatPrice(product.price)} each</p>
                        <button data-cart-action="decrease"
                                data-id="${product.id}">−</button>
                        <span>${item.quantity}</span>
                        <button data-cart-action="increase"
                                data-id="${product.id}">+</button>
                    </div>
                    <button data-cart-action="remove"
                            data-id="${product.id}">Remove</button>
                </div>
            `;
        });

        content += `
            <p class="cart-total">Total: ${formatPrice(total)}</p>
            <button id="checkout-btn">PLACE DEMO ORDER</button>
            <p id="checkout-message"></p>
        `;
    }

    openModal("Your Shopping Bag", content);
}

// SHOW WISHLIST

function showWishlist() {
    let content = "";

    const favourites = products.filter(
        product => wishlist.includes(product.id)
    );

    if (favourites.length === 0) {
        content = "<p>Your wishlist is empty!</p>";
    } else {
        favourites.forEach(product => {
            content += `
                <div class="wishlist-item">
                    <strong>${product.name}</strong>
                    <p>${formatPrice(product.price)}</p>
                    <button data-wishlist-add="${product.id}">
                        Add to Bag
                    </button>
                    <button data-wishlist-remove="${product.id}">
                        Remove
                    </button>
                </div>
            `;
        });
    }

    openModal("Your Wishlist ♡", content);
}

// EVENT LISTENERS

document.addEventListener("click", function(event) {
    const target = event.target;

    const addButton = target.closest("[data-add-cart]");
    if (addButton) {
        addToCart(Number(addButton.dataset.addCart));
        return;
    }

    const wishlistButton = target.closest("[data-wishlist]");
    if (wishlistButton) {
        toggleWishlist(Number(wishlistButton.dataset.wishlist));
        return;
    }

    const cartAction = target.closest("[data-cart-action]");
    if (cartAction) {
        updateCartItem(
            Number(cartAction.dataset.id),
            cartAction.dataset.cartAction
        );
        return;
    }

    const wishlistAdd = target.closest("[data-wishlist-add]");
    if (wishlistAdd) {
        addToCart(Number(wishlistAdd.dataset.wishlistAdd));
        showWishlist();
        return;
    }

    const wishlistRemove = target.closest("[data-wishlist-remove]");
    if (wishlistRemove) {
        toggleWishlist(Number(wishlistRemove.dataset.wishlistRemove));
        showWishlist();
        return;
    }

    if (target.id === "checkout-btn") {
        const message = document.getElementById("checkout-message");

        if (message) {
            message.textContent =
                "Demo only! No real order or payment was made.";
        }
        return;
    }

    if (target.id === "modal") {
        closeModal();
    }
});

// SEARCH AND FILTER

const searchInput = document.getElementById("search-input");
if (searchInput) {
    searchInput.addEventListener("input", displayProducts);
}

const categoryFilter = document.getElementById("category-filter");
if (categoryFilter) {
    categoryFilter.addEventListener("change", displayProducts);
}

// CATEGORY CARDS

document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        const filter = document.getElementById("category-filter");

        if (filter) {
            filter.value = card.dataset.category;
            displayProducts();
        }
    });
});

// NEWSLETTER

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
        event.preventDefault();

        const message = document.getElementById("newsletter-message");
        const email = document.getElementById("newsletter-email");

        if (message) {
            message.textContent =
                "Thank you for joining CHEETAH!";
        }

        if (email) email.value = "";
    });
}

// KEYBOARD

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
});

// SEARCH SHORTCUT

function focusSearch() {
    const search = document.getElementById("search-input");
    const section = document.getElementById("products");

    if (search) search.focus();
    if (section) section.scrollIntoView({ behavior: "smooth" });
}

// INITIALIZE

displayProducts();
updateCartCount();

   