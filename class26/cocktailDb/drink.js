



//get drink button
let searchButton = document.querySelector('#get-drink');

//get ingredient select
let select = document.querySelector('#ingredient-select')

let test;
//event listeners 
searchButton.addEventListener('click',sendQuery)
select.addEventListener('change',addIngredient)

let drinksMatching =new Set;// all drinks matching criteria by id
let ingredientsChoosen=new Set;  // ingredients user picks
let fullDrinkDetails= new Set;   // store full drink info for matching drinks
let fullIngredientList= new Set; //store ingredients to keep from fetching

//call on load
getDrinkIngredientList()








// ===============================================================
// ========FUNCTIONS BELOW
// ===============================================================

function sendQuery(){

let choosenIngredients = document.querySelectorAll('#ingredient-choosen li')

//loop through user choosen ingredients 
choosenIngredients.forEach((e)=>{
    //will add to set all matching
    getDrinksByIngredients(e.innerText)
})

console.log(drinksMatching)

// // for all drinks that matched from api
drinksMatching.forEach((drinkId)=>{

    drinkDetails(drinkId)

})

}





   //fetch full details of  1 drink
   function drinkDetails(drinkId_){
    
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId_}`)
    .then(res=>res.json())
    .then((data)=>{
        test=data;
        let name, 
        id, 
        category, 
        image, 
        instructions,  
        ingredientMeasures;

        let ingredients='';

        name=data.drinks[0].strDrink;
        id=data.drinks[0].idDrink;
        category=data.drinks[0].strCategory;
        image=data.drinks[0].strDrinkThumb;
        instructions=data.drinks[0].strInstructions

        for(let i =1; i<=15; i++){
            //if str ingredient is no null then keep going through
            if(data.drinks[0][ `strIngredient${i}`]){
                ingredients+=data.drinks[0][`strIngredient${i}`] +" "+ data.drinks[0][`strMeasure${i}`] + '<br>'
            }
           
            
        }
      console.log(ingredients)
        

        // li to put as drink into list in dom
        let drinkLi = document.createElement('li');

       drinkLi.innerHTML=`
       <section class="drink-container">
            <div class="drink-image">
                <img src="${image}" alt="drink-picture">
            </div>
            <section class="drink-info">
                <h3>${name}</h3>
                <span>${id}</span>
                <span>${category}</span>
                
                <h4>Ingredients</h4>
                <p>${ingredients}</p>
                <p>${instructions}</p>
            </section>
        </section>  
       `

       appendTo(drinkLi,'#drink-list');
    })

   



 }





//fetch drinks that contain ingredient string and add to set
function getDrinksByIngredients(ingredient_){
    

    console.log(' call getdrinksbyingredients: ')
    console.log(ingredient_)
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient_}`)
            .then(res=>res.json())
            .then( data=>{
                console.log(data)
                data.drinks.forEach((matchingDrink)=>{
                    drinksMatching.add(matchingDrink.idDrink)
                })
             })
            
        }





//fetch drinks that contain ingredient
// function getDrinksByIngredients___ (){
//     let choosenIngredients = document.querySelectorAll('#ingredient-choosen li')

//     console.log(' call getdrinksbyingredients')
//     console.log(choosenIngredients)
//     choosenIngredients.forEach((e)=>console.log(`ingredient is ${e.innerText}`))

//         choosenIngredients.forEach((ingredient_)=>{

//             fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient_.innerText}`)
//             .then(res=>res.json())
//             .then( data=>{
    
//                 console.log(data)
//                 data.drinks.forEach((matchingDrink)=>{
//                     drinksMatching.add(matchingDrink)
//                 })
//              })
//             })
//     }

    
 


//add ingredients to selected section in dom 
function addIngredient(event){
    //ignore the place holder
    if(event.target.value.toLowerCase()=='default'){
        console.log(event.target.value)
        return
    }
   
    //get the value of target
    let value=event.target.value;
    

    //create element to insert into dom
    let li= document.createElement('li');
    li.innerText=value;
    li.dataset.value=value; 

    console.log(`value is ${li.dataset.value}`)

    //add remove event to li element
    li.addEventListener('click',remove)
    
    //add to dom
    appendTo(li,'#ingredient-choosen')
}




//remove from dom on what is clicked
function remove(event){

    console.log(event.target)
    event.target.remove()
}





//fetches array with all ingredients from api if not in set already
function getDrinkIngredientList(){

    if(fullIngredientList.size){
        console.log('already have ingridients');
        return;

    }
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
    .then((res)=>res.json())

    .then(ingredients => {
        console.log(`ingredients are`)
        console.log(ingredients)
        ingredients.drinks.forEach((item)=>{
            // console.log(item)

            let option = document.createElement('option');
            option.value=item.strIngredient1;
            option.innerText=item.strIngredient1;

            //add ingredient to set 
            fullIngredientList.add(item.strIngredient1)

            //insert into dom at parent selector
            appendTo(option,"#ingredient-select")
        })
        
        // localStorage.setItem('fullIngredientList',fullIngredientList)
    })
    .catch(err=> console.log(`error ${err}`))
}



//insert into dom function
function appendTo(childNode_, parentSelector_=body){
    const parent=document.querySelector(parentSelector_);

    parent.appendChild(childNode_);



}


//fetches drinks by ingredient
function fetchDrinkList(ingredient_){


    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient_}`)
    .then((res)=>res.json())

    .then(data => {
        console.log(data)

        data.drinks.forEach((drink)=>{
            drinksMatching.add(drink)
        })

        




    })
    .catch(err=> console.log(`error ${err}`))


}


