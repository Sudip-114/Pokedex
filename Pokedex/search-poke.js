const inputElement = document.querySelector("#search-input");
const search_icon = document.querySelector("#search-close-icon");
const sort_wrapper = document.querySelector(".sort-wrapper");

if (inputElement) {
    inputElement.addEventListener("input", () => {
        handleInputChange(inputElement);
    });
} else {
    console.error("Element with ID '#search-input' not found.");
}

if (search_icon) {
    search_icon.addEventListener("click", handleSearchCloseOnClick);
} else {
    console.error("Element with ID '#search-close-icon' not found.");
}

if (sort_wrapper) {
    sort_wrapper.addEventListener("click", handleSortIconOnClick);
} else {
    console.error("Element with class '.sort-wrapper' not found.");
}

function handleInputChange(inputElement) {
    const inputValue = inputElement.value;

    if (inputValue !== "") {
        document
            .querySelector("#search-close-icon")
            ?.classList.add("search-close-icon-visible");
    } else {
        document
            .querySelector("#search-close-icon")
            ?.classList.remove("search-close-icon-visible");
    }
}

function handleSearchCloseOnClick() {
    const inputElement = document.querySelector("#search-input");
    const searchIconElement = document.querySelector("#search-close-icon");

    if (inputElement) {
        inputElement.value = "";
    }
    if (searchIconElement) {
        searchIconElement.classList.remove("search-close-icon-visible");
    }
}

function handleSortIconOnClick() {
    const filterWrapper = document.querySelector(".filter-wrapper");
    const bodyElement = document.querySelector("body");

    if (filterWrapper) {
        filterWrapper.classList.toggle("filter-wrapper-open");
    }
    if (bodyElement) {
        bodyElement.classList.toggle("filter-wrapper-overlay");
    }
}
