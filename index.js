window.onload = function(){
 console.log("hoiiiiiiiiiiiiiiiiiii");
let title=document.getElementById('title');
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let datapro=[];
if(localStorage.product!=null){
datapro=JSON.parse(localStorage.product);
}

console.log("hoiiiiiiiiiiiiiiiiiii");
console.log(title,price,taxes,ads,discount,total,count,category,submit);

function gettotal(){
   
    
        if(price.value!=''){
            console.log(price.value);
            console.log(taxes.value);
            
            let ans=(+price.value + +taxes.value + +ads.value) - +discount.value; // add + to convet to numbers
            total.innerHTML=ans;
    
            console.log(price.value);
            console.log(taxes.value);
           
        }
        else{
            total.innerHTML='';
        }
    }
    price.onkeyup=gettotal;
    taxes.onkeyup=gettotal;
    ads.onkeyup=gettotal
    discount.onkeyup=gettotal;
    
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
        console.log(newitem);
        datapro.push(newitem);
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

    function showdate(){
        let table='';
        for(let i=0;i<datapro.length;i++){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="delete_one(${i})" id="delete">delete</button></td>
            <td><button  id="update">update</button></td>
            </tr>
            `
            document.getElementById('tbody').innerHTML=table;

        }
    }
    showdate();

    function delete_one(indx){
        console.log(indx)
        datapro.slice(indx,1); //index(start) , how many do you wonna delete 
        localStorage.product=JSON.stringify(datapro);
        showdate() // to update our view
    }
}

