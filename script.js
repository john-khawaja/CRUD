let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let tmp;

let mode = 'Create';

// get total

function getTotal() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
        total.style.color = 'white';
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = 'red';
        total.style.color = 'white';
    }
}

// create

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if(title.value == ''){
        title.focus();
}

    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 101){
    if(mode === 'Create') {
       if(newPro.count > 1) {
        for(let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
        }else{
            dataPro.push(newPro);
        } 
    }else{
        dataPro[tmp] = newPro;
        mode = 'Create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearData();
}
    
    // save local storage
    localStorage.setItem('product', JSON.stringify(dataPro));

    showData();
};

// delete

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData() {
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
        <td class="first">${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
}
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0) {
        btnDelete.innerHTML = `
         <button onclick="deleteAll()">Delete all (${dataPro.length})</button>
         `;
    }else {
        btnDelete.innerHTML = '';
    }
}

showData();

// delete

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
    title.focus();
}

// search

let searchMode = 'title';
function getSearchMode(id) {
    let search = document.getElementById('search');
    if(id === 'searchTitle'){
        searchMode = 'title';
    }else{
        searchMode = 'category';
    }
    search.placeholder = 'Search by ' + searchMode;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
    if(searchMode === 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td class="first-row">${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
    }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td class="first-row">${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// control data

