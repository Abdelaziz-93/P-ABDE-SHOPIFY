let products = document.querySelector('#makeUpProducts')

let clothes = document.querySelector('#clothes')

fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
        console.log(data)
      for (let i = 0; i < data.length; i++) {
        products.innerHTML +=`
     
          <div class=" col-md-3 my-4">
              <div class="col">
               <img src="${data[i].image_link}" class="card-img-top image1" alt="...">
               <h6 class="card-title text-center">${data[i].name}</h6>
               <div class="prices">
               <span class="icons"><i class="bi bi-cart3"></i></span>
               <span class="price">${data[i].price} $</span>
               </div>
               <a href="#" class="btn btn1" onclick="addToCart1(${data[i].id})" id="product1">Acheter</a>
              
               </div>
         
       </div>`;
      }
    });

    fetch("https://fakestoreapi.com/products")
    .then((Res) => {
      return Res.json();
    })
    .then((data1) => {
        console.log(data1)
      for (let i = 0; i < data1.length; i++) {
        clothes.innerHTML +=`
    
          <div class=" col-md-3 my-4">
              <div class="col2">
              
              <img src="${data1[i].image}" class="card-img-top w-75 image2" alt="...">
      
              <h6 class="card-title text-center">${data1[i].title}</h6>
              <div class="prices">
              <span class="icons"><i class="bi bi-cart3"></i></span>
              <span class="price">${data1[i].price} $</span>
              </div>
              <a href="#" class="btn btn1" onclick="addToCart(${data1[i].id})" id="product1">Acheter</a>
              
              </div>
      
      </div>`;
      }
    });


    function addToCart(id) {
      let tabId = [];
      if (localStorage.getItem("carts") == null) {
        tabId = [];
      } else {
        tabId = JSON.parse(localStorage.getItem("carts"));
      }
      tabId.push(id);
      localStorage.setItem("carts", JSON.stringify(tabId));
      alert("ajouter avec succés");
    }
    console.log(window.location.pathname)

    function addToCart1(id) {
      let tabId2 = [];
      if (localStorage.getItem("cartMakeUp") == null) {
        tabId2 = [];
      } else {
        tabId2 = JSON.parse(localStorage.getItem("cartMakeUp"));
      }
      tabId2.push(id);
      localStorage.setItem("cartMakeUp", JSON.stringify(tabId2));
      alert("ajouter avec succés");
    }

    if (window.location.pathname == "/panier.html") {
        if (localStorage.getItem("carts") == null) {
          console.log("Pas de produit dans le panier");
        } else {
          let carts = JSON.parse(localStorage.getItem("carts"));
          let paniers = document.querySelector("#products-panier");
          qty = 1;
      
          let filerCarts = filterUniqueElements(carts);
          let total = 0;
          for (let i = 0; i < filerCarts.length; i++) {
             fetch(`https://fakestoreapi.com/products/${filerCarts[i]}`)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                paniers.innerHTML += `
                <tr>
                  <td><img src="${data.image}" alt="" width="50"></td>
                  <td>${data.title}</td>
                  <td>$${data.price}</td>
                  <td>${getNumberOfElementInArray(carts, data.id)}</td>
                  <td>$${data.price * getNumberOfElementInArray(carts, data.id)}</td>
                </tr>
                `;
                if(localStorage.getItem("total_carts") != null) {
                  let ct = Number(localStorage.getItem("total_carts"))
                  let total = ct + data.price * getNumberOfElementInArray(carts, data.id)
                  localStorage.setItem("total_carts", total)
                } else {
                  localStorage.setItem("total_carts", (data.price * getNumberOfElementInArray(carts, data.id)))
                }
      
              });
              console.log(total)
          }
          console.log(total)
          document.querySelector("#sub_total").innerText = "$" + Math.round(Number(localStorage.getItem("total_carts")))
          document.querySelector("#total").innerText = "$" + (Math.round(Number(localStorage.getItem("total_carts"))) + 30)
          localStorage.removeItem("total_carts")
        }
      }
      if (window.location.pathname == "/panier.html") {
        if (localStorage.getItem("cartMakeUp") == null) {
          console.log("Pas de produit dans le panier");
        } else {
          let cartMakeUp = JSON.parse(localStorage.getItem("cartMakeUp"));
          let paniers1 = document.querySelector("#products-panier1");
          qty = 1;
      
          let filerCarts1 = filterUniqueElements(cartMakeUp);
          let total1 = 0;
          for (let i = 0; i < filerCarts1.length; i++) {
             fetch(`http://makeup-api.herokuapp.com/api/v1/products/${filerCarts1[i]}.json`)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                paniers1.innerHTML += `
                <tr>
                  <td><img src="${data.image_link}" alt="" width="50"></td>
                  <td>${data.name}</td>
                  <td>$${data.price}</td>
                  <td>${getNumberOfElementInArray(cartMakeUp, data.id)}</td>
                  <td>$${data.price * getNumberOfElementInArray(cartMakeUp, data.id)}</td>
                </tr>
                `;
                if(localStorage.getItem("total_carts1") != null) {
                  let ct1 = Number(localStorage.getItem("total_carts1"))
                  let total1 = ct1 + data.price * getNumberOfElementInArray(cartMakeUp, data.id)
                  localStorage.setItem("total_carts1", total1)
                } else {
                  localStorage.setItem("total_carts1", (data.price * getNumberOfElementInArray(cartMakeUp, data.id)))
                }
      
              });
              console.log(total1)
          }
          console.log(total1)
          document.querySelector("#sub_total1").innerText = "$" + Math.round(Number(localStorage.getItem("total_carts1")))
          document.querySelector("#total1").innerText = "$" + (Math.round(Number(localStorage.getItem("total_carts1"))) + 30)
          localStorage.removeItem("total_carts1")
        }
      }

    // Mr Carlos
