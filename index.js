const container = document.getElementById("container");
container.style.backgroundColor = "#f4f4f4"

const formInfo = document.querySelector("#myForm");
const listItems = document.getElementById("items")


formInfo.addEventListener("submit", submit);
listItems.addEventListener("click", Editbtn);


let targetli = null;
let isEditFlow = false;

function submit(e) {
    e.preventDefault();
    formInfo.style.background = "#ccc";
    const expenceAmount = document.getElementById("ExpenceAmount").value;
    const discription = document.getElementById("discription").value;
    const catagory = document.getElementById("catagory").value;


    // CREATING NEW ELEMENT
    let liElement = null;
    // const elementAlreadyExist = localStorage.getItem(email);
    if (isEditFlow) {
        liElement = editLiElement(expenceAmount, discription, catagory);
    } else {
        liElement = createLiElement(expenceAmount, discription, catagory);
    }
    if (liElement !== null) {
        listItems.appendChild(liElement)
    }

    // STORE IN LOCAL STORAGE AFTER SUCCESSFULLY ADDED/EDITED
    localStorage.setItem(expenceAmount, JSON.stringify({
        expenceAmount,
        discription,
        catagory
    }));
    resetForm();
}

function createLiElement(expenceAmount, discription, catagory) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = expenceAmount;
    li.appendChild(document.createTextNode(`* ${expenceAmount} ${discription} ${catagory}`));
    // CREATING NEW DELETE BUTTON IN LI ELEMENT
    li.appendChild(deleteBtn(expenceAmount));
    li.appendChild(Editbtn(expenceAmount, discription, catagory));
    return li;
}

function editLiElement(expenceAmount, discription, catagory) {
    const li = document.getElementById(expenceAmount);
    li.textContent = `* ${expenceAmount} ${catagory}`;
    li.appendChild(deleteBtn(expenceAmount));
    li.appendChild(Editbtn(expenceAmount, discription, catagory));
    isEditFlow = false;
    return li;
}

function deleteBtn(expenceAmount) {
    const deleteBtn = document.createElement("delete");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.id = `${expenceAmount}_delete`;
    deleteBtn.appendChild(document.createTextNode("Delete"))
    deleteBtn.onclick = (e) => {
        if (e.target.classList.contains('delete')) {
            if (confirm('Are you sure')) {
                const li = e.target.parentElement;
                listItems.removeChild(li);
                localStorage.removeItem(expenceAmount);
            }
        }
    }
    return deleteBtn;
}
// defining edit function
function Editbtn(expenceAmount, discription, catagory) {
    const Editbatn = document.createElement("button");
    Editbatn.className = "btn btn-yellow btn-sm float-left Edit"
    Editbatn.id = `${expenceAmount}_edit`;
    Editbatn.appendChild(document.createTextNode("Edit"))
    Editbatn.onclick = (e) => {
        if (e.target.classList.contains('Edit')) {
            document.getElementById("ExpenceAmount").value = expenceAmount;
            document.getElementById("discription").value = discription;
            document.getElementById("catagory").value = catagory;
            document.getElementById("ExpenceAmount").focus();
            isEditFlow = true;
            // localStorage.removeItem(email);
        }
    }
    return Editbatn;
}

function resetForm() {

    document.getElementById("ExpenceAmount").value = null;
    document.getElementById("discription").value = null;
    document.getElementById("catagory").value = null;
}