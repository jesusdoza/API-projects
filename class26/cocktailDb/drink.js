
//get drink button
let button = document.querySelector('#get-drink');

//get ingredient select
let select = document.querySelector('#ingredient-select')


//event listeners 
button.addEventListener('click',getDrinks)
select.addEventListener('change',addIngredient)



function addIngredient(event){

    console.log(event)
    

}

//get user ingredient choosen and fetch drinks for those
function getDrinks (){
    const ingredient= document.querySelector('#ingredient')

    console.log('ingridient asked '+ ingredient.value)

    fetchDrinkList(ingredient.value);

}


// WORKING
//fetches array with all ingredients
function getDrinkIngredientList(){

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
    .then((res)=>res.json())

    .then(ingredients => {
        console.log(ingredients)
        ingredients.drinks.forEach((item)=>{
            console.log(item)

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



    })
    .catch(err=> console.log(`error ${err}`))


}

