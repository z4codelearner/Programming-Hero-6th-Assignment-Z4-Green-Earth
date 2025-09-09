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