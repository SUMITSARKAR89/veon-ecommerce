
// ================ Load / init after DOM ready ================
document.addEventListener("DOMContentLoaded", () => {

  const bagMain = document.querySelector(".bag-main");
  const clearCartBtn = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkOut");
  const alertBox = document.querySelector(".alertTxt"); 
  const alertB = document.querySelector(".alert"); 
  // =================== Elements part 1===================
  const bagCard = document.getElementById("bagCard");
  const bagClose = document.querySelector(".bagClose");
  const bagBtn = document.querySelector(".bag");

  // safe open/close
  bagBtn.addEventListener("click", () =>(bagCard.style.display = "block"));
  bagClose.addEventListener("click", () =>(bagCard.style.display = "none"));

  // =================== Elements part 2===================
  const buyBtn = document.querySelectorAll(".buyNow");
   // ================ Add to cart (from shopCard) =================
  buyBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const shopCard = e.target.closest(".shopCard");
      if (!shopCard) return;
      addToCart(shopCard);
    });
  });

   // ---------------- addToCart ----------------
    
  function addToCart(i) {
    const i_imgSrc = i.querySelector(".shopCard-img .img-1").src || "";
    const i_title = i.querySelector(".sc-title").textContent || "No title";
    const i_price = i.querySelector(".sc-price").textContent || "$0";

    // create new cart box
    const newCartBox = document.createElement("div");
    newCartBox.classList.add("cart-box");
    newCartBox.innerHTML = `
      <img src="${i_imgSrc}" alt="" class="cart-img" />
      <div class="cart-details">
        <h5 class="cart-details-name">${i_title}</h5>
        <span class="cart-price">${i_price}</span>
        <div class="cart-qty">
          <button class="minus">-</button>
          <span class="number">1</span>
          <button class="plus">+</button>
        </div>
      </div>
      <i class="fa-regular fa-trash-can card-remove"></i>
    `;

    // duplicate check — always read current items
    const cartDetailsName = bagMain.querySelectorAll(".cart-details-name");
    for (let el of cartDetailsName) {
      if (el.textContent.trim() === i_title.trim()) {
        if (alertB) {
          alertB.innerHTML = "⚠️ Already in CART";
          alertB.style.top = "25%";
          alertB.style.color = "orange";
          setTimeout(() => {
            alertB.innerHTML = "";
            alertB.style.top = "-100%";
          }, 3000);
        }
        return;
      }
    }

    bagMain.appendChild(newCartBox);

    // qty handler for this box
    newCartBox.querySelector(".cart-qty").addEventListener("click", (e) => {
      const number = newCartBox.querySelector(".number");
      let qty = number.textContent;

      if (e.target.classList.contains("minus")) {
        if (qty > 1) qty--;
      } else if (e.target.classList.contains("plus")) {
        qty++;
      }

      number.textContent = qty;
      updateTotalPrice();
      updateCartCountBadge();
      saveCart();
    });

    // remove handler for this box
    newCartBox.querySelector(".card-remove").addEventListener("click", () => {
      newCartBox.remove();
      updateTotalPrice();
      updateCartCountBadge();
      saveCart();
    });

    // update totals and persist
    updateTotalPrice();
    updateCartCountBadge();
    saveCart();
  }


  // ================ update total price =================
  
  function updateTotalPrice() {
  const bagPrice = document.querySelector("#bag-price");
  const cartBoxes = bagMain.querySelectorAll(".cart-box");

  let total = 0;

  cartBoxes.forEach((box) => {
    
    const priceText = box.querySelector(".cart-price").textContent;
    const qtyText = box.querySelector(".number").textContent;
    const price = parseFloat(priceText.replace(/[^0-9.-]/g, "")) || 0;
    const qty = parseInt(qtyText, 10) || 1;
    total += price * qty;
  });

  
  if (bagPrice) {
    bagPrice.textContent = total.toFixed(2);
  }
}


  // ================ update cart count (both places) =================

  function updateCartCountBadge() {
    const cartItemCount = document.querySelector("#cartCount");
    const totalItems = document.querySelector("#count");
    const cartBox = bagMain.querySelectorAll(".cart-box");

    let totalQty = 0;
    cartBox.forEach((a) => {
      const qty = parseInt(a.querySelector(".number").textContent, 10) || 0;
      totalQty += qty;
    });

    if (cartItemCount) {
      cartItemCount.textContent = totalQty;
      cartItemCount.style.visibility = totalQty > 0 ? "visible" : "0";
    }
    if (totalItems) {
      totalItems.textContent = totalQty;
      totalItems.style.visibility = "visible";
    }
  }

  // ================ Clear & Checkout =================
  clearCartBtn.addEventListener("click", () => {
    const cartBoxes = bagMain.querySelectorAll(".cart-box");
    cartBoxes.forEach((box) => box.remove());

    updateTotalPrice();
    updateCartCountBadge();

    if (alertBox) {
      alertBox.innerHTML = "😞 Cart cleared!!";
      alertBox.style.color = "red";
      alertBox.style.display = "block";
      setTimeout(() => {
        alertBox.innerHTML = "";
        alertBox.style.display = "none";
      }, 3000);
    }

    clearCartFromLocal();
    saveCart();
  });

  checkoutBtn.addEventListener("click", () => {
    const cartBoxes = bagMain.querySelectorAll(".cart-box");

    if (cartBoxes.length === 0) {
      alertBox.innerHTML = "☹️ Your cart is empty";
      alertBox.style.color = "#08af7d";
      alertBox.style.display = "block";
      setTimeout(() => {
        alertBox.innerHTML = "";
        alertBox.style.display = "none";
      }, 3000);

      return;
    } else {
      const total = document.getElementById("bag-price").textContent || "0.00";
      cartBoxes.forEach((box) => box.remove());

      updateTotalPrice();
      updateCartCountBadge();

      clearCartFromLocal();
      saveCart();

      alertBox.innerHTML = `😀 Checkout successful! Total: ${total}`;
      alertBox.style.color = "green";
      alertBox.style.display = "block";
      setTimeout(() => {
        alertBox.innerHTML = "";
        alertBox.style.display = "none";
      }, 5000);
    }
  });

  // =============== LOCAL STORAGE (simple HTML save) ===================
  function saveCart() {
    localStorage.setItem("cartHTML", bagMain.innerHTML);
  }
  function loadCart() {
    const saved = localStorage.getItem("cartHTML");
    if (saved) {
      bagMain.innerHTML = saved;
      attachCartListeners();
    }
  }
  function clearCartFromLocal() {
    localStorage.removeItem("cartHTML");
  }
  // ================ Attach listeners to cart items (for loaded items) ================
  function attachCartListeners() {
    // clone qty nodes to remove previously attached handlers (safe approach)
    bagMain.querySelectorAll(".cart-box").forEach((box) => {
      const qtyNode = box.querySelector(".cart-qty");
      if (qtyNode) qtyNode.replaceWith(qtyNode.cloneNode(true));
    });

    // re-attach handlers
    bagMain.querySelectorAll(".cart-box").forEach((box) => {
      const qtyContainer = box.querySelector(".cart-qty");
      if (qtyContainer) {
        qtyContainer.addEventListener("click", (e) => {
          const number = box.querySelector(".number");
          let qty = parseInt(number.textContent, 10) || 1;

          if (e.target.classList.contains("minus")) {
            if (qty > 1) qty--;
          } else if (e.target.classList.contains("plus")) {
            qty++;
          }

          number.textContent = qty;
          updateTotalPrice();
          updateCartCountBadge();
          saveCart();
        });
      }

      const removeBtn = box.querySelector(".card-remove");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          box.remove();
          updateTotalPrice();
          updateCartCountBadge();
          saveCart();
          if (alertBox) {
            alertBox.innerHTML = "😞 Item removed";
            alertBox.style.color = "red";
          }
        });
      }
    });
  }

  // ================ Load saved cart on init =================
  loadCart();
  updateTotalPrice();
  updateCartCountBadge();
});
