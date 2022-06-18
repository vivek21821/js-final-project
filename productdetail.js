let productID = window.location.search.replace(/\D/g, "");

let productData = fetch(
  `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productID}`
);
let cartItem;

let container = document.createElement("div");
container.className = "container";

const mainContent = document.querySelector("#maincontent");
mainContent.prepend(container);

let leftsec = document.createElement("div");
leftsec.className = "leftsec";

let rightsec = document.createElement("div");
rightsec.className = "rightsec";

container.appendChild(leftsec);
container.appendChild(rightsec);

// left section
let leftImgContainer = document.createElement("div");
let imgPrev = document.createElement("img");

leftImgContainer.className = "leftimgcontainer";
leftImgContainer.appendChild(imgPrev);

let h2 = document.createElement("h2");
let brand = document.createElement("h3");
let priceLabel = document.createElement("h3");
let price = document.createElement("span");
let descriptionLabel = document.createElement("h3");
let description = document.createElement("p");
let previewLabel = document.createElement("h3");
let button = document.createElement("button");

const localData = JSON.parse(localStorage.getItem("cart"));

let totalCartitems = 0;
if (JSON.parse(localStorage.getItem("cart")) !== null) {
  for (let i = 0; i < localData.length; i++) {
    totalCartitems += localData[i].quantity;
  }
}

// let count = 0;
productData
  .then((resp) => resp.json())
  .then((productData, i) => {
    //fetching content
    // right section
    h2.innerText = productData.name;
    brand.innerText = productData.brand;
    priceLabel.innerText = `Price: Rs `;
    price.innerText = productData.price;
    priceLabel.append(price);
    descriptionLabel.innerText = "Description";
    description.innerText = productData.description;
    description.classList.add("description");
    previewLabel.innerText = "Product Preview";
    button.id = "addtocart";
    button.innerText = "Add to Cart";
    rightsec.appendChild(h2);
    rightsec.appendChild(brand);
    rightsec.append(priceLabel);
    rightsec.appendChild(descriptionLabel);
    rightsec.appendChild(description);
    rightsec.appendChild(previewLabel);

    let imgContainer = document.createElement("div");
    imgContainer.className = "imgcontainer";

    // fetching preview images
    productData.photos.map((p, i) => {
      let imgBox = document.createElement("div");
      imgBox.className = "imgbox";
      let previewPhoto = document.createElement("img");
      previewPhoto.src = p;
      previewPhoto.id = i; // getting id to check first image
      previewPhoto.alt = "Image";
      imgBox.appendChild(previewPhoto);
      imgContainer.appendChild(imgBox);

      // active first preview image
      if (i == 0) {
        previewPhoto.classList.add("active"); // add active class to first item
        imgPrev.src = previewPhoto.src; // preview first active item to preview section
      }
      previewPhoto.addEventListener("click", () => {
        var activeEle = document.querySelector(".active"); // getting active class
        activeEle.classList.remove("active"); // remove active class
        previewPhoto.classList.add("active"); // add active class to clicked item
        imgPrev.src = previewPhoto.src; // preview active image
      });
    });
    leftsec.appendChild(leftImgContainer);
    rightsec.appendChild(imgContainer);
    rightsec.appendChild(button);
    let cart = document.querySelector("#count");

    let productPrice = productData.price;
    if (productData.quantity == null) {
      productData.quantity = 1;
    } else {
      productData.quantity += 1;
    }

    if (
      localStorage.getItem("cart") == null ||
      localStorage.getItem == "" ||
      localStorage.length === 0
    ) {
      cartItem = [];
    } else {
      cartItem = JSON.parse(localStorage.getItem("cart"));
    }

    button.addEventListener("click", () => {
      if (JSON.parse(localStorage.getItem("cart")) == null) {
        cart.innerText = 0;
        totalCartitems += 1;
        cart.innerText = totalCartitems;
        cartItem.push(productData);
      } else {
        if (
          JSON.parse(localStorage.getItem("cart")).some(
            (object) => object.id === productData.id
          )
        ) {
          // productData.quantity += 1;
          // productData.price += productPrice;

          cartItem.map((item, i) => {
            if (item.id === productID) {
              // console.log(i);
              cartItem[i] = {
                ...cartItem[i],
                price: cartItem[i].price + parseInt(price.innerText),
                quantity: cartItem[i].quantity + 1,
              };
            }
          });

          localStorage.setItem("cart", JSON.stringify(cartItem));
        } else {
          cartItem.push(productData);
        }
        totalCartitems += 1;
        cart.innerText = totalCartitems;
      }
      // count++;
      localStorage.setItem("cart", JSON.stringify(cartItem));
    });

    if (JSON.parse(localStorage.getItem("cart")) == null) {
      cart.innerText = 0;
    } else {
      cart.innerText = totalCartitems;
    }
  })
  .catch((e) => {
    console.log(e);
  });
