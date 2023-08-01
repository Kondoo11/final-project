
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("myslides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
// ..................................................
//panier
let cartIcon=document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
cartIcon.addEventListener('click',add)

console.log(cartIcon);
console.log(cart);
console.log(closeCart);
// le panier(affichage,ajouts d objet retrait)
function add(){
cart.classList.add("active");
}
closeCart.addEventListener('click',remove)
function remove(){
    cart.classList.remove("active");
}
    
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}
function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length;i++){
        var button =removeCartButtons[i];
        button.addEventListener('click',removeCartItem);
    }
   
}
var quantityInputs =document.getElementsByClassName('cart-quantity');
for(var i=0; i < quantityInputs.length; i++){
    var input=quantityInputs[i];
    input.addEventListener('change',quantityChange)
}

function quantityChange(event){
    var input =event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();

}
 //add to cart
 var addCart = document.getElementsByClassName('fa-cart-arrow-down');
 for(var i=0; i< addCart.length;i++){
     var button= addCart[i];
     button.addEventListener('click',addCartClicked);
 }
 function removeCartItem(event){
    var buttonClicked= event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//add cart to 
function addCartClicked(event){
    var button =event.target;
    var shopProducts =button.parentElement;
    var title= shopProducts.getElementsByClassName('product-name')[0].innerText;
    var price= shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg= shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
}
function addProductToCart(title,price,productImg){
    var cartshopBox = document.createElement('div');
    cartshopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')[0];
    

var cartBoxContent=`
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price} FCFA</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!--remove cart-->
            <i class="fa fa-times cart-remove"></i>`;

    cartshopBox.innerHTML = cartBoxContent;
    cartItems.append(cartshopBox);
    cartshopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
    cartshopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChange);
}

//update total
function updateTotal(){
    var carContent =document.getElementsByClassName('cart-content')[0];
    var cartBoxes =document.getElementsByClassName('cart-box');
    var total=0;
    for(var i=0; i< cartBoxes.length;i++){
        var cartBox =cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement=cartBox.getElementsByClassName('cart-quantity')[0];
        var price=parseFloat(priceElement.innerText.replace("FCFA", " "));
        var quantity=quantityElement.value;
        total= total + (price * quantity)
        total= Math.round(total *100/100);
        document.getElementsByClassName('total-price')[0].innerText= total + "FCFA";
    }
}