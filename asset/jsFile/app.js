// const bagCard = document.getElementById("bagCard");
// const bagClose = document.querySelector(".bagClose");
// const bagBtn = document.querySelector(".bag");

// bagBtn.addEventListener("click", () => {
//   bagCard.style.display = "block";
// });
// bagClose.addEventListener("click", () => {
//   bagCard.style.display = "none";
// });

// const buyBtn = document.querySelectorAll(".buyNow");
// const bagMain = document.querySelector(".bag-main");

// const clearCartBtn = document.getElementById("clearCart");
// const checkoutBtn = document.getElementById("checkOut");

// buyBtn.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     const shopCard = e.target.closest(".shopCard");

//     addToCart(shopCard);//call f-1
//   });
// });

// // ------------------f1---------
// const addToCart = (i) => {
//   const i_imgSrc = i.querySelector(".shopCard-img .img-1").src;
//   const i_title = i.querySelector(".sc-title").textContent;
//   const i_price = i.querySelector(".sc-price").textContent;

//   // ----------------------new div----------------------
//   const newCartBox = document.createElement("div");
//   newCartBox.classList.add("cart-box");

//   newCartBox.innerHTML = `
//   <img src="${i_imgSrc}" alt="" class="cart-img" />
//     <div class="cart-details">
//       <h5 class="cart-details-name">${i_title}</h5>
//       <span class="cart-price">${i_price}</span>
//       <div class="cart-qty">
//         <button class="minus">-</button>
//         <span class="number">1</span>
//         <button class="plus">+</button>
//       </div>
//     </div>
//     <i class="fa-regular fa-trash-can card-remove"> </i>`;

//   // -------------------remove cart items when click trash box -----------
//   newCartBox.querySelector(".card-remove").addEventListener("click", () => {
//     newCartBox.remove();

//     updateTotalPrice();
//     updateCartCountBadge(-1);

//   });

//   //  . -------------------alert set when selected same item --------------
//   const cartDetailsName = bagMain.querySelectorAll(".cart-details-name");
//   for (let i of cartDetailsName) {
//     if (i.textContent === i_title) {
//       alert("Already on CART");
//       return;
//     }
//   }

//   // এটা শেষেই থাকবে
//   bagMain.appendChild(newCartBox);

//   newCartBox.querySelector('.cart-qty').addEventListener('click', (e) => {
//     const number = newCartBox.querySelector(".number");

//     let qty = parseInt(number.textContent, 10) || 1;
//     if(e.target.classList.contains("minus")){
//       if(qty > 1){
//         qty--;
//         number.textContent = qty;
//       }

//     }else if (e.target.classList.contains("plus")){
//       qty++;
//       number.textContent = qty;
//     }
//     updateTotalPrice();
//     // updateTotalPrice();

//   });
//   updateTotalPrice();
//   updateCartCountBadge(1);
// };

// //  . -------------------update total price  --------------
// const updateTotalPrice = () => {
//   const bagPrice = document.querySelector('#bag-price');
//   const cartBox = bagMain.querySelectorAll('.cart-box');
//   let total = 0;
//   cartBox.forEach( cb => {
//     const priceElement = cb.querySelector('.cart-price');
//     const numberElement = cb.querySelector('.number');
//     const prices = priceElement.textContent.replace( /[^0-9.-]/g, '');
//     const price = parseFloat(prices) || 0;
//     const qty = parseInt(numberElement.textContent, 10) || 1;

//     total += price * qty;
//   });
//   bagPrice.textContent = total.toFixed(2);
// };

// // --------------------------update count badge or count both----------
// const updateCartCountBadge = () => {
//   const cartItemCount = document.querySelector('#cartCount');
//   const totalItems = document.querySelector('#count');
//   const cartBox = bagMain.querySelectorAll('.cart-box');

//   let totalQty = 0;

//   cartBox.forEach( a => {
//     const qty = parseInt(a.querySelector('.number').textContent, 10) || 0;
//     totalQty +=  qty;
//   });
//   cartItemCount.textContent = totalQty;
//   totalItems.textContent = totalQty;

//   if(totalQty > 0){
//     cartItemCount.style.visibility = "visible";
//     totalItems.style.visibility = "visible";
//   }else{
//     cartItemCount.style.visibility = "hidden";
//     totalItems.style.visibility = "visible";

