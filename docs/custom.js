//* load categories from API

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// display categories got from API

const displayCategories = (categories) => {

  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";
  for (let category of categories) {
    const categoryPTag = document.createElement("p");
    categoryPTag.innerHTML = `
    <p id="category-btn-${category.id}" onclick="loadCategoryPlants(${category.id})" class="category-btn cursor-pointer hover:bg-green-400 rounded-full p-2 mt-2">
                ${category.category_name}
              </p>
    `;
    categoriesContainer.append(categoryPTag);
  }
};

// load all plants & active style add

const loadAllPlants = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((allPlants) => {
      removeActive();
      const allPlantsBtnClick = document.getElementById("all-trees-btn");
      allPlantsBtnClick.classList.add("active");
      displayPlants(allPlants.plants);
    });
};

// All tree btn display all trees

document
  .getElementById("all-trees-btn")
  .addEventListener("click", loadAllPlants);

//*display trees/plants

const displayPlants = (plants) => {

  const plantsCardContainer = document.getElementById("plants-card-container");
  plantsCardContainer.innerHTML = "";
  for (let plant of plants) {
    const plantCard = document.createElement("div");
    plantCard.innerHTML = `
    <div class="card bg-base-100 h-[600px] p-1 shadow-sm">
              <figure>
                <img
                  class="h-[250px] w-full "
                  src="${plant.image}"
                  alt=""
                />
              </figure>
              <div class="card-body p-2">
                <h2 onclick="loadTreeDetails(${plant.id})" class="card-title">${plant.name}</h2>
                <p class="text-gray-500">
                  ${plant.description}
                </p>
                <div class="card-actions justify-between items-center">
                  <div class="btn rounded-full bg-green-200 text-green-600">
                    ${plant.category}
                  </div>
                  <div class="font-semibold">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
                  </div>
                </div>
                <div>
                  <button onclick="displayCart(this)"
                    class=" bg-green-600 w-full rounded-full p-2 text-white cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
    `;
    plantsCardContainer.append(plantCard);
  }
  manageSpinner(false);
};


// load and display Category plants  & active Button style

const loadCategoryPlants = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const categoryBtn = document.getElementById(`category-btn-${id}`);
      categoryBtn.classList.add("active");
      displayPlants(data.plants);
    });
};

const removeActive = () => {
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => btn.classList.remove("active"));
  const allPlantsBtn = document.getElementById("all-trees-btn");
  allPlantsBtn.classList.remove("active");
};

// load plant details

const loadTreeDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((details) => displayTreeDetails(details.plants));
};

// display tree details

const displayTreeDetails = (tree) => {
  const treeDetailsContainer = document.getElementById(
    "tree-details-container"
  );
  treeDetailsContainer.innerHTML = `
            <div class="space-y-4 h-[400px]">
              <h2 class="font-bold">${tree.name}</h2>
              <img class="w-full h-[200px] rounded-xl" src="${tree.image}" alt="" />
              <p class="font-medium text-gray-500"><span class="font-bold text-black">Category: </span>${tree.category}</p>
              <p class="font-medium text-gray-500"><span class="font-bold text-black">Price: </span>${tree.price}</p>
              <p class="font-medium text-gray-500"><span class="font-bold text-black">Description: </span>${tree.description}</p>
            </div>
            `;
  document.getElementById("my_modal").showModal();
};

// add to cart cards
const displayCart = (btn) => {
  const name = btn.parentNode.parentNode.childNodes[1].innerText;
  const price = btn.parentNode.parentNode.childNodes[5].childNodes[3].innerText;

  const cartContainer = document.getElementById("cart-container");
  const cartCard = document.createElement("div");
  cartCard.innerHTML = `
           <div  
                class=" flex items-center justify-between bg-green-100 shadow mt-2 rounded-md p-2"
              >
                <div>
                  <h2 class="font-semibold">${name}</h2>
                  <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</p>
                </div>
                <p class="cursor-pointer" onclick="removeCartCard(this)">❌</p>
            </div>
  `;
  cartContainer.append(cartCard);

  // update the price of the cart total

  const totalPrice = document.getElementById("total-price").innerText;
  let currentTotal = Number(totalPrice) + Number(price);
  document.getElementById("total-price").innerText = currentTotal;
};

//*remove cart card by clicking icon

const removeCartCard = (e) => {
  // remove the cart card

  const cartDiv = e.parentNode.parentNode;
  cartDiv.innerHTML = "";

  // subtract the price from total price

  const totalPrice = document.getElementById("total-price").innerText;
  const price = e.parentNode.childNodes[1].childNodes[3].innerText;
  let currentTotal = Number(totalPrice) - Number(price);
  document.getElementById("total-price").innerText = currentTotal;
};

// *spinner

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plants-card-container").classList.add("hidden");
  } else {
    document.getElementById("plants-card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

loadCategories();
loadAllPlants();