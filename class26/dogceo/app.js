

const BREEDS_URL= "https://dog.ceo/api/breeds/list/all"
const select= document.querySelector('.breeds')
const wiki = 'https://en.wikipedia.org/w/api.php'//api endpoint for search
const wikipedia='https://en.wikipedia.org/wiki/'// will link page of specific dog later


//gets used at first load up to have something on screen
 const defaultDog={
     target:{
         value:'beagle'
     }
 }


   
 //when select is changed  change dog
select.addEventListener('change',changeDog)



function changeDog(event=defaultDog){
    let value=event.target.value;

    //build url to api using value
    let url=`https://dog.ceo/api/breed/${value}/images/random`

     //search wikimedia api for breed selected in event
     getDogWiki(value)


     //get dog pic from api url
     getDogPic(url)


}



//get list of dog breeds from dog ceo api
function getDogBreeds(){
    fetch(BREEDS_URL)
    .then((res)=>res.json())
    .then(data => {
        //get object keys from data.message object
       const breeds=Object.keys(data.message)
        breeds.forEach((dogBreed)=>{
            let option = document.createElement('option');
            option.value=dogBreed;
            option.innerText=dogBreed;
            select.appendChild(option)


        })

    })
    .catch(err=> console.log(`error ${err}`))
}


// ====================================WORKGIN ON BOXER CORRECT QUERY
// gets search results for dog breed from wiki
function getDogWiki(dogBreed='hound'){
    const dogSearch=dogBreed +'+dog';
    // fetch(`${wiki}?action=query&list=prop&srsearch=${dogBreed}&format=json`)  // this does not work
   fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${dogSearch}&format=json`)  //good one
//    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops&titles=hound&format=json`)
    .then((res)=>{return res.json();})
    .then(data => {

        // console.log(data);

        //get snippet of page
        let  dogInfo=data.query.search[0].snippet
        let page=data.query.search[0].title

        //    make wiki link
        let  dogLink=`${wikipedia}${page}`
        
        let anchor= document.createElement('a');    //new anchor 
        anchor.innerHTML=dogInfo;                 //add snippet info
        anchor.href=dogLink                       //add wiki link
        anchor.id='replace'

        //change wiki links
        changeInfo('.dog-info',anchor)
        
        
        
       


    })
    .catch(err=> console.log(`error ${err}`))

    
}



//display something in dom with a selector and what to display
function changeInfo(placeHere_, displayThis_){
    const target= document.querySelector(placeHere_);

    const replaceMe= document.getElementById('replace')
    console.log(typeof(replaceMe))
    target.replaceChild(displayThis_,replaceMe);

}






//change dog picture src on page
function getDogPic(apiLink_,place_="#dogpic"){
    console.log('inside getDogPic')
    console.log(apiLink_)

    //get the image container
    const target= document.querySelector(place_);

    //change background
    const background= document.querySelector(".row");

    //fetch fucntion to get dog image from api link
    
        console.log('fetching:'+ apiLink_)
        fetch(apiLink_)
        .then(res => res.json())
        .then(data=> {
            console.log('inside getDogPic/ fetch')

            //change src for image
           target.src= data.message;
            // target.src='https://images.dog.ceo/breeds/labrador/IMG_4709.jpg'
           background.style.backgroundImage=`url(${data.message})`

        })


    

    
    
    
}


getDogBreeds()

//has a default value so works with out params
changeDog()