//   }
// };

// // ----------------------checkOut and clear ---------------------

// const alertBox = document.querySelector('.alertTxt');
// checkoutBtn.addEventListener("click", () => {

//   const cartBox = document.querySelectorAll('.cart-box');

//   if(cartBox.length === 0){
//      alertBox.innerHTML = "☹️ Your cart is empty";
//     return;
//   }

//   const total = document.getElementById("bag-price").textContent;
//   cartBox.forEach( cartBox => cartBox.remove());
//    updateCartCountBadge();
//    updateTotalPrice();
//     alertBox.innerHTML = `😀 Checkout successful! Total: ${total}`;
//     alertBox.style.color = "green";
//     return;

// })
// clearCartBtn.addEventListener("click", () => {

// const cartBox = bagMain.querySelectorAll('.cart-box');
// cartBox.forEach( cartBox => cartBox.remove());
//   updateCartCountBadge();
//   updateTotalPrice();
//   alertBox.innerHTML = " 😞 cart cleared!!";
//   alertBox.style.color = "red";

//  });

// ================ Load / init after DOM ready ================
document.addEventListener("DOMContentLoaded", () => {
  // =================== Elements part 1===================
  const bagCard = document.getElementById("bagCard");
  const bagClose = document.querySelector(".bagClose");
  const bagBtn = document.querySelector(".bag");

  // safe open/close
  bagBtn.addEventListener("click", () =>(bagCard.style.display = "block")
  );
  bagClose.addEventListener("click", () =>(bagCard.style.display = "none")
  );

  // =================== Elements part 2===================
  const buyBtn = document.querySelectorAll(".buyNow");
  const bagMain = document.querySelector(".bag-main");
  const clearCartBtn = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkOut");
  const alertBox = document.querySelector(".alertTxt"); // persistent messages like "cart cleared"
  const alertB = document.querySelector(".alert"); // duplicate-item tiny alert

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
    const i_imgSrc = i.querySelector(".shopCard-img .img-1")?.src || "";
    const i_title = i.querySelector(".sc-title")?.textContent || "No title";
    const i_price = i.querySelector(".sc-price")?.textContent || "$0";

    // duplicate check — always read current items
    const cartDetailsName = bagMain.querySelectorAll(".cart-details-name");
    for (let el of cartDetailsName) {
      if (el.textContent.trim() === i_title.trim()) {
        if (alertB) {
          alertB.innerHTML = "⚠️ Already in CART";
          alertB.style.top = "20%";
          alertB.style.color = "orange";
          setTimeout(() => {
            alertB.innerHTML = "";
            alertB.style.top = "-100%";
          }, 2000);
        }
        return;
      }
    }

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

    bagMain.appendChild(newCartBox);

    // qty handler for this box
    newCartBox.querySelector(".cart-qty").addEventListener("click", (e) => {
      const number = newCartBox.querySelector(".number");
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
    const cartBox = bagMain.querySelectorAll(".cart-box");
    let total = 0;
    cartBox.forEach((cb) => {
      const priceElement = cb.querySelector(".cart-price");
      const numberElement = cb.querySelector(".number");
      const prices = (priceElement?.textContent || "").replace(/[^0-9.-]/g, "");
      const price = parseFloat(prices) || 0;
      const qty = parseInt(numberElement?.textContent, 10) || 1;
      total += price * qty;
    });
    if (bagPrice) bagPrice.textContent = total.toFixed(2);
  }

  // ================ update cart count (both places) =================

  function updateCartCountBadge() {
    const cartItemCount = document.querySelector("#cartCount");
    const totalItems = document.querySelector("#count");
    const cartBox = bagMain.querySelectorAll(".cart-box");

    let totalQty = 0;
    cartBox.forEach((a) => {
      const qty = parseInt(a.querySelector(".number")?.textContent, 10) || 0;
      totalQty += qty;
    });

    if (cartItemCount) {
      cartItemCount.textContent = totalQty;
      cartItemCount.style.visibility = totalQty > 0 ? "visible" : "hidden";
    }
    if (totalItems) {
      totalItems.textContent = totalQty;
      totalItems.style.visibility = "visible";
    }
  }

  // ================ Clear & Checkout =================
  clearCartBtn?.addEventListener("click", () => {
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
