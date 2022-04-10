

// place rons words here in DOM
    const ronSpeaks = '#ron-speaks'


const askButton=document.querySelector('#askButton')
askButton.addEventListener('click',function(event){
    event.preventDefault();
    askRon();
    

});










//object used to ask ron swanson
let RonSwanson=function (){
        let words=null // will hold rons quotes

        this.askRon=function(phrase='party'){
            fetch(`http://ron-swanson-quotes.herokuapp.com/v2/quotes/search/${phrase}`)
            .then((res)=>res.json())
            .then(data => {
            //    words.push(data)
                words=data;
            }) 
            .catch(err=> console.log(`error ${err}`)); 
        },

        this.wisdom = function (){
            //get rons wisdom
            let answer=words

            //erase rons wisdom container
            words=''

            // return rons words
            return answer;
        }
    }



 //place strings into dom as paragraphs
function placeDom(arr,location){
    let paragraphs =[];  //will hold quotes


    //get dom element where to place <p>
    let domPlace=document.querySelector(location)

    //array of quotes
    arr.forEach(element=>{
        let p = document.createElement('p')    // create new <p> element
        p.innerText=element;    //add inner text to paragraph
        paragraphs.push(p);    //push paragraph for later
        
        
        if(domPlace.firstChild){
            let child = domPlace.firstChild;
            domPlace.insertBefore(p,child)
        //     domPlace.firstChild.insertBefore(p)
        }else{
             domPlace.appendChild(p);
        }
        
    })

    console.log(paragraphs)

    




    

}


//asks ron object from user typed in strings
function askRon(){
    //will hold rons quotes to display on DOM

    //get what user typed in id=subject
    let userWords = document.querySelector('#subject')

    

    //parse them into array
    let words = userWords.value.split(' ')
    

    console.log(userWords.value);

    //ask ron about each word
    words.forEach(element => {
        console.log('ron is asked '+ element)
        
        //ask ron object
        ron.askRon(element); 
    });

     let ronSays=ron.wisdom();

    console.log( typeof(ronSays))
    console.log(ronSays)
     placeDom(ronSays,ronSpeaks);




}

let ron = new RonSwanson





