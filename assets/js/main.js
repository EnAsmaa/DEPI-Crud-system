"use strict"
try
{
    const titleInput=document.getElementById("titleInput");
    const priceInput=document.getElementById("priceInput");
    const adsInput=document.getElementById("adsInput");
    const countInput=document.getElementById("countInput");
    const discountInput=document.getElementById("discountInput");
    const taxesInput=document.getElementById("taxesInput");
    const categoryInput=document.getElementById("categoryInput");
    const addBtn=document.getElementById("addBtn");
    const updateBtn=document.getElementById("editeBtn");
    const rowsData=document.getElementById("rows");
    const searchInput=document.getElementById("searchInput");
    const totalLabel=document.querySelector("label span");
    const itemsArr=JSON.parse(localStorage.getItem("items"))||[];

    renderItems(itemsArr);

    function saveData()
    {
        localStorage.setItem("items",JSON.stringify(itemsArr));
    }
// Add Function

    function addItem()
    {
        const item = {
            title:titleInput.value,
            price:priceInput.value,
            ads:adsInput.value,
            taxes:taxesInput.value,
            count:countInput.value,
            discount:discountInput.value,
            category:categoryInput.value
        }
        if (Object.values(item).every(val => val.trim() !== "")) 
        {
            itemsArr.push(item);
            saveData();
            renderItems(itemsArr);
            clearInputs();
            
        }
        else{ alert("Please fill data!");}
    }
    addBtn.addEventListener('click',()=>{
        
        addItem();
    })

// Display Function 

    function renderItems(arr)
    {
        let box=``;
        box += arr.map((el,index)=>{
            return( `    <tr>
                            <td>${index+1}</td>
                            <td>${el.title}</td>
                            <td>${el.price}</td>
                            <td>${el.taxes}</td>
                            <td>${el.category}</td>
                            <td>${calTotal(el)}</td>
                            <td><button class=" btn btn-warning border-0" onclick="updateData(${index})">Update</button></td>
                            <td><button class=" btn btn-danger border-0" onclick="deleteItem(${index})">Delete</button></td>
                        </tr>
                    `)
        }).join(' ');
        
        rowsData.innerHTML=box;
    }

// Delete Function

    function deleteItem(index)
    {
        itemsArr.splice(index,1);
        saveData();
        renderItems(itemsArr);
    }
    window.deleteItem=deleteItem;

// calculate total

    function calTotal(input)
    {
        const itemPrice = Number(input.price) || 0;
        const itemTaxes = Number(input.taxes) || 0;
        const itemAds = Number(input.ads) || 0;
        const itemDiscount = Number(input.discount) || 0;
        const itemCount = Number(input.count) || 1;
        return (itemAds + itemPrice + itemTaxes -itemDiscount)*itemCount;
    }

// update total

    function updateTotal()
    {
        const currentItem = {
            price:priceInput.value,
            ads:adsInput.value,
            taxes:taxesInput.value,
            count:countInput.value,
            discount:discountInput.value
        };
        totalLabel.innerText=calTotal(currentItem);
    }

    [priceInput, adsInput, taxesInput, discountInput, countInput].forEach(input => {
        input.addEventListener("input", updateTotal);
    });

// clear function

    function clearInputs()
    {
        titleInput.value = "";
        priceInput.value = "";
        adsInput.value = "";
        taxesInput.value = "";
        discountInput.value = "";
        countInput.value = 1;
        categoryInput.value = "";
        totalLabel.innerHTML = "";
    }

// update function
    let updatedIndex;
    function updateData(index)
    {
        updatedIndex = index;
        titleInput.value = itemsArr[index].title;
        priceInput.value = itemsArr[index].price;
        adsInput.value = itemsArr[index].ads;
        discountInput.value = itemsArr[index].discount;
        countInput.value = itemsArr[index].count;
        taxesInput.value = itemsArr[index].taxes;
        totalLabel.innerText=calTotal(itemsArr[index]);
        updateBtn.classList.replace('d-none','d-block');
        addBtn.classList.add('d-none');
        
    }
    window.updateData=updateData;

    function updateItem()
    {
        itemsArr[updatedIndex].title = titleInput.value;
        itemsArr[updatedIndex].price = priceInput.value;
        itemsArr[updatedIndex].ads = adsInput.value;
        itemsArr[updatedIndex].count = countInput.value;
        itemsArr[updatedIndex].taxes = taxesInput.value;
        itemsArr[updatedIndex].discount = discountInput.value;
        itemsArr[updatedIndex].category = categoryInput.value;
        updateBtn.classList.replace('d-block','d-none');
        addBtn.classList.remove('d-none');
    }
    updateBtn.addEventListener('click',()=>{
        updateItem();
        saveData();
        renderItems(itemsArr);
        clearInputs();
    })

// search function
    function searchItem(term)
    {
        let searchedArr=[];
        searchItem=itemsArr.filter((el)=>{
            if(el.title.trim().toLowerCase().includes(term.toLowerCase().trim()))
            {
                searchedArr.push(el);
            }
        })
        renderItems(searchedArr);
    }
    searchInput.addEventListener('input',()=>{
        searchItem(searchInput.value);
    })
    
// validation function
    function validation(input) {
        let regex = {
            titleInput : /^[a-z ,.'-]+$/i,
            priceInput : /^[1-9]\d*$/,
            countInput : /^\d+$/,
            categoryInput : /^[a-z ,.'-]+$/i
        };

        if (!regex[input.id].test(input.value.trim())) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
        else
        {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        }
    }

    titleInput.addEventListener('input',()=>{
        validation(titleInput);
    })
    priceInput.addEventListener('input',()=>{
        validation(priceInput);
    })
    countInput.addEventListener('input',()=>{
        validation(countInput);
    })
    categoryInput.addEventListener('input',()=>{
        validation(categoryInput);
    })

}
catch(err)
{
    console.log(err);
}
