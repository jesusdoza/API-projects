// India Foxtrot , Yankee Oscar Uniform Charlie Alfa November Romeo Echo Alfa Delta ?
//
// Note:
//
// There are preloaded dictionary you can use, named NATO
// The set of used punctuation is ,.!?.
// Punctuation should be kept in your return string, but spaces should not.
// Xray should not have a dash within.
// Every word and punctuation mark should be seperated by a space ' '.
// There should be no trailing whitespace


function to_nato(words) {
	// Go code
  let answer =''

  for (let i=0; i<words.length; i++){

    let c = NATO[words[i].toLowerCase()];

    //if nato object returns falsy or undefined
     if (!c){
       //if space
        if(words[i]==' '){
          //do nothing
        }
       //else punctuation concat to answer
       else
       answer+=words[i]+' ';
     }

    //else truthy answer from NATO object
    else{
      //concat to answer and add space at end
      answer+=c+' ';
    }

  }
  return answer.trim() //remove whitespace at ends

}
