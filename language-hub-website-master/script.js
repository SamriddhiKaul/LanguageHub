const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result=document.getElementById("result");
const sound=document.getElementById("sound");
const btn=document.getElementById("search-btn");

btn.addEventListener("click",()=>{
    let inputW=document.getElementById("inp-word").value;
    //console.log(inputW);
    fetch(`${url}${inputW}`)
    .then((response)=>response.json())
    .then((data)=>{
        //console.log(data);
        const obj = findmethod(data[0].meanings);
        result.innerHTML=`
        <div class="word">
            <h3>${inputW}</h3>
            <button onclick="playSound()">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${obj.partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
            ${obj.definitions[0].definition}
        </p>
        <p class="word-example">
            ${obj.definitions[0].example || ""}
        </p>
        `;
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        // console.log(sound);
    }).catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
    
})

function playSound(){
    sound.play();
}

function findmethod(arr){
    for(let i=0; i<arr.length; i++){
        if(arr[i].partOfSpeech=="adjective"){
            return arr[i];
        }
    }
    return arr[0];
}


let quote = document.getElementById("quote");
let author = document.getElementById("author");
let btn1 = document.getElementById("btn");

const url1 = "https://api.quotable.io/random";

let getQuote = () => {
  fetch(url1)
    .then((data) => data.json())
    .then((item) => {
      console.log("hghi");
      quote.innerHTML=item.content;
      author.innerHTML=item.author;
    });
};

window.addEventListener("load", getQuote);
btn1.addEventListener("click",getQuote);