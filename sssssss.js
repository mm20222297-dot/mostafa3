 
function calculateCart() {
    let products = document.querySelectorAll(".product-cart-list");
    let subtotal = 0;

    products.forEach(product => {
        let priceText = product.querySelector(".product-cart-titleprice b").innerText;
        let price = Number(priceText.replace("$",""));

        let qtySelect = product.querySelector("select");
        let qty = Number(qtySelect.value.replace("Qty: ", "") || 1);

        subtotal += price * qty;

        // تحديث السعر بجانب المنتج
        product.querySelector(".product-cart-titleprice b").innerText = `$${(price * qty).toFixed(2)}`;
    });

    // تحديث الإجمالي تحت
    let subtotalBox = document.querySelector(".cart-list-sudtotal b");
    if (subtotalBox) {
        subtotalBox.innerText = `$${subtotal.toFixed(2)}`;
    }

    // تحديث إجمالي اليمين
    let rightTotal = document.querySelector(".cart-subtotal b");
    if (rightTotal) {
        rightTotal.innerText = `$${subtotal.toFixed(2)}`;
    }
}

// تشغيل أول ما الصفحة تفتح
calculateCart();

// لو غيّر الكمية يعيد الحساب
document.addEventListener("change", function(e){
    if(e.target.tagName === "SELECT"){
        calculateCart();
    }
});
 
