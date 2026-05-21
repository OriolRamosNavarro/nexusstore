/* ==========================================================================
   NEXUSSTORE - WEB APPLICATION LOGIC (SPA)
   ========================================================================== */

// 1. Initial Seed Data (in case local storage is empty)
const DEFAULT_PRODUCTS = [
    {
        id: "prod-1",
        name: "Ebook: Manual de Automatización con IA",
        category: "eBook",
        price: 19.99,
        description: "Aprende a delegar tareas repetitivas utilizando modelos de lenguaje y flujos de trabajo automatizados. Incluye guías detalladas y scripts prácticos en Python y Node.js para conectar APIs e integrar agentes en tu día a día.",
        features: "180 páginas en PDF/ePub, Scripts listos para usar, Ejemplos de prompts avanzados, Actualizaciones gratis",
        image: "assets/ai_ebook_cover.png",
        downloadUrl: "assets/ai_ebook_cover.png",
        checkoutUrl: "",
        salesCount: 0
    },
    {
        id: "prod-2",
        name: "Notion OS: Plantilla de Productividad Extrema",
        category: "Plantilla",
        price: 29.00,
        description: "Un sistema organizativo integral para Notion. Gestiona proyectos, finanzas personales, objetivos anuales y hábitos diarios utilizando las metodologías GTD (Getting Things Done) y PARA más eficientes.",
        features: "Estructura GTD/PARA integrada, Tracker financiero automatizado, Videotutorial de uso, Soporte premium",
        image: "assets/notion_template.png",
        downloadUrl: "assets/notion_template.png",
        checkoutUrl: "",
        salesCount: 0
    },
    {
        id: "prod-3",
        name: "Glassmorphism UI Icons 3D Pack",
        category: "Assets",
        price: 14.50,
        description: "Paquete premium de 50 iconos 3D flotantes de estilo vidrio esmerilado con reflexiones realistas. Ideal para elevar la calidad visual de tus páginas de aterrizaje, presentaciones e interfaces móviles.",
        features: "50 archivos PNG transparentes, Archivos fuente Blender (.blend), Renderizados a 4K de resolución, Licencia comercial ilimitada",
        image: "assets/glass_icons_3d.png",
        downloadUrl: "assets/glass_icons_3d.png",
        checkoutUrl: "",
        salesCount: 0
    }
];

const DEFAULT_ORDERS = [];

// 2. State Controller
const State = {
    products: [],
    orders: [],
    checkoutSettings: {
        overlayMode: true
    },
    currentCheckoutProduct: null,

    // Load from localStorage or set defaults
    init() {
        // Force reset/clear on first load of this new version
        const resetKey = "nexus_reset_v4";
        if (!localStorage.getItem(resetKey)) {
            localStorage.removeItem("nexus_products");
            localStorage.removeItem("nexus_orders");
            localStorage.setItem(resetKey, "true");
        }

        // Load Products
        const storedProducts = localStorage.getItem("nexus_products");
        if (storedProducts) {
            // Defensive mapping to ensure checkoutUrl is present
            this.products = JSON.parse(storedProducts).map(p => ({
                checkoutUrl: "",
                ...p
            }));
        } else {
            this.products = [...DEFAULT_PRODUCTS];
            localStorage.setItem("nexus_products", JSON.stringify(this.products));
        }

        // Load Orders
        const storedOrders = localStorage.getItem("nexus_orders");
        if (storedOrders) {
            this.orders = JSON.parse(storedOrders);
        } else {
            this.orders = [...DEFAULT_ORDERS];
            localStorage.setItem("nexus_orders", JSON.stringify(this.orders));
        }

        // Load Settings
        const storedSettings = localStorage.getItem("nexus_checkout_settings");
        if (storedSettings) {
            this.checkoutSettings = JSON.parse(storedSettings);
        }
    },

    saveProducts() {
        localStorage.setItem("nexus_products", JSON.stringify(this.products));
    },

    saveOrders() {
        localStorage.setItem("nexus_orders", JSON.stringify(this.orders));
    },

    saveSettings() {
        localStorage.setItem("nexus_checkout_settings", JSON.stringify(this.checkoutSettings));
    },

    // Add Order
    addOrder(customerEmail, productObj) {
        const date = new Date();
        const formattedDate = date.getFullYear() + '-' + 
            String(date.getMonth() + 1).padStart(2, '0') + '-' + 
            String(date.getDate()).padStart(2, '0') + ' ' + 
            String(date.getHours()).padStart(2, '0') + ':' + 
            String(date.getMinutes()).padStart(2, '0');

        const newOrder = {
            id: "tx_" + Math.random().toString(36).substr(2, 9),
            date: formattedDate,
            customer: customerEmail,
            product: productObj.name,
            amount: productObj.price,
            status: "Completado"
        };

        this.orders.unshift(newOrder);
        this.saveOrders();

        // Increment sales counter of product
        const prod = this.products.find(p => p.id === productObj.id);
        if (prod) {
            prod.salesCount = (prod.salesCount || 0) + 1;
            this.saveProducts();
        }

        return newOrder;
    }
};

