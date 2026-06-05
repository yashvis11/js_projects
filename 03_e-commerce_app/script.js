document.addEventListener("DOMContentLoaded", ()=>{
    let products = [
      {id: 1, name: "Product 1", price: 50.0},
      {id: 2, name: "Product 2", price: 32.36},
      {id: 3, name: "Product 3", price: 15.23}
    ];

    let cart = [];
    let ctr = 0; //counter variable for checkout total
    const listContainer = document.getElementById("product-list");
    const cartContainer = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("empty-cart");
    const cartTotalContainer = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    //for each of the products
    products.forEach(product => {
      //create ul append it to the listContainer and create li further append it to the ul
      //apply class "product" to li
      const list = document.createElement("ul");
      listContainer.appendChild(list);

      const li = document.createElement("li");
      li.innerHTML = `<span>${product.name}</span>
      <span>Rs. ${product.price}</span>
      <button>Add to cart</button>`;
      li.classList.add('product');
      list.appendChild(li);

      //adding the product to the cart array
      li.querySelector("button").addEventListener("click", () => {
        cart.push(product);
        displayCart(); //to display cart products
      });

      function displayCart(){
        //remove the cart is empty message when product is added
        emptyMessage.classList.add('hidden');
        cartTotalContainer.classList.remove("hidden");

        //create ul and li for cart like products list
        const cartList = document.createElement("ul");
        cartContainer.appendChild(cartList);

        const cartItem = document.createElement("li");
        cartItem.innerHTML = `<span>${product.name}</span>
        <span>Rs. ${product.price}</span>`;
        cartItem.classList.add('product');
        cartList.appendChild(cartItem);

        //calculate total price for checkout whenever a product is added
        totalPrice.innerHTML = `${ctr+product.price}`;
        ctr= ctr+product.price;//the new price is the new total
      }
    });
          checkoutButton.addEventListener("click", () => {
            alert("Checkout successful!");
          });
    })