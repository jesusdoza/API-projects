


// let data;
// fetch(url).then(response => {
//   response.blob().then(blobResponse => {
//     data = blobResponse;
//   })
// });

// https://app.pixelencounter.com/api/basic/monsters/random/{format}?size=int
// Test	Get a random SVG monster as image.
// {format}	The value can be png, jpeg or webp.
// [size:int]	The size in pixels, default is '100'.
// Response type	image/jpeg, image/png, image/webp
// https://app.pixelencounter.com/odata/basic/monsterdetails?$top=int&$orderby=string&$skip=int&$count=bool
let button = document.querySelector('#make-monster');
const monsterSpot = document.querySelector('#monster');

button.addEventListener('click',getMonster)


let monster;

function getMonster (){
    fetch("https://app.pixelencounter.com/odata/basic/monsterdetails?$top=10&$orderby=Id%20desc&$skip=0&$count=true",{mode:'no-cors'})
    .then((res)=>res.json())
    .then(data => {
        
        console.log(typeof(data))
        

    })
    .catch(err=> console.log(`error ${err}`))
}

