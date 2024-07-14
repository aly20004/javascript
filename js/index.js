let home_menu;
let home_element;
let cat_element;
let sub_cat_element;
let area_element;
let area_meals;
let ing_element;
let ing_meals;
let meals = [];
let recipies;
let left_side = $("#leftSide").innerWidth();
let category = document.getElementById("categories");
let areaa = document.getElementById("area");
let ingredient = document.getElementById("ingredients");
let search = document.getElementById("search");
let searchSection = document.getElementById("search_section");
let searchNameInput = document.getElementById("searchByName");
let searchLetterInput = document.getElementById("searchByLetter");
let contactSec = document.getElementById("contact");
let submitSection = document.getElementById("submit_section");
let homeSection = document.getElementById("home_section");
console.log(left_side);

$("#sidebar").animate({ left: `-${left_side}px` }, 0);
$("#close").on("click", function () {
    $("#sidebar").animate({ left: `-${left_side}px` }, 1000);
    $("#close").addClass("d-none");
    $("#show").removeClass("d-none");

    $("#search").css({ top: 0, position: 'relative', opacity: `1` }).animate({ top: 100, opacity: `0` }, 1500)
    $("#categories").css({ top: 0, position: 'relative', opacity: `1` }).animate({ top: 100, opacity: `0` }, 1200)
    $("#area").css({ top: 0, position: 'relative', opacity: `1` }).animate({ top: 100, opacity: `0` }, 900)
    $("#ingredients").css({ top: 0, position: 'relative', opacity: `1` }).animate({ top: 100, opacity: `0` }, 600)
    $("#contact").css({ top: 0, position: 'relative', opacity: `1` }).animate({ top: 100, opacity: `0` }, 300)

});
$("#show").on("click", function () {
    $("#sidebar").animate({ left: `0px` }, 1000);
    $("#close").removeClass("d-none");
    $("#show").addClass("d-none");
    console.log("he");

    $("#search").css({ top: 100, position: 'relative', opacity: `0` }).animate({ top: 0, opacity: `1` }, 1200)
    $("#categories").css({ top: 100, position: 'relative', opacity: `0` }).animate({ top: 0, opacity: `1` }, 1500)
    $("#area").css({ top: 100, position: 'relative', opacity: `0` }).animate({ top: 0, opacity: `1` }, 1800)
    $("#ingredients").css({ top: 100, position: 'relative', opacity: `0` }).animate({ top: 0, opacity: `1` }, 2100)
    $("#contact").css({ top: 100, position: 'relative', opacity: `0` }).animate({ top: 0, opacity: `1` }, 2400)

})


