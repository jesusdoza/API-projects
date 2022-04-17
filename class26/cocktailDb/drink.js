



//get drink button
let button = document.querySelector('#get-drink');

//get ingredient select
let select = document.querySelector('#ingredient-select')


//event listeners 
button.addEventListener('click',getDrinksByIngredients)
select.addEventListener('change',addIngredient)

let drinksMatching =new Set;// all drinks matching criteria
let ingredientsChoosen=new Set;  // ingredients user picks
let fullDrinkDetails= new Set;   // store full drink info for matching drinks


//call on load
getDrinkIngredientList()








// ===============================================================
// ========FUNCTIONS BELOW
// ===============================================================

function sendQuery(){







}





//fetch drinks that contain ingredient
function getDrinksByIngredients (){
    let choosenIngredients = document.querySelectorAll('#ingredient-choosen li')

    console.log(' call getdrinksbyingredients')
    console.log(choosenIngredients)
    choosenIngredients.forEach((e)=>console.log(`ingredient is ${e.innerText}`))

        choosenIngredients.forEach((ingredient_)=>{

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient_.innerText}`)
            .then(res=>res.json())
            .then( data=>{
    
                console.log(data)
                data.drinks.forEach((matchingDrink)=>{
                    drinksMatching.add(matchingDrink)
                })
             })
            })
       


    

     


    }

    
    //fetch full details of drink
    function drinkDetails(drinkId_){
        fetch(`https:// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId_}`)
        .then(res=>res.json)
        .then((data)=>{



        })
     }



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




// WORKING
//fetches array with all ingredients from api
function getDrinkIngredientList(){

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

            //insert into dom at parent selector
            appendTo(option,"#ingredient-select")
        

        })
        

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


