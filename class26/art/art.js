
//get art button
let button = document.querySelector('#get-art');

//location for art to go
const artSpot = document.querySelector('#art');

//select bar to view artwork
const select = document.querySelector('#art-select');

//event listener for button
button.addEventListener('click',getArtList)




function getArtList (){
    fetch("https://api.artic.edu/api/v1/artworks")
    .then((res)=>res.json())

    .then(data => {
        
        console.log(data.data)
        

    })
    .catch(err=> console.log(`error ${err}`))
}

function buildSelect(arr, location){
    arr.array.forEach(element => {
        let option=document.createElement('option')
        option.value=element.title;
        option.innerText=element.title;
        

        location.appendChild(option);
    });
}


function getArt(artId){


    let url = `https://www.artic.edu/iiif/2/${artId}/full/843,/0/default.jpg`
}

