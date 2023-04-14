// Global variables
var productName = document.getElementById("product-name");
var productCategory = document.getElementById("product-category");
var productPrice = document.getElementById("product-price");
var productDescription = document.getElementById("product-description");
var tableBody = document.getElementById("table-body");

var addButton = document.getElementById("addButton");
var error=document.getElementById("error");


if (localStorage.getItem("products") == null) {
    var products = [];
} else {
    var products = JSON.parse(localStorage.getItem("products"));
}

function addProduct() {

    if(productName.value==""||productCategory.value==""||productPrice.value==""||productDescription.value==""){
        error.innerHTML="Empty fields :(";
        productName.onclick=function(){
          error.innerHTML="";
        }
        productCategory.onclick=function(){
          error.innerHTML="";
        }
        productPrice.onclick=function(){
          error.innerHTML="";
        }
        productDescription.onclick=function(){
          error.innerHTML="";
        }
      }
      else{
    var product = {
        pName: productName.value,
        pCategory: productCategory.value,
        pPrice: productPrice.value,
        pDescription: productDescription.value
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    displayProduct();
    clearFields();
}}

function displayProduct() {
    str = "";
    for (i = 0; i < products.length; i++) {
        str +=
            `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].pName}</td>
            <td>${products[i].pCategory}</td>
            <td>${products[i].pPrice}</td>
            <td>${products[i].pDescription}</td>
            <td><button class = "btn btn-outline-primary" onclick="updateProducts(${i})">update</button></td>
            <td><button class = "btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = str;
}
displayProduct();

function clearFields() {
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";
}

function deleteProduct(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));

    displayProduct();
}

function updateProducts(k) {
    str = "";
    for (i = 0; i < products.length; i++) {
        if (i !== k) {

            str +=
                `
            <tr>
                <td>${i + 1}</td>
                <td>${products[i].pName}</td>
                <td>${products[i].pCategory}</td>
                <td>${products[i].pPrice}</td>
                <td>${products[i].pDescription}</td>
                <td><button class = "btn btn-outline-primary" onclick="updateProducts(${i})">update</button></td>
                <td><button class = "btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
            </tr>
            `
                ;
        } else {
            str +=
                `
            <tr>
                <td>${i + 1}</td>
                <td><input id="uproduct-name" value="${products[i].pName}" type="text" class="form-control"></td>
                <td><input id="uproduct-category" value="${products[i].pCategory}" type="text" class="form-control"></td>
                <td><input id="uproduct-price" value="${products[i].pPrice}" type="text" class="form-control"></td>
                <td><input id="uproduct-description" value="${products[i].pDescription}" type="text" class="form-control"></td>
                <td><button id="confirmBtn" class = "btn btn-outline-success" onclick="function update() {products[${i}].pName = document.getElementById('uproduct-name').value;products[${i}].pCategory = document.getElementById('uproduct-category').value;products[${i}].pPrice = document.getElementById('uproduct-price').value;products[${i}].pDescription = document.getElementById('uproduct-description').value;localStorage.setItem('products', JSON.stringify(products))};update();displayProduct();">Confirm</button></td>
                <td><button class = "btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
            </tr>
            `
                ;
        }

        tableBody.innerHTML = str;

    }

}

//search function
function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementsByTagName("table")[0];
    // console.log(table);
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                //
                let searched = document.getElementById("search").value.trim();
                if (searched !== "") {
                    let text = tr[i].getElementsByTagName("td")[1].innerText;
                    let re = new RegExp(searched, "g"); // search for all instances
                    let newText = text.replace(re, `<mark>${searched}</mark>`);
                    tr[i].getElementsByTagName("td")[1].innerHTML = newText;
                }
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
