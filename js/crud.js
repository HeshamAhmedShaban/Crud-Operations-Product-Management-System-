

    var title=document.getElementById("title");
    var price=document.getElementById("price");
    var taxes=document.getElementById("taxes");
    var ads=document.getElementById("ads");
    var discound=document.getElementById("discound");
    var total=document.getElementById("total");
    var count=document.getElementById("count");
    var category=document.getElementById("category");
    var submit=document.getElementById("submit");

    let mood ='create';
    let tmp;
    
    //console.log(title,price,taxes,ads,discound,total,count,category,submit);


// function to get total price

    function getTotal(){
        if(price.value !=""){
            let result=(+price.value + +taxes.value + +ads.value)- +discound.value;
            total.innerHTML = result;
            total.style.background="green";
        }else{
            total.innerHTML= "";
            total.style.background="d51e1e";
        }
    }

// function to create product


    let dataPro;       // condition becouse refresh page data still in localstorage
    if(localStorage.product != null) // if localstorage != "    "
        dataPro=JSON.parse(localStorage.product)// array=datapro[data]
    else // if localstorage = "    "
        dataPro=[];     // array=dataPro =[empty] 
        
        // when storage any data store in array

    submit.onclick=function(){
    
    var objData={ 
                                    // when select some data collection in obj and push in array
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discound:discound.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    // clean data (must all input have value)!

        if(title.value !=''&&price.value !=''&&category.value !="" &&objData.count<=100){  
            if(mood === 'create'){
            // count (create any number of products when click in create)
                if(objData.count >1){       // if obj.count have any number >1  print into page 
                    for(var i=0;i<objData.count;i++){   // loop data collection (object)
                        dataPro.push(objData);    // create/print number of obj.count =product 
                    }
                }else{  // else obj.count = 0, <1  
                    dataPro.push(objData);  //  after collection data put in array  //create 1 product becouse objData.count <1
                }
            }else{

                dataPro[tmp] = objData;
                mood ='create';
                submit.innerHTML="Create";
                count.style.display='block';
                
            }
            cleardata() // function to clear data in inputs when click on submit
        }

    localStorage.setItem('product',JSON.stringify(dataPro));  
    // save data  in localstorage (data in localstorge = string =>json.stringify())

    // save data to localstorage
    

    showData() // function to add product in table thats start when click on submit
    }





// clear inputs when user create product

    function cleardata(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discound.value='';
        title.innerHTML='';
        count.value='';
        category.value='';
    }



// read produt in table after create product

    function showData(){

        getTotal()

    let table='';  // create variable to save into the product data
    for(let i =0 ; i < dataPro.length ;i++){    // loop in array of data  
            // Temblite letirals9
        table +=`   
    <tr>                                                                
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discound}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateproduct(${i});"  id="update">Update</button></td>
        <td><button onclick="deleteproduct(${i});" id="delete">Delete</button></td>
    </tr>
                `
        
    }   
        let tbody =document.getElementById("tbody");  // declare tbody in javascribt
        tbody.innerHTML=table;  // save product data into tbodi in innerHTML

    // delete all products if array have any data
        let btndeleteAll=document.getElementById("deleteall");  // declare div have btn delete all
        if(dataPro.length > 0){     // if array of data have data
            // // input button on div 
            btndeleteAll.innerHTML=`    
            <button onclick="deleteAll();" >Delete All (${dataPro.length})</button>
            `
        }else{//else array of data not have data
            btndeleteAll.innerHTML='';  //  display none of button
        }
    }

    showData()


// delete on product when click in delete button

    function deleteproduct(index){

        console.log(index);   // pro  =>  product id when i clicked to delete 

        dataPro.splice(index,1);  // delete product into array od data

        localStorage.product=JSON.stringify(dataPro);  // upgrade data of localstorage

        showData()  // when delete i show deleted product becouse showData() have all html product 
    }


    function deleteAll(){

        localStorage.clear();  // clear data fron localstorage

        dataPro.splice(0);      // clear data from array

        showData();         // call back function to delete data in frontend / page 
        
    }


// update on product when click in update button

    function updateproduct(i){
        title.value=dataPro[i].title;
        price.value=dataPro[i].price;
        taxes.value=dataPro[i].taxes;
        ads.value=dataPro[i].ads;
        discound.value=dataPro[i].discound;
        getTotal();
        count.style.display="none";
        category.value=dataPro[i].category;
        submit.innerHTML="Update";
        mood='update';
        tmp = i;
        scroll({
            top:0,
            behavior:'smooth'
        })
    }

// search on pruduct

    let searchMood='title';
    
        
    function getSearchMood(id){
        let search=document.getElementById("search");
        if(id == 'searchTitle'){
            searchMood='Title';
            // search.placeholder='Search By Title'
        }else{
            searchMood='Category';
            // search.placeholder='Search By Category';
        }
        search.placeholder='Search By '+searchMood;
        search.focus();
        search.value='';
        showData();
    } 


    function searchProducts(value){

        let table='';
        if(searchMood =='title'){
            for(let i =0 ;i<dataPro.length;i++){
                if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                    table +=`   
                        <tr>                                                                
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discound}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateproduct(${i});"  id="update">Update</button></td>
                            <td><button onclick="deleteproduct(${i});" id="delete">Delete</button></td>
                        </tr>
                `
                }
            }
        }else{
            for(let i =0 ;i<dataPro.length;i++){
                if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                    table +=`   
                        <tr>                                                                
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discound}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateproduct(${i});"  id="update">Update</button></td>
                            <td><button onclick="deleteproduct(${i});" id="delete">Delete</button></td>
                        </tr>
                `
                }
            }
        }
        let tbody =document.getElementById("tbody");  
        tbody.innerHTML=table;
    }
