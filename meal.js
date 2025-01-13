document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value;
    

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(res => res.json())
    .then(data =>{
        const items = document.getElementById("items");
        items.innerHTML =""
        if(data.meals == null){
            document.getElementById("msg").style.display = "block";
        }
        else
        {
            document.getElementById("msg").style.display = "none";
            data.meals.forEach(element => {
                console.log(element);
                let div = document.createElement("div");
                div.className="m-2 singleItem"
                div.setAttribute('onclick',`
                   details('${element.idMeal}') 
                    `)
                let iteminfo = `
                <div class="card" style="width: 12rem;">
                <img src="${element.strMealThumb}" 
                class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h2 class="card-text">${element.strMeal}</h2>
                </div>
                </div>
                `;
                document.getElementById("inputName").value= "";
                div.innerHTML = iteminfo;
                items.appendChild(div);
                
            });
        }
    } )
})

function details(id){
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(detail => {
        let meal = detail.meals[0];
        console.log(meal);
        let details = document.getElementById("details");
        details.innerHTML= "";
        let detailsDiv = document.createElement("div");
        let detailInfo = `
         <div class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" 
                class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-text">${meal.strMeal}</h2>
                 <h5>Ingredients</h5>
                 <ul>
                     <li>${meal.strArea}</li>
                     <li>${meal.strCategory}</li>
                     <li>${meal.strIngredient1}</li>                     
                     <li>${meal.strIngredient2}</li>                     
                     <li>${meal.strIngredient3}</li>                     
                     <li>${meal.strIngredient4}</li>                     
                     <li>${meal.strIngredient5}</li>                     
                     
                 </ul>
                </div>
                </div>
        `;
        detailsDiv.innerHTML = detailInfo;
        details.appendChild(detailsDiv);
    })
}