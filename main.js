const products = [
    { name: "かわいいオリパ　ポケモンカード　ポケカ", description: "かわいいポケモンたち5枚で構成(こうせい)されたex1枚確定(かくてい)オリパ！", price: { jpy: 40, ta: 20000, gol: 60000 } },
    { name: "高級オリパ　ポケモンカード　ポケカ", description: "ex以上(いじょう)のカード3枚で構成(こうせい)された高級(こうきゅう)なオリパです。", price: { jpy: 150, ta: 50000, gol: 150000 } },
    { name: "なっちゃん　オレンジ味　缶", description: "ウタウタ星でも大人気のあのジュースがついにShuffleMartの商品に！いますぐゲットしよう！", price: { jpy: 250, ta: 250000, gol: 750000 } }
];

function searchProducts(keyword) {
    const results = products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const area = document.getElementById("searchResults");
    area.innerHTML = "";

    if (results.length === 0) {
        area.innerHTML = `<p>商品が見つかりません。</p>`;
        return;
    }

    results.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-6 col-sm-4 col-md-4";
        col.innerHTML = `
            <div class="card rounded-3 shadow-sm d-flex align-items-center justify-content-center p-2 text-center"
                 style="aspect-ratio:1/1; cursor:pointer;">
                <h3 class="fs-6 mb-1">${product.name}</h3>
                <p class="mb-0 small">¥${product.price.jpy.toLocaleString()}円</p>
                <hr>
                <p class="small text-muted mb-0">${product.description || "説明なし"}</p>
            </div>
        `;
        col.querySelector(".card").addEventListener("click", () => showProductOptions(product));
        area.appendChild(col);
    });
}

let currentProduct = null;
const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));

function showProductOptions(product) {
    currentProduct = product;

    document.getElementById('checkoutTitle').textContent = product.name;

    const currencySelect = document.getElementById('modalCurrencySelect');
    const quantityInput = document.getElementById('modalQuantityInput');
    const priceDisplay = document.getElementById('modalPriceDisplay');
    currencySelect.value = 'jpy';
    quantityInput.value = 1;

    function updatePrice() {
        const currency = currencySelect.value;
        const quantity = Number(quantityInput.value) || 1;
        let text = '';
        if (currency === 'jpy') text = `価格：¥${(product.price.jpy * quantity).toLocaleString()} 円`;
        if (currency === 'ta') text = `価格：${product.price.ta * quantity} Ta`;
        if (currency === 'gol') text = `価格：${product.price.gol * quantity} Gol`;
        priceDisplay.textContent = text;
    }

    currencySelect.addEventListener('change', updatePrice);
    quantityInput.addEventListener('input', updatePrice);
    updatePrice();

    checkoutModal.show();
}

function sendOrderViaFetch() {
    if (!currentProduct) return;

    const currency = document.getElementById('modalCurrencySelect').value;
    const quantity = Number(document.getElementById('modalQuantityInput').value) || 1;

    const url = "https://docs.google.com/forms/d/e/1FAIpQLSc1cTEi1Pu5sQ6tKYdiKc-jYEYS2eCirp3dhRUedmrtlDmG2Q/formResponse";

    const formData = new FormData();
    formData.append("entry.978971053", currentProduct.name);
    formData.append("entry.896080673", currentProduct.price[currency]);
    formData.append("entry.1480910434", quantity);
    formData.append("entry.1730603752", currency === "jpy" ? "JPY" : currency === "ta" ? "Ta" : "Gol");
    formData.append("entry.377842750", document.getElementById('modalNoteInput').value || "なし");

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        const modalBody = document.querySelector('#checkoutModal .modal-body');
        modalBody.innerHTML = `<p class="text-success fw-bold">${currentProduct.name} の注文が完了しました！<br>1週間以内にお届けします。</p>`;
    });
}

document.getElementById('modalPurchaseBtn').addEventListener('click', sendOrderViaFetch);

const form = document.getElementById("myForm");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const keyword = document.getElementById("searchInput").value;
    searchProducts(keyword);
});

searchProducts("");