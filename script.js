const addCart=document.querySelector(".cart");
const url='6656e2ae22c042cab786c972d86434fd'
let sum=0;
 // Delete Function
 async function del(event){
try {
  const productDetailId=event.target.parentElement.id
  console.log(productDetailId);
  const li=event.target.parentElement;
  // console.log(li);
  const priceLi=li.querySelector(".item-price");
  const price=Number(priceLi.textContent)
  // console.log(price);
  
  let res=await axios.delete(`https://crudcrud.com/api/${url}/productDetail/${productDetailId}`)
document.getElementById(productDetailId).remove();
showTotalPrice(price,-1)
} catch (error) {
  console.log(error);
}
 }
//  Show TotalValue Function
async function showTotalPrice(price,el){
  try {
    let displayPrice=document.querySelector(".displayprice");
    // for(let i=0;i<productDetail.length;i++){
    //   sum=sum+productDetail.productPrice;
    // }
    // let sum=0;
    // let res=await axios.get(`https://crudcrud.com/api/${url}/productDetail`)
    // for(let i=0;i<res.data.length;i++){
    //   sum=sum+Number(res.data[i].productPrice);
    //   }
    sum+=Number(price)*el
    console.log(price,el)
    displayPrice.textContent=`${sum}`
  } catch (error) {
    
  }

}
// Show Data Function
function showDetail(productDetail){
  const display=document.querySelector(".display");
  let liEliment=document.createElement("li");
  liEliment.innerHTML=`Product Name= ${productDetail.productName} and Price is <span class="item-price"> ${productDetail.productPrice}</span>`
  liEliment.id=productDetail._id;
  // create Delete Button
  
  let deleteBtn=document.createElement("button");
  deleteBtn.innerText="Delete"
  liEliment.appendChild(deleteBtn);
  display.appendChild(liEliment);
  
 
  // delete function add
  deleteBtn.addEventListener("click",del);
}
// Page Reload Function`

async function reload(){
 try {
  let response= await axios.get(`https://crudcrud.com/api/${url}/productDetail`)
  for(let i=0;i<response.data.length;i++){
    showDetail(response.data[i]);
    // console.log(response.data[i].productPrice)
    showTotalPrice(response.data[i].productPrice,1)
   
  }
  
 } catch (error) {
  console.log(error);
 }
}
 window.addEventListener("DOMContentLoaded",reload);
 



// addChart Btn
addCart.addEventListener("click",post)
async function post(){
try {
  console.log("click")
  const productName=document.querySelector(".productname").value;
  const productPrice=document.querySelector(".productprice").value;
// console.log(productName,productPrice) 
let productDetail={
  productName:productName,
  productPrice:productPrice
}
// console.log(productDetail);
  const res=await axios.post(`https://crudcrud.com/api/${url}/productDetail`,productDetail)
  // console.log(res.data);
  showDetail(res.data);
  showTotalPrice(res.data.productPrice,1)
} catch (error) {
  console.log(error);
}
document.querySelector(".productname").value="";
document.querySelector(".productprice").value="";


}