// 3. UI Elements Cache
const DOM = {
    // Navigation
    navStore: document.getElementById("nav-store"),
    navDashboardTrigger: document.getElementById("nav-dashboard-trigger"),
    logo: document.getElementById("btn-logo"),
    sectionStore: document.getElementById("section-store"),
    sectionDashboard: document.getElementById("section-dashboard"),
    
    // Storefront
    searchVal: document.getElementById("store-search"),
    filterContainer: document.getElementById("category-filters-container"),
    productsGrid: document.getElementById("products-grid-container"),
    
    // Modals
    modalPasscode: document.getElementById("modal-passcode"),
    passcodeForm: document.getElementById("passcode-form"),
    passcodeField: document.getElementById("admin-passcode"),
    passcodeError: document.getElementById("passcode-error"),
    btnExitPasscode: document.getElementById("btn-close-passcode"),
    
    modalDetail: document.getElementById("modal-product-detail"),
    detailContent: document.getElementById("product-detail-content"),
    btnCloseDetail: document.getElementById("btn-close-detail"),

    modalCheckout: document.getElementById("modal-checkout"),
    checkoutProdPreview: document.getElementById("checkout-prod-preview"),
    checkoutPriceTotal: document.getElementById("checkout-price-total"),
    checkoutForm: document.getElementById("checkout-payment-form"),
    btnPayNow: document.getElementById("btn-pay-now"),
    btnPayText: document.getElementById("btn-pay-text"),
    btnPayLoader: document.getElementById("btn-pay-loader"),
    checkoutSuccessScreen: document.getElementById("checkout-success-screen"),
    dlProductName: document.getElementById("dl-product-name"),
    btnDownloadFile: document.getElementById("btn-download-file"),
    btnSuccessClose: document.getElementById("btn-success-close"),
    btnCloseCheckout: document.getElementById("btn-close-checkout"),

    // Credit Card Inputs & Graphic
    ccGraphic: document.getElementById("credit-card"),
    inputCcName: document.getElementById("cust-name"),
    inputCcNum: document.getElementById("cust-cc"),
    inputCcExp: document.getElementById("cust-exp"),
    inputCcCvc: document.getElementById("cust-cvc"),
    displayCcName: document.getElementById("cc-name-display"),
    displayCcNum: document.getElementById("cc-number-display"),
    displayCcExp: document.getElementById("cc-date-display"),
    displayCcCvc: document.getElementById("cc-cvc-display"),
    
    // Dashboard analytics and stats
    dashRevenue: document.getElementById("dash-revenue"),
    dashSales: document.getElementById("dash-sales"),
    dashConversion: document.getElementById("dash-conversion"),
    dashProductsCount: document.getElementById("dash-products-count"),
    productsTableBody: document.getElementById("dash-products-table-body"),
    ordersTableBody: document.getElementById("dash-orders-table-body"),
    checkoutOverlayCheckbox: document.getElementById("gumroad-overlay-mode"),
    checkoutOverlayLabel: document.getElementById("gumroad-overlay-label"),
    gumroadTrigger: document.getElementById("gumroad-trigger"),
    
    // Product Crud Form Modal
    modalProductForm: document.getElementById("modal-product-form"),
    productForm: document.getElementById("product-crud-form"),
    prodFormTitle: document.getElementById("prod-form-title"),
    prodFormDesc: document.getElementById("prod-form-desc"),
    prodIdField: document.getElementById("prod-id"),
    prodNameField: document.getElementById("prod-name"),
    prodCatField: document.getElementById("prod-category"),
    prodPriceField: document.getElementById("prod-price"),
    prodDescField: document.getElementById("prod-description"),
    prodFeaturesField: document.getElementById("prod-features"),
    prodImageSelect: document.getElementById("prod-image-select"),
    prodCheckoutUrl: document.getElementById("prod-checkout-url"),
    prodDownloadUrl: document.getElementById("prod-download-url"),
    btnAddProductTrigger: document.getElementById("btn-add-product-trigger"),
    btnAddProductTable: document.getElementById("btn-add-product-table"),
    btnCloseProdForm: document.getElementById("btn-close-prod-form"),
    btnLogout: document.getElementById("btn-logout"),

    // Legal Modal
    modalLegal: document.getElementById("modal-legal"),
    legalTitle: document.getElementById("legal-title"),
    legalTextContent: document.getElementById("legal-text-content"),
    linkTerms: document.getElementById("link-terms"),
    linkPrivacy: document.getElementById("link-privacy"),
    linkLegal: document.getElementById("link-legal"),
    btnCloseLegal: document.getElementById("btn-close-legal"),
    btnCloseLegalBottom: document.getElementById("btn-close-legal-bottom")
};

