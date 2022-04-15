
//get art button
let button = document.querySelector('#get-art');




let test

//event listener for button
button.addEventListener('click',getArtRandom)






function getArtRandom (){
   
    let artData;
    fetchArt();

    console.log(`art data returned ${artData}`)



    // getArtUrl(data.data[randomArtIndex],endPoint);

}




function fetchArt(){
    const totalPages = 9668;  //pages of art available to see

    const artApi='https://api.artic.edu/api/v1/artworks?page='

    const artSpot = document.querySelector('#art');    //location for art to go
    
    const select = document.querySelector('#art-select'); //select bar to add artwork selection

    let endPoint=''

    let randomPage=Math.random() * 9000;


    fetch(`${artApi}${randomPage}`)
    .then((res)=>res.json())

    .then(data => {
        test=data;
        const randomArtIndex= Math.floor(Math.random() * data.data.length)
        console.log(`random art is index: ${randomArtIndex}`)


        endPoint=data.config.iiif_url;   //where to get immage from
        console.log(`url is ${endPoint}`)
        artData=data;
        

    })
    .catch(err=> console.log(`error ${err}`))


}


function getArtUrl(artData_,apiEndpoint_ ,size_='full/843,/0/default.jpg'){
    let url=''
    console.log(artData_)
    console.log(apiEndpoint_)


    url=`${apiEndpoint_}/${artData_.image_id}/${size_}`


    console.log('url is '+url)


    
}

//not implememented
function placeArt(url_,place_="#art"){
    // console.log(this)
    console.log(url_)

    

    
    
    
}


//not implemented
function buildSelect(arr, location){
    arr.array.forEach(element => {
        let option=document.createElement('option')
        option.value=element.title;
        option.innerText=element.title;
        

        location.appendChild(option);
    });
}
