console.log("FrontEnd JS ishga tushdi...");

let createField = document.getElementById("create-field");

// CREATE
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    axios
    .post("/create-item", {reja: createField.value})
    .then((resposnse) => {
        // console.log(resposnse);

        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(resposnse.data)); 
        createField.value = "";
        createField.focus();
    })
    .catch((err) => {
        console.log("Please, try again!", err);
    });
});

function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
                <span class="item-text">${item.reja}</span>
                <div>
                    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>`;
}

// DELETE
document.addEventListener("click", function(e) {
    const deleteButton = e.target.closest(".delete-me");
    // console.log(e.target);
    if(deleteButton) {
        const buttonID = deleteButton.dataset.id;
        e.preventDefault();
        if(confirm("Are you sure to delete this?")) {
            axios
            .post("/delete-me", {id: buttonID})
            .then((response) => {
                console.log(response.data);
                deleteButton.parentElement.parentElement.remove();
            })
            .catch((err) => {
                console.log("Please, try again!", err);
            });
        }
    }
});

// EDIT
document.addEventListener("click", function(e) {
    const editButton = e.target.closest(".edit-me");
    if(editButton) {
        const buttonID = editButton.dataset.id;
        const item = e.target.parentElement.parentElement.querySelector(".item-text");

        const userInput = prompt("Please, edit your plan", item.innerHTML);

        if(userInput) {
            axios
            .post("/edit-item", {
                id: buttonID,
                new_input: userInput,
            })
            .then((response) => {
                console.log(response.data);
                item.innerHTML = userInput;
            })
            .catch((err) => {
                console.log("Please, try again!", err);
            });
        }
        
    }
});

// DELETE ALL
document.getElementById("clean-all").addEventListener("click", () => {
  axios
    .post("/delete-all")
    .then(res => {
      alert(res.data.state);
      location.reload();
    })
    .catch(err => console.error(err));
});