// 4. Router and Views Control
const ViewRouter = {
    currentTab: "store",

    switchView(tabName) {
        if (tabName === "dashboard") {
            // Check if passcode is saved in sessionStorage
            const isUnlocked = sessionStorage.getItem("nexus_dashboard_unlocked");
            if (isUnlocked === "true") {
                this.activateDashboard();
            } else {
                DOM.modalPasscode.classList.add("active");
                DOM.passcodeField.focus();
            }
        } else {
            this.activateStore();
        }
    },

    activateStore() {
        this.currentTab = "store";
        DOM.navStore.classList.add("active");
        DOM.navDashboardTrigger.classList.remove("active");
        DOM.sectionDashboard.classList.remove("active");
        setTimeout(() => {
            DOM.sectionStore.classList.add("active");
            renderStorefront();
        }, 150);
    },

    activateDashboard() {
        this.currentTab = "dashboard";
        DOM.navDashboardTrigger.classList.add("active");
        DOM.navStore.classList.remove("active");
        DOM.sectionStore.classList.remove("active");
        setTimeout(() => {
            DOM.sectionDashboard.classList.add("active");
            renderDashboard();
        }, 150);
    },

    logoutDashboard() {
        sessionStorage.removeItem("nexus_dashboard_unlocked");
        this.activateStore();
    }
};

