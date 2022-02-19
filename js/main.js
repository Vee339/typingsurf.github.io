//declaring variables
const quoteApiUrl = "https://api.quotable.io/random?minLength=100&maxLength=300";
let quote;
var paragraphelem = document.querySelector(".content .typingpara");

var capsLock = document.querySelector(".cpslck");
var speed;
var timer = document.querySelector(".timer");
var seconds = document.querySelector(".timer .seconds");
var minutes = document.querySelector(".timer .minutes");
var totalSeconds;
var time;
let a = 0;

var renderNewQuote = async () => {
   
    //Fetch contents from url
    const response = await fetch(quoteApiUrl);

    //store response
    let data = await response.json();

    //access quote
    quote = data.content;
    
    document.querySelector(".content .typingpara").innerText = quote;
}

function start(){   
          timer.style.display = "block";
          document.querySelector(".startGame").style.display = "none";
        var paragraph = document.querySelector(".content .typingpara").innerText;
        var wordCount = paragraph.match(/(\w+)/g).length;
        var array = quote.split("");
        paragraphelem.innerText = "";
        for(b = 0; b < array.length; b++){
           var elem = document.createElement("span"),
           text = document.createTextNode(array[b]);
           elem.appendChild(text);
           paragraphelem.insertAdjacentElement("beforeend",elem);
        }
    
        var span = document.querySelectorAll(".typingpara span");
          window.addEventListener("keyup",function(event){
           
            const key = event.key;
                if(array[a] === key ){
                    //When correct key is pressed
                   span[a].style.color = 'green';
                    a = a + 1;
                }else if(event.keyCode == 8 && a > 0){
                   //When backspace is pressed
                    span[a-1].style.color = '#001219';
                    span[a-1].style.backgroundColor = '';
                    a = a - 1;
                    
                }else if(event.keyCode == 20){
                    //When CapsLock is pressed
                    capsLock.classList.toggle("active");          
                }else if(event.keyCode < 48 || event.keyCode >= 90 && event.keyCode <= 96 || event.keyCode >= 111){
                   //When keys like shift, control, alt, etc. are pressed
                }else{
                   //When wrong key is pressed
                    span[a].style.color = 'red';
                    span[a].style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
                    a = a + 1;
                }
              
             if(a === array.length){
                totalSeconds = Number(minutes.innerHTML * 60) + Number(seconds.innerHTML);
                speed = (wordCount/totalSeconds) * 60;
                this.alert("Your speed is " + Math.floor(speed) + " wpm");
                location.reload();            
             }
         });

    time = new Date();
    setInterval(function(){
        if(getTimerTime() == 60){
            minutes.innerHTML = Number(minutes.innerHTML) + 1;
            time = new Date();
        }
        seconds.innerHTML = getTimerTime();
    },1000);
        
}
function getTimerTime(){
     return Math.floor((new Date() - time)/1000);
 }

document.querySelector(".startGame").addEventListener("click",start);
window.addEventListener("load",renderNewQuote);