//     let indexPage = window.location.pathname;
// if (indexPage == "/index.html") {
//   let products = document.getElementById("products");
//   fetch("https://fakestoreapi.com/products")
//     .then((Response) => {
//       return Response.json();
//     })
//     .then((data) => {
//       for (let i = 0; i < data.length; i++) {
//         products.innerHTML += ` 
     
//           <div class="col-md-3 mb-4">
//            <div class="card">
//                <img src="${data[i].image}" class="card-img-top " alt="...">
//                 <span class="text-center">${data[i].category}</span>
//                <div class="card-body">
//                  <h5 class="card-title fs-4">${data[i].title}</h5>
//                  <span class="price">${data[i].price}</span>
                
//                  <a href="#" class="btn btn-primary" onclick="addToCart(${data[i].id})">Acheter</a>
//                </div>
//              </div>
         
//        </div>`;
//       }
//     });
// }

// /*categories*/
// let isCategoryPage = window.location.search.includes("?category=");
// if (isCategoryPage) {
//   let page = window.location.search.replace("?category=", "");
//   let categories = document.getElementById("categories");

//   fetch(`https://fakestoreapi.com/products/category/${page}`)
//     .then((Response) => {
//       return Response.json();
//     })
//     .then((data) => {
//       for (let i = 0; i < data.length; i++) {
//         categories.innerHTML += `
//         <div class="col-md-3 mb-4">
//          <div class="card">
//              <img src="${data[i].image}" class="card-img-top " alt="...">
//               <span class="text-center">${data[i].category}</span>
//              <div class="card-body">
//                <h5 class="card-title fs-4">${data[i].title}</h5>
//                <span class="price">${data[i].price}</span>
              
//                <a href="#" class="btn btn-primary" onclick="addToCart(${data[i].id})" id="product1">Acheter</a>
//              </div>
//            </div>
       
//      </div>`;
//       }
//     });
// }

// // function addToCart(id) {
// //   let tab = [];

// //   if(localStorage.getItem("carts") == null) {
// //     tab = [];
// //   } else {
// //     tab = JSON.parse(localStorage.getItem("carts"));
// //   }

// //   tab.push(id)
// //   localStorage.setItem("carts", JSON.stringify(tab))

// //   alert("Ajouté au panier avec succès")
// // }

// function addToCart(id) {
//   let tabId = [];
//   if (localStorage.getItem("carts") == null) {
//     tabId = [];
//   } else {
//     tabId = JSON.parse(localStorage.getItem("carts"));
//   }
//   tabId.push(id);
//   localStorage.setItem("carts", JSON.stringify(tabId));
//   alert("ajouter avec succés");
// }

// // console.log(tab.filter((value, index, self) => {
// //   return self.indexOf(value) === index;
// // }))

// // function filterUnique(arr) {
// //   let uniqueValues = [];

// //   for (let i = 0; i < arr.length; i++) {
// //     if (uniqueValues.indexOf(arr[i]) === -1) {
// //       uniqueValues.push(arr[i]);
// //     }
// //   }

// //   return uniqueValues;
// // }



// if (window.location.pathname == "/panier.html") {
//   if (localStorage.getItem("carts") == null) {
//     console.log("Pas de produit dans le panier");
//   } else {
//     let carts = JSON.parse(localStorage.getItem("carts"));
//     let paniers = document.querySelector("#products-panier");
//     $qty = 1;

//     let filerCarts = filterUniqueElements(carts);
//     let total = 0;
//     for (let i = 0; i < filerCarts.length; i++) {
//        fetch(`https://fakestoreapi.com/products/${filerCarts[i]}`)
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           paniers.innerHTML += `
//           <tr>
//             <td><img src="${data.image}" alt="" width="50"></td>
//             <td>${data.title}</td>
//             <td>$${data.price}</td>
//             <td>${getNumberOfElementInArray(carts, data.id)}</td>
//             <td>$${data.price * getNumberOfElementInArray(carts, data.id)}</td>
//           </tr>
//           `;
//           if(localStorage.getItem("total_carts") != null) {
//             let ct = Number(localStorage.getItem("total_carts"))
//             let total = ct + data.price * getNumberOfElementInArray(carts, data.id)
//             localStorage.setItem("total_carts", total)
//           } else {
//             localStorage.setItem("total_carts", (data.price * getNumberOfElementInArray(carts, data.id)))
//           }

//         });
//         console.log(total)
//     }
//     console.log(total)
//     document.querySelector("#sub_total").innerText = "$" + Math.round(Number(localStorage.getItem("total_carts")))
//     document.querySelector("#total").innerText = "$" + (Math.round(Number(localStorage.getItem("total_carts"))) + 30)
//     localStorage.removeItem("total_carts")
//   }
// }


function getNumberOfElementInArray(tab, value) {
  let qty = 0;
  for(let i = 0; i < tab.length; i++) {
    if(value == tab[i]) {
      qty++
    }
  } 
  return qty;
}


function filterUniqueElements(array) {
  return array.filter((value, index) => {
    return array.indexOf(value) === index
  });
}

    //end Mr Carlos