// 5. Storefront Render Logic
function renderStorefront() {
    const query = DOM.searchVal.value.toLowerCase();
    const activeFilterBtn = DOM.filterContainer.querySelector(".filter-btn.active");
    const activeCategory = activeFilterBtn ? activeFilterBtn.dataset.category : "all";

    // Filter products
    const filteredProducts = State.products.filter(prod => {
        const matchesQuery = prod.name.toLowerCase().includes(query) || prod.description.toLowerCase().includes(query);
        const matchesCategory = activeCategory === "all" || prod.category === activeCategory;
        return matchesQuery && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        DOM.productsGrid.innerHTML = `
            <div class="loader-container">
                <p><i class="fa-solid fa-face-frown text-indigo" style="font-size: 2rem; display: block; margin-bottom: 12px;"></i> No hemos encontrado ningún producto con esos filtros.</p>
            </div>
        `;
        return;
    }

    DOM.productsGrid.innerHTML = filteredProducts.map(prod => `
        <div class="product-card glass-card">
            <div class="product-img-wrapper">
                <span class="product-cat-tag">${prod.category}</span>
                <img src="${prod.image}" alt="${prod.name}" class="product-card-img" onerror="this.src='https://placehold.co/600x400/0f172a/white?text=NexusStore+Product'">
            </div>
            <div class="product-card-body">
                <h3 class="product-card-title">${prod.name}</h3>
                <p class="product-card-desc">${prod.description}</p>
                <div class="product-card-footer">
                    <div class="product-price-layout">
                        <span class="product-price-label">Precio</span>
                        <span class="product-price">€${Number(prod.price).toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary btn-sm btn-buy" data-id="${prod.id}">
                        <i class="fa-solid fa-basket-shopping"></i> Comprar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Attach buy listeners
    DOM.productsGrid.querySelectorAll(".btn-buy").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const prodId = button.dataset.id;
            openProductDetail(prodId);
        });
    });
}

// 6. Product Detail View Modal
function openProductDetail(id) {
    const product = State.products.find(p => p.id === id);
    if (!product) return;

    const featuresArray = product.features.split(',').map(f => f.trim()).filter(f => f.length > 0);
    const featuresHtml = featuresArray.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('');

    DOM.detailContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="detail-img" onerror="this.src='https://placehold.co/600x400/0f172a/white?text=NexusStore+Product'">
        <div class="detail-info">
            <span class="badge">${product.category}</span>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            
            <div class="detail-price-row">
                <div>
                    <span class="product-price-label">Acceso Inmediato</span>
                    <div class="detail-price-amount">€${Number(product.price).toFixed(2)}</div>
                </div>
                <button class="btn btn-emerald btn-lg" id="btn-trigger-checkout">
                    <i class="fa-solid fa-credit-card"></i> Adquirir Ahora
                </button>
            </div>

            <div class="detail-features">
                <h5>¿Qué incluye tu descarga?</h5>
                <ul class="features-list">
                    ${featuresHtml}
                </ul>
            </div>
        </div>
    `;

    DOM.modalDetail.classList.add("active");

    // Checkout Event inside Modal
    document.getElementById("btn-trigger-checkout").addEventListener("click", () => {
        DOM.modalDetail.classList.remove("active");
        
        // Track the current product checkout process
        State.currentCheckoutProduct = product;
        
        // If Gumroad checkout link is set, redirect or open overlay
        if (product.checkoutUrl && (product.checkoutUrl.startsWith("http://") || product.checkoutUrl.startsWith("https://"))) {
            if (State.checkoutSettings.overlayMode) {
                if (DOM.gumroadTrigger) {
                    DOM.gumroadTrigger.setAttribute("href", product.checkoutUrl);
                    DOM.gumroadTrigger.click();
                } else {
                    window.open(product.checkoutUrl, '_blank');
                }
            } else {
                window.open(product.checkoutUrl, '_blank');
            }
        } else {
            // Fallback to simulated payment form
            openCheckout(product);
        }
    });
}

// 7. Interactive simulated credit card checkout
function openCheckout(product) {
    State.currentCheckoutProduct = product;
    
    // Reset Form
    DOM.checkoutForm.reset();
    DOM.checkoutForm.classList.remove("hidden");
    DOM.checkoutSuccessScreen.classList.add("hidden");
    
    // Reset Card Displays
    DOM.displayCcName.innerText = "TU NOMBRE AQUÍ";
    DOM.displayCcNum.innerText = "•••• •••• •••• ••••";
    DOM.displayCcExp.innerText = "MM/AA";
    DOM.displayCcCvc.innerText = "•••";
    DOM.ccGraphic.classList.remove("flipped");

    // Dynamic product summary in checkout
    DOM.checkoutProdPreview.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="mini-preview-img" onerror="this.src='https://placehold.co/600x400/0f172a/white?text=NexusStore+Product'">
        <div>
            <strong>${product.name}</strong>
            <p>${product.category}</p>
        </div>
    `;
    DOM.checkoutPriceTotal.innerText = `€${Number(product.price).toFixed(2)}`;

    DOM.modalCheckout.classList.add("active");
}

// Interactive Credit Card inputs event handlers
DOM.inputCcName.addEventListener("input", (e) => {
    const val = e.target.value.toUpperCase();
    DOM.displayCcName.innerText = val.substring(0, 24) || "TU NOMBRE AQUÍ";
});

DOM.inputCcNum.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, ""); // Only numbers
    // Limit to 16 digits
    val = val.substring(0, 16);
    
    // Format card number with spaces (4-4-4-4)
    let formatted = "";
    for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += " ";
        formatted += val[i];
    }
    
    e.target.value = formatted;
    
    // Mirror to display card front
    let mask = "•••• •••• •••• ••••";
    let chars = formatted.split("");
    let maskChars = mask.split("");
    for (let i = 0; i < chars.length; i++) {
        maskChars[i] = chars[i];
    }
    DOM.displayCcNum.innerText = maskChars.join("");
});

DOM.inputCcExp.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 4);
    
    let formatted = val;
    if (val.length > 2) {
        formatted = val.substring(0, 2) + "/" + val.substring(2, 4);
    }
    e.target.value = formatted;
    DOM.displayCcExp.innerText = formatted || "MM/AA";
});

DOM.inputCcCvc.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 3);
    e.target.value = val;
    
    let mask = "•••";
    let chars = val.split("");
    let maskChars = mask.split("");
    for (let i = 0; i < chars.length; i++) {
        maskChars[i] = chars[i];
    }
    DOM.displayCcCvc.innerText = maskChars.join("");
});

// Flip card front/back on focus events
DOM.inputCcCvc.addEventListener("focus", () => {
    DOM.ccGraphic.classList.add("flipped");
});
DOM.inputCcCvc.addEventListener("blur", () => {
    DOM.ccGraphic.classList.remove("flipped");
});

// 8. Payment submission process
DOM.checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Disable button & show spinner
    DOM.btnPayNow.disabled = true;
    DOM.btnPayText.classList.add("hidden");
    DOM.btnPayLoader.classList.remove("hidden");

    // Simulate 2 seconds transaction process
    setTimeout(() => {
        const customerEmail = document.getElementById("cust-email").value;
        const product = State.currentCheckoutProduct;
        
        // Log transaction and state save
        const txn = State.addOrder(customerEmail, product);

        // Reset payment button state
        DOM.btnPayNow.disabled = false;
        DOM.btnPayText.classList.remove("hidden");
        DOM.btnPayLoader.classList.add("hidden");

        // Hide payment form, show download success view
        DOM.checkoutForm.classList.add("hidden");
        DOM.checkoutSuccessScreen.classList.remove("hidden");

        // Fill download modal elements
        DOM.dlProductName.innerText = product.name;
        // Mock download asset
        DOM.btnDownloadFile.setAttribute("href", product.downloadUrl);
        DOM.btnDownloadFile.setAttribute("download", product.name + ".png");

    }, 2000);
});

// 9. Creator Dashboard Rendering & Analytics
function renderDashboard() {
    // Basic metrics totals
    const totalRevenue = State.orders.reduce((acc, order) => acc + order.amount, 0);
    DOM.dashRevenue.innerText = "€" + totalRevenue.toFixed(2);
    DOM.dashSales.innerText = State.orders.length;
    DOM.dashProductsCount.innerText = State.products.length;

    // Conversion rate logic (simulated visitors vs purchases)
    // Formula: (purchases / 1600 visitors) * 100
    const estimatedVisitors = 1200 + (State.orders.length * 10);
    const conversionRate = (State.orders.length / estimatedVisitors) * 100;
    DOM.dashConversion.innerText = conversionRate.toFixed(2) + "%";

    // Populate Gumroad config UI fields
    if (DOM.checkoutOverlayCheckbox) {
        DOM.checkoutOverlayCheckbox.checked = State.checkoutSettings.overlayMode;
        DOM.checkoutOverlayLabel.innerText = State.checkoutSettings.overlayMode ? "Abrir checkout flotante" : "Abrir checkout en pestaña nueva";
    }

    // Populate Products table
    DOM.productsTableBody.innerHTML = State.products.map(p => `
        <tr>
            <td>
                <div class="table-product-cell">
                    <img src="${p.image}" class="table-product-img" onerror="this.src='https://placehold.co/100x100/0f172a/white?text=NexusStore+Product'">
                    <span>${p.name}</span>
                </div>
            </td>
            <td><span class="badge badge-indigo">${p.category}</span></td>
            <td><strong>€${Number(p.price).toFixed(2)}</strong></td>
            <td>${p.salesCount || 0}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-icon btn-icon-edit" onclick="editProduct('${p.id}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon btn-icon-delete" onclick="deleteProduct('${p.id}')" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    // Populate Orders Table
    DOM.ordersTableBody.innerHTML = State.orders.map(o => `
        <tr>
            <td><span class="text-muted">${o.date}</span></td>
            <td><code>${o.customer}</code></td>
            <td>${o.product}</td>
            <td><strong>€${Number(o.amount).toFixed(2)}</strong></td>
            <td><span class="badge badge-emerald"><i class="fa-solid fa-circle-check"></i> ${o.status}</span></td>
        </tr>
    `).join('');

    // Draw the financial sales trend graphic on Canvas
    drawSalesChart();
}

// 10. Draw Canvas financial charts manually
function drawSalesChart() {
    const canvas = document.getElementById("salesChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set canvas high-resolution scale
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = 280 * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = 280;
    const padding = 45;

    ctx.clearRect(0, 0, width, height);

    // Dynamic trend points from actual orders or mock base points if sales are low
    const baseTrend = [0, 0, 0, 0, 0, 0, 0]; // 7 days chart base
    
    // Add real last purchases to final node trend
    const recentRevenue = State.orders.slice(0, 5).reduce((acc, o) => acc + o.amount, 0);
    baseTrend[baseTrend.length - 1] += recentRevenue;

    const maxVal = (Math.max(...baseTrend) * 1.15) || 100;
    const minVal = 0;

    // Draw Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + ((height - padding * 2) * i) / 4;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        // Y Labels (Amount)
        const labelVal = maxVal - ((maxVal - minVal) * i) / 4;
        ctx.fillStyle = "hsl(215, 20%, 55%)";
        ctx.font = "11px Outfit, sans-serif";
        ctx.fillText("€" + labelVal.toFixed(0), 10, y + 4);
    }

    // Days labels (X Axis)
    const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const stepX = (width - padding * 2) / (baseTrend.length - 1);

    labels.forEach((day, i) => {
        const x = padding + i * stepX;
        ctx.fillStyle = "hsl(215, 20%, 55%)";
        ctx.font = "11px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(day, x, height - 15);
    });

    // Generate coordinates points
    const points = baseTrend.map((val, i) => {
        const x = padding + i * stepX;
        const ratio = (val - minVal) / (maxVal - minVal);
        const y = height - padding - ratio * (height - padding * 2);
        return { x, y, val };
    });

    // Draw background gradient under curves
    const gradientFill = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradientFill.addColorStop(0, "rgba(99, 102, 241, 0.25)");
    gradientFill.addColorStop(1, "rgba(99, 102, 241, 0.0)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    
    // Draw Bezier curves for smooth aesthetics
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX1 = p0.x + (p1.x - p0.x) / 2;
        const cpY1 = p0.y;
        const cpX2 = p0.x + (p1.x - p0.x) / 2;
        const cpY2 = p1.y;
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1.x, p1.y);
    }
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradientFill;
    ctx.fill();

    // Draw main glowing trend lines
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX1 = p0.x + (p1.x - p0.x) / 2;
        const cpY1 = p0.y;
        const cpX2 = p0.x + (p1.x - p0.x) / 2;
        const cpY2 = p1.y;
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1.x, p1.y);
    }

    ctx.strokeStyle = "hsl(243, 75%, 65%)";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw glow dots
    points.forEach((pt) => {
        // Outer dot glow ring
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
        ctx.fill();

        // Inner solid dot
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Value tags on top of dots
        ctx.fillStyle = "white";
        ctx.font = "bold 10px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("€" + pt.val.toFixed(0), pt.x, pt.y - 12);
    });
}

