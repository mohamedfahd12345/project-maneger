// window.onload = function(){

let title=document.getElementById('title');
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let btndelete=document.getElementById('deleteall');

let mood='create';
let temp_index;
let datapro=[];
if(localStorage.product!=null){
datapro=JSON.parse(localStorage.product);
}




function gettotal(){
        if(price.value!=''){
            let ans=(+price.value + +taxes.value + +ads.value) - +discount.value; // add + to convet to numbers
            total.innerHTML=ans;
        }
        else{
            total.innerHTML='';
        }
    }
    // input
    price.onkeyup=gettotal;
    taxes.onkeyup=gettotal;
    ads.onkeyup=gettotal
    discount.onkeyup=gettotal;
    // create product 
    submit.onclick=function(){
        let newitem={
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML, //becouse it do not input it small element
            count:count.value,
            category:category.value
        }
        if(title.value!=''&&price.value!=''){
            if(mood=='create'){
                if(newitem.count>1){
                    for(let i=0;i<newitem.count;i++){
                        datapro.push(newitem);       
                    }
                }
                else{
                    datapro.push(newitem);
                }
               }
               else{
                datapro[temp_index]=newitem;
                mood='create';
                submit.innerHTML='create';
                count.style.display='block';
               }
        }
      
        
        localStorage.setItem('product',JSON.stringify(datapro));
        cleardate();
        showdate();
    }


    //this fun to delete data form input form to be confartable for user 
    function cleardate(){
        title.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        price.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
    }

    //show table alldata
    function showdate(){
        console.log("iam in it mo")
        let table='';
        for(let i=0;i<datapro.length;i++){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick="deletedata(${i})" id="delete">delete</button></td>
            <td><button onclick="updatedata(${i})"  id="update">update</button></td>
            </tr>
            `;
            
           
            
        }
        document.getElementById('tbody').innerHTML=table;
        if(datapro.length>0){
            btndelete.innerHTML=`
            <button>delete all ${datapro.length}</button>
            `
        }
        else{
            btndelete.innerHTML=``;
        }
    }
    showdate();

    // clear all data 
    btndelete.onclick=function(){
        localStorage.clear();
        datapro.splice(0);
       // location.reload();
       showdate()
    }

    function deletedata(indx){
        console.log(indx)
        datapro.splice(indx,1); //index(start) , how many do you wonna delete 
        localStorage.product=JSON.stringify(datapro);
        showdate() // to update our view
    }

//update date
function updatedata(index){
    console.log(index)
    let temp =datapro[index];
    title.value=temp.title;
        taxes.value=temp.taxes;
        ads.value=temp.ads;
        discount.value=temp.discount;
        price.value=temp.price;
        gettotal();
        category.value=temp.category;
        count.style.display='none';
        submit.innerHTML='update'
        mood='update';
        temp_index=index;
        scroll({
            top:0,
            behavior:'smooth'

        })
}

let searchmood='title';
function getsearmood(id){
    let search=document.getElementById('search');
    if(id=='searchtitle')
    {
        searchmood='title'
        search.placeholder='search by title'
    }
    else{
        searchmood='category'
        search.placeholder='search by category'

    }
    console.log(searchmood);
}

function searchdata(value){
    console.log(value);
    let table='';
    if(searchmood=='title'){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
                console.log(i);

                table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick="deletedata(${i})" id="delete">delete</button></td>
            <td><button onclick="updatedata(${i})"  id="update">update</button></td>
            </tr>
            `;
            }
        }
    }
    else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
                console.log(i);

                table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button  onclick="deletedata(${i})" id="delete">delete</button></td>
            <td><button onclick="updatedata(${i})"  id="update">update</button></td>
            </tr>
            `;
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}


//}

