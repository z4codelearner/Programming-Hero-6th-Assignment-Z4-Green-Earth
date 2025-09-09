//* load categories from API

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

//* display categories got from API

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