// 11. Product CRUD Actions (Create, Read, Update, Delete)
function openProductForm(editId = null) {
    DOM.productForm.reset();
    
    if (editId) {
        // Edit mode
        const prod = State.products.find(p => p.id === editId);
        if (!prod) return;
        DOM.prodFormTitle.innerText = "Editar Producto Digital";
        DOM.prodFormDesc.innerText = "Modifica los detalles del producto existente en la tienda.";
        DOM.prodIdField.value = prod.id;
        DOM.prodNameField.value = prod.name;
        DOM.prodCatField.value = prod.category;
        DOM.prodPriceField.value = prod.price;
        DOM.prodDescField.value = prod.description;
        DOM.prodFeaturesField.value = prod.features;
        DOM.prodImageSelect.value = prod.image;
        DOM.prodCheckoutUrl.value = prod.checkoutUrl || "";
        DOM.prodDownloadUrl.value = prod.downloadUrl;
    } else {
        // Create mode
        DOM.prodFormTitle.innerText = "Añadir Nuevo Producto";
        DOM.prodFormDesc.innerText = "Ingresa los datos para listar un producto en tu escaparate digital.";
        DOM.prodIdField.value = "";
        DOM.prodCheckoutUrl.value = "";
    }

    DOM.modalProductForm.classList.add("active");
}