async function mealsOfHome() {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    var data = await response.json();
    return data;
}
async function searchById(id) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var data = await response.json();
    return data;
}
async function getCategories() {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var data = await response.json();
    return data;
}
async function filterByCategory(cat) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    var data = await response.json();
    return data;
}
async function getArea() {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var data = await response.json();
    return data;
}
async function filterByArea(ar) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ar}`);
    var data = await response.json();
    return data;
}
async function getIngredient() {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var data = await response.json();
    return data;
}
async function filterByIngredient(ar) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ar}`);
    var data = await response.json();
    return data;
}
async function filterByName(name) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    var data = await response.json();
    return data;
}
async function filterByletter(letter) {
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    var data = await response.json();
    return data;
}
console.log(filterByletter("c"));
function setClass() {
    home_element = document.querySelectorAll(".home_menu");
    for (let i = 0; i < 20; i++) {
        home_element[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            display_recipes(await searchById(x));
        })
    }
}
function display_home(x) {

    var cartona = ``;
    for (let i = 0; i < 20; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
                <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x[i].idMeal}" >
                    <div
                        class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex justify-content-start align-items-center text-black">
                        <h3 class="ms-2">${x[i].strMeal}</h3>
                    </div>
                    <img src="${x[i].strMealThumb}" alt="main dish" class="w-100">
                </div>
            </div>`;

    }
    document.getElementById("rowdata").innerHTML = cartona;
    setClass();

};

function display_recipes(w) {
    searchSection.classList.add("d-none");
    var cartona = ``;
    let k = w.meals[0];
    let miniCartona = ``
    for (let i = 1; i < 21; i++) {
        if (k[`strIngredient${i}`]) {
            miniCartona += `
                            <li
                                class="recipes btn btn-primary btn-lighblue mb-2">${k[`strIngredient${i}`]}
                            </li>`
        }
    }
    cartona += `<div class="col-3">
                    <img src="${w.meals[0].strMealThumb}" alt="" class="w-100 rounded-2">
                    <h3>${w.meals[0].strMeal}</h3>
                </div>
                <div class="col-9 px-4">
                    <h2>Instructions</h2>
                    <p>${w.meals[0].strInstructions}</p>
                    <h3><span>Area:</span> ${w.meals[0].strArea}</h3>
                    <h3><span>Category:</span>${w.meals[0].strCategory}</h3>
                    <h3>Recipes:</h3>
                    <div class="d-flex mb-2">
                        <ul id="multiIng"></ul>
                    </div>
                    <h3 class="mb-2">Tags:</h3>
                    <p class="recipes rounded-2 d-inline-block tag">${w.meals[0].strTags}</p>
                    <br>
                    <button class="btn btn-success mt-3 rounded-2"><a href="${w.meals[0].strYoutube}" target="_blank">Source</a></button>
                    <button class="btn btn-danger mt-3 rounded-2"><a href="${w.meals[0].strYoutube}" target="_blank">Youtube</a></button>
                </div>`;
    document.getElementById("rowdata").innerHTML = cartona;
    document.getElementById("multiIng").innerHTML = miniCartona;

}
async function run() {
    var home = await mealsOfHome();
    display_home(home.meals);
}
run();


function displayCategory(x) {
    searchSection.classList.add("d-none");
    let cartona = ``;
    for (let i = 0; i < 13; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x.categories[i].strCategory}">
        <div
            class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex flex-column justify-content-centre align-items-centre text-black">
            <h3 class="ms-2">${x.categories[i].strCategory}</h3>
            <p>${x.categories[i].strCategoryDescription}</p>
        </div>
        <img src="${x.categories[i].strCategoryThumb}" alt="main dish" class="w-100">
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    cat_element = document.querySelectorAll(".home_menu");
    for (let i = 0; i < 13; i++) {
        cat_element[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            console.log(x);
            displaySubCategory(await filterByCategory(x));
        })
    }
}
function displaySubCategory(x) {
    let cartona = ``;
    for (let i = 0; i < x.meals.length; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x.meals[i].idMeal}">
        <div
            class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex justify-content-centre align-items-centre text-black">
            <h3 class="ms-2">${x.meals[i].strMeal}</h3>
        </div>
        <img src="${x.meals[i].strMealThumb}" alt="main dish" class="w-100">
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    sub_cat_element = document.querySelectorAll(".home_menu");
    for (let i = 0; i < x.meals.length; i++) {
        sub_cat_element[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            display_recipes(await searchById(x));
        })
    }
}
category.addEventListener("click", async function () {
    let x = await getCategories();
    displayCategory(x);
})

function displayArea(x) {
    searchSection.classList.add("d-none");
    let cartona = ``;
    for (let i = 0; i < x.meals.length; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu area_hov" id="${x.meals[i].strArea}">
        <div class="text-center icon"><i class="fa-solid fa-house-laptop"></i></div>
        <h3 class="ms-2 text-center">${x.meals[i].strArea}</h3>
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    area_element = document.querySelectorAll(".home_menu");
    for (let i = 0; i < x.meals.length; i++) {
        area_element[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            displayAreaMeals(await filterByArea(x));
        })
    }
}
function displayAreaMeals(x) {
    let cartona = ``;
    for (let i = 0; i < x.meals.length; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x.meals[i].idMeal}">
        <div
            class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex justify-content-centre align-items-centre text-black">
            <h3 class="ms-2">${x.meals[i].strMeal}</h3>
        </div>
        <img src="${x.meals[i].strMealThumb}" alt="main dish" class="w-100">
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    area_meals = document.querySelectorAll(".home_menu");
    for (let i = 0; i < x.meals.length; i++) {
        area_meals[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            display_recipes(await searchById(x));
        })
    }
}
function displayIngredients(x) {
    searchSection.classList.add("d-none");
    let cartona = ``;
    for (let i = 0; i < 20; i++) {
        o = x.meals[i].strIngredient.replaceAll(" ", "_");
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu area_hov" id="${o}">
        <div class="text-center icon"><i class="fa-solid fa-drumstick-bite"></i></div>
        <h3 class="ms-2 text-center">${x.meals[i].strIngredient}</h3>
        <p class="ms-2 text-center trunk">${x.meals[i].strDescription}</p>
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    ing_element = document.querySelectorAll(".home_menu");
    for (let i = 0; i < 20; i++) {
        ing_element[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            displayMealsOfIngredient(await filterByIngredient(x));

        })
    }
}
function displayMealsOfIngredient(x) {
    let cartona = ``;
    for (let i = 0; i < x.meals.length; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x.meals[i].idMeal}">
        <div
            class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex justify-content-centre align-items-centre text-black">
            <h3 class="ms-2">${x.meals[i].strMeal}</h3>
        </div>
        <img src="${x.meals[i].strMealThumb}" alt="main dish" class="w-100">
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    ing_meals = document.querySelectorAll(".home_menu");
    for (let i = 0; i < x.meals.length; i++) {
        ing_meals[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            display_recipes(await searchById(x));
        })
    }
}
function displayFilterByName(x) {
    let cartona = ``;
    for (let i = 0; i < x.meals.length; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x.meals[i].idMeal}">
        <div
            class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex justify-content-centre align-items-centre text-black">
            <h3 class="ms-2">${x.meals[i].strMeal}</h3>
        </div>
        <img src="${x.meals[i].strMealThumb}" alt="main dish" class="w-100">
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    ing_meals = document.querySelectorAll(".home_menu");
    for (let i = 0; i < x.meals.length; i++) {
        ing_meals[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            display_recipes(await searchById(x));
        })
    }
}
function displayFilterByLetter(x) {
    let cartona = ``;
    for (let i = 0; i < x.meals.length; i++) {
        cartona += `<div class="col-sm-12 col-md-3 px-3 py-2 " >
    <div class="inner rounded position-relative overflow-hidden hov home_menu" id="${x.meals[i].idMeal}">
        <div
            class="position-absolute top-0 end-0 bottom-0 start-0 layer d-flex justify-content-centre align-items-centre text-black">
            <h3 class="ms-2">${x.meals[i].strMeal}</h3>
        </div>
        <img src="${x.meals[i].strMealThumb}" alt="main dish" class="w-100">
    </div>
</div>`;
    }
    document.getElementById("rowdata").innerHTML = cartona;
    ing_meals = document.querySelectorAll(".home_menu");
    for (let i = 0; i < x.meals.length; i++) {
        ing_meals[i].addEventListener('click', async function (e) {
            let x = e.currentTarget.getAttribute("id");
            display_recipes(await searchById(x));
        })
    }
}
areaa.addEventListener("click", async function () {
    let x = await getArea();
    displayArea(x);
})
ingredient.addEventListener("click", async function () {
    let x = await getIngredient();
    displayIngredients(x);
})
search.addEventListener("click", async function () {
    searchSection.classList.remove("d-none");
    document.getElementById("rowdata").innerHTML = "";
    searchNameInput.addEventListener("input", async function () {
        searchLetterInput.value = null;
        displayFilterByName(await filterByName(searchNameInput.value));
    });
    searchLetterInput.addEventListener("input", async function () {
        searchNameInput.value = null;
        var regex = {
            input: /^[a-zA-Z]{1}$/
        }
        if (regex["input"].test(searchLetterInput.value) == true) {
            displayFilterByLetter(await filterByletter(searchLetterInput.value));
        }
        else {
            searchLetterInput.value = null;
        }

    })

});
contactSec.addEventListener("click", function (e) {

    cartona = ``;
    cartona += `<div class="container mt-5 " id="submit_section">
        <div class="inner p-3 d-flex flex-column align-items-center justify-content-center gap-2 mt-5">
            <div class="d-flex justify-content-center align-items-center mb-2 gap-4">
                <div>
                    <input type="text" class="form-control bg-white text-black" placeholder="enter your name" id="userName">
                    <div class="alert alert-danger mt-2 d-none" role="alert">
                        please enter valid name
                    </div>
                </div>
                <div>
                    <input type="email" class="form-control bg-white text-black" placeholder="enter your email" id="userEmail">
                    <div class="alert alert-danger mt-2 d-none" role="alert">
                        please enter valid email
                    </div>
                </div>

            </div>
            <div class="d-flex justify-content-center align-items-center mb-2 gap-4">
                <div>
                    <input type="number" class="form-control bg-white text-black" placeholder="enter your phone" id="userPhone">
                    <div class="alert alert-danger mt-2 d-none" role="alert">
                        please enter valid phone
                    </div>
                </div>
                <div>
                    <input type="number" class="form-control bg-white text-black" placeholder="enter your age" id="userAge">
                    <div class="alert alert-danger mt-2 d-none" role="alert">
                        please enter valid age
                    </div>
                </div>

            </div>
            <div class="d-flex justify-content-center align-items-center gap-4">
                <div>
                    <input type="password" class="form-control bg-white text-black" placeholder="enter your Password" id="userPasword">
                    <div class="alert alert-danger mt-2 d-none" role="alert">
                        please enter valid password
                    </div>
                </div>
                <div>
                    <input type="password" class="form-control bg-white text-black" placeholder="rePassword" id="userChPaswword">
                    <div class="alert alert-danger mt-2 d-none " role="alert">
                        password not matched
                    </div>
                </div>

            </div>
            <button id="submitBtn" disabled="true" class="btn btn-outline-danger px-2 mt-3">Submit</button> 
        </div>
    </div>`;
    document.getElementById("rowdata").innerHTML = cartona;
    $("input").on("input", function (e) {
        let regex = {
            userName: /^[a-z0-9_-]{3,15}$/,
            userEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            userPhone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            userAge: /^[1-9][[0-9]$/,
            userPasword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            userChPaswword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

        }
        if (regex[e.target.id].test(e.target.value) == true) {
            console.log("match");
            $(`#${e.target.id}`).removeClass("is-invalid").addClass("is-valid")
            $(`#${e.target.id}`).next().removeClass("d-block").addClass("d-none")
        } else {
            console.log("Not Match");
            $(`#${e.target.id}`).removeClass("is-valid").addClass("is-invalid")
            $(`#${e.target.id}`).next().removeClass("d-none").addClass("d-block")
        }
        if ($("#userName").hasClass("is-valid") && $("#userEmail").hasClass("is-valid") && $("#userPhone").hasClass("is-valid")
            && $("#userAge").hasClass("is-valid") && $("#userPasword").hasClass("is-valid") && $("#userChPaswword").hasClass("is-valid") && $("#userPasword")[0].value == $("#userChPaswword")[0].value) {
            $("#submitBtn").attr("disabled", false)
            $("#submitBtn").removeClass("btn-outline-danger").addClass("btn-outline-success")
        }
        else {
            $("#submitBtn").addClass("btn-outline-danger").removeClass("btn-outline-success")
            $("#userChPaswword").removeClass("is-valid").addClass("is-invalid")
        }
    })

})