DOM.productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = DOM.prodIdField.value;
    const name = DOM.prodNameField.value;
    const category = DOM.prodCatField.value;
    const price = parseFloat(DOM.prodPriceField.value);
    const description = DOM.prodDescField.value;
    const features = DOM.prodFeaturesField.value;
    const image = DOM.prodImageSelect.value;
    const checkoutUrl = DOM.prodCheckoutUrl.value;
    const downloadUrl = DOM.prodDownloadUrl.value;

    if (id) {
        // Edit existing product
        const index = State.products.findIndex(p => p.id === id);
        if (index !== -1) {
            State.products[index] = {
                ...State.products[index],
                name, category, price, description, features, image, checkoutUrl, downloadUrl
            };
        }
    } else {
        // Add new product
        const newProduct = {
            id: "prod-" + Math.random().toString(36).substr(2, 9),
            name, category, price, description, features, image, checkoutUrl, downloadUrl,
            salesCount: 0
        };
        State.products.push(newProduct);
    }

    State.saveProducts();
    DOM.modalProductForm.classList.remove("active");
    
    // Refresh views
    renderDashboard();
    renderStorefront();
});

// Bind globally exposed CRUD operations for table actions
window.editProduct = function(id) {
    openProductForm(id);
};

window.deleteProduct = function(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este producto digital? Dejará de mostrarse en la tienda del cliente.")) {
        State.products = State.products.filter(p => p.id !== id);
        State.saveProducts();
        renderDashboard();
        renderStorefront();
    }
};

// 12. Settings Setup Forms (Autosave on change)
if (DOM.checkoutOverlayCheckbox) {
    DOM.checkoutOverlayCheckbox.addEventListener("change", (e) => {
        State.checkoutSettings.overlayMode = e.target.checked;
        DOM.checkoutOverlayLabel.innerText = e.target.checked ? "Abrir checkout flotante" : "Abrir checkout en pestaña nueva";
        State.saveSettings();
    });
}

// 13. Passcode Authentication Modal Logic
DOM.passcodeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const typedCode = DOM.passcodeField.value;

    // Secret code default is 'huevo2005' (User requested easy start)
    if (typedCode === "huevo2005" || typedCode === "creador123") {
        DOM.modalPasscode.classList.remove("active");
        DOM.passcodeError.style.display = "none";
        sessionStorage.setItem("nexus_dashboard_unlocked", "true");
        ViewRouter.activateDashboard();
    } else {
        DOM.passcodeError.style.display = "block";
        DOM.passcodeField.value = "";
        DOM.passcodeField.focus();
    }
});

// 14. Legal Documents Text Rendering
const LegalTexts = {
    terms: `
        <h4>1. Aceptación de los Términos</h4>
        <p>Al acceder y utilizar NexusStore, aceptas quedar vinculado por estos Términos de Servicio y todas las leyes y regulaciones aplicables en España y la Unión Europea.</p>
        
        <h4>2. Productos Digitales y Licencias</h4>
        <p>Todos los productos vendidos en esta plataforma son descargas digitales instantáneas. Con la compra, el Creador te concede una licencia personal, no exclusiva y no transferible para utilizar el producto digital adquirido. Está estrictamente prohibida la redistribución, reventa, compartición o ingeniería inversa de los recursos digitales provistos.</p>
        
        <h4>3. Política de Reembolso e Devolución</h4>
        <p>Debido al carácter inmediato e intangible de los productos descargables, de acuerdo con el artículo 103.m) de la Ley General para la Defensa de los Consumidores y Usuarios de España, una vez iniciada la descarga o suministro del contenido digital, se pierde el derecho de desistimiento legal. Por tanto, no se realizarán reembolsos tras completarse el pago con éxito.</p>
        
        <h4>4. Limitación de Responsabilidad</h4>
        <p>NexusStore y el Creador proveen el software, ebooks o plantillas "tal cual", sin garantías de ningún tipo respecto a su adaptabilidad a fines específicos. No nos hacemos responsables de daños indirectos derivados del uso o imposibilidad de uso de los materiales provistos.</p>
    `,
    privacy: `
        <h4>1. Información Recopilada</h4>
        <p>Recopilamos únicamente los datos necesarios para procesar la transacción y entregar los enlaces de descarga digital:</p>
        <ul>
            <li>Correo electrónico del comprador (para envío de facturas y descargas).</li>
            <li>Nombre completo (para facturación y validación del pago).</li>
            <li>Detalles del método de pago (procesados de forma totalmente cifrada y directa por la pasarela segura Stripe, sin almacenarse en nuestros servidores).</li>
        </ul>
        
        <h4>2. Finalidad del Tratamiento</h4>
        <p>Tus datos se tratan exclusivamente para el cumplimiento contractual (entrega del producto), soporte al cliente y obligaciones tributarias. Cumplimos rigurosamente con el Reglamento General de Protección de Datos (RGPD) europeo.</p>
        
        <h4>3. Conservación de Datos</h4>
        <p>Los datos de contacto asociados a descargas se conservan para asegurar el acceso a tus productos en el futuro. Puedes solicitar su eliminación completa enviando un correo al administrador de la tienda en cualquier momento.</p>
    `,
    legal: `
        <h4>Información General (LSSI-CE)</h4>
        <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, se hace constar:</p>
        <ul>
            <li><strong>Titular de la Web:</strong> [Tu Nombre/Empresa S.L.]</li>
            <li><strong>NIF/CIF:</strong> [NIF de Autónomo o CIF de Sociedad]</li>
            <li><strong>Domicilio Social:</strong> [Tu Dirección de Facturación, España]</li>
            <li><strong>Email de Contacto:</strong> [Tu Correo de Soporte]</li>
        </ul>

        <h4>Propiedad Intelectual</h4>
        <p>El código, diseño gráfico, logotipos e imágenes del portal NexusStore pertenecen en propiedad a su autor o se utilizan bajo licencias adecuadas. Queda prohibida la reproducción total o parcial de esta web sin permiso por escrito.</p>

        <h4>Fiscalidad en Ventas Digitales (IVA EU)</h4>
        <p>Los productos suministrados por vía electrónica a consumidores finales dentro de la Unión Europea (B2C) están sujetos al tipo de IVA vigente en el país de residencia del comprador (Régimen Especial de la Ventanilla Única de IVA - MOSS). El emisor se compromete a liquidar dichos impuestos según marca la Directiva de la UE.</p>
    `
};

function openLegalModal(docType) {
    if (docType === "terms") {
        DOM.legalTitle.innerText = "Términos del Servicio";
        DOM.legalTextContent.innerHTML = LegalTexts.terms;
    } else if (docType === "privacy") {
        DOM.legalTitle.innerText = "Política de Privacidad y Cookies";
        DOM.legalTextContent.innerHTML = LegalTexts.privacy;
    } else if (docType === "legal") {
        DOM.legalTitle.innerText = "Aviso Legal (España)";
        DOM.legalTextContent.innerHTML = LegalTexts.legal;
    }
    DOM.modalLegal.classList.add("active");
}

// 15. Event Listeners binding
function bindEvents() {
    // Navigation routing
    DOM.navStore.addEventListener("click", () => ViewRouter.switchView("store"));
    DOM.navDashboardTrigger.addEventListener("click", () => ViewRouter.switchView("dashboard"));
    DOM.logo.addEventListener("click", () => ViewRouter.switchView("store"));
    DOM.btnLogout.addEventListener("click", () => ViewRouter.logoutDashboard());

    // Search and category change
    DOM.searchVal.addEventListener("input", renderStorefront);
    
    DOM.filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            DOM.filterContainer.querySelector(".filter-btn.active").classList.remove("active");
            btn.classList.add("active");
            renderStorefront();
        });
    });

    // Close Modals actions
    DOM.btnExitPasscode.addEventListener("click", () => DOM.modalPasscode.classList.remove("active"));
    DOM.btnCloseDetail.addEventListener("click", () => DOM.modalDetail.classList.remove("active"));
    DOM.btnCloseCheckout.addEventListener("click", () => DOM.modalCheckout.classList.remove("active"));
    DOM.btnCloseProdForm.addEventListener("click", () => DOM.modalProductForm.classList.remove("active"));
    DOM.btnCloseLegal.addEventListener("click", () => DOM.modalLegal.classList.remove("active"));
    DOM.btnCloseLegalBottom.addEventListener("click", () => DOM.modalLegal.classList.remove("active"));

    // Close Success Screen checkout view
    DOM.btnSuccessClose.addEventListener("click", () => {
        DOM.modalCheckout.classList.remove("active");
        renderStorefront();
    });

    // Form product crud addition triggers
    DOM.btnAddProductTrigger.addEventListener("click", () => openProductForm(null));
    DOM.btnAddProductTable.addEventListener("click", () => openProductForm(null));

    // Footer Links binding
    DOM.linkTerms.addEventListener("click", (e) => { e.preventDefault(); openLegalModal("terms"); });
    DOM.linkPrivacy.addEventListener("click", (e) => { e.preventDefault(); openLegalModal("privacy"); });
    DOM.linkLegal.addEventListener("click", (e) => { e.preventDefault(); openLegalModal("legal"); });

    // Handle charts canvas redraw on window resizing for fluidity
    window.addEventListener("resize", () => {
        if (ViewRouter.currentTab === "dashboard") {
            drawSalesChart();
        }
    });
}

// 16. Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    State.init();
    bindEvents();
    renderStorefront();

    // Listen to messages for Gumroad purchase completion events
    window.addEventListener('message', (event) => {
        if (event.data && typeof event.data === 'string') {
            try {
                const data = JSON.parse(event.data);
                if (data.post_message_name === 'sale') {
                    console.log("Gumroad Purchase Event Received:", data);
                    const customerEmail = data.email || "cliente@gumroad.com";
                    const product = State.currentCheckoutProduct;
                    if (product) {
                        State.addOrder(customerEmail, product);
                        
                        // If we are currently in dashboard view, refresh table
                        if (ViewRouter.currentTab === "dashboard") {
                            renderDashboard();
                        }
                        renderStorefront();
                    }
                }
            } catch (e) {
                // Ignore non-json messages
            }
        }
    });
});
