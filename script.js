const mobile = document.getElementById("mobile");
const close = document.getElementById("close");
const navLink = document.getElementById("navLink");

if(mobile){
    mobile.addEventListener("click", () =>{
        navLink.classList.add("active");
    })
}
if(close){
    close.addEventListener("click", () =>{
        mobile.classList.remove("active");
    })
}
//Animator when scroll design-------------------------------------------------------------------------------
window.addEventListener('scroll', function(){
    const animatedElements = document.querySelectorAll('.scroll-animate');

    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        if(rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >=0){
            element.classList.add('animate-now');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");

    svg.setAttributeNS(null, "viewBox", "0 0 100 10");
    svg.setAttributeNS(null, "preserveAspectRatio", "none");

    let d = "M 0,5";
    const amplitude = 2.5; // height of the wave
    const frequency = 2; // number of waves

    for (let i = 0; i <= 100; i++) {
        const y = 5 + amplitude * Math.sin((i * frequency * 2 * Math.PI) / 100);
        d += ` L ${i} ${y}`;
    }

    d += " L 100 10 L 0 10 Z"; // Close the path

    path.setAttributeNS(null, "d", d);
    path.setAttributeNS(null, "fill", "#f1f1f1");

    svg.appendChild(path);
    document.querySelector(".curve-shadow").appendChild(svg);
});

/*<!----------------------------------------------------------------------->
<!-----                        C O U N T E R                          ----->
<!------------------------------------------------------------------------->
<!-----                        C O U N T E R                        ----->*/
document.addEventListener("DOMContentLoaded", () =>{

    let hasAnimated = false;

    function counter(id, start, end, duration){
        let obj = document.getElementById(id),
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration/range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if(current ==  end){
                clearInterval(timer);
            }
        }, step);
    }
    function isElementInView(elem) {
        const rect = elem.getBoundingClientRect();
        return (rect.top >= 0 && rect.bottom <= window.innerHeight);
    }
    function handleScroll() {
        if (isElementInView(document.getElementById('counter')) && !hasAnimated) {
            hasAnimated = true;
            counter("count1", 3700, 5000, 2000);
            counter("count2", 8700, 10000, 2000);
            counter("count3", 1700, 2800, 2000);
            counter("count4", 35, 50, 2000);
        }
    }

    window.addEventListener('scroll', handleScroll);
});

/*<!----------------------------------------------------------------------->
<!-----                      S L I D E  L E F T                       ----->
<!------------------------------------------------------------------------->
<!-----                      S L I D E  L E F T                    ----->*/
function applyLetterAnimation(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    const text = element.textContent;
    element.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        
        // Check if the character is a space
        if (text[i] === " ") {
            span.innerHTML = "&nbsp;"; // Non-breaking space
        } else {
            span.textContent = text[i];
            span.classList.add("letter");
            span.style.animationDelay = `${i * 0.1}s`; // Adjust for faster/slower effect
        }

        element.appendChild(span);
    }
}

/*

document.addEventListener("DOMContentLoaded", function() {
    applyLetterAnimation("#counter h3"); // For the h3 in #counter
    applyLetterAnimation(".animated-heading"); // For other h3 elements with class "animated-heading"
});*/
window.addEventListener('scroll', function(){
    let hasAnimated = false;

    const counterSection = document.querySelector("#counter");
    const rect = counterSection.getBoundingClientRect();

    if(rect.top <= window.innerHeight && !hasAnimated){
        applyLetterAnimation("#counter h3");
        hasAnimated = true;
    }
});

/*<!----------------------------------------------------------------------->
<!-----                          R E V I E W                          ----->
<!------------------------------------------------------------------------->
<!-----                          B O U N C E                        ----->*/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top <= window.innerHeight && rect.bottom >= 0);
}

function animateLetter(letter){
    return new Promise(resolve => {
        let  targetCharCode = letter.textContent.charCodeAt(0);
        let currentCharCode;

        if(targetCharCode >= 65 && targetCharCode <= 90){
            currentCharCode = 65;
        }else if(targetCharCode >= 97 && targetCharCode <= 122){
            currentCharCode = 97;
        }else{
            currentCharCode =33;
        }

        let interval = setInterval(() => {
            if(currentCharCode <= targetCharCode){
                letter.textContent = String.fromCharCode(currentCharCode);
                currentCharCode++
            }else{
                clearInterval(interval);
                resolve();
            }
        }, 20);
    })
}

async function animateWord(element){
    let text = element.textContent;
    element.innerHTML = "";

    for(let i = 0; i < text.length; i++){
        let letterSpan = document.createElement("span");
        letterSpan.textContent = text[i];
        element.appendChild(letterSpan);

        await animateLetter(letterSpan);
    }
}

let wordRunElement = document.getElementById('wordRun');
let hasAnimated = false;

window.addEventListener('scroll', function(){
    if (!hasAnimated && isInViewport(wordRunElement)){
        hasAnimated = true;
        animateWord(wordRunElement);
    }
})





window.addEventListener('scroll', function(){
    console.log("Scrolling..."); // To check if scroll event is detected
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        if(isInViewport(card)){
            console.log("Card in viewport!"); // To check if a card is detected in the viewport
            const h3Element = card.querySelector('h3.reviewName');
            if(!h3Element.classList.contains('animated')){
                console.log("Animating h3"); // To check if animation function is triggered
                h3Element.classList.add('animated');
                applyLetterAnimation(h3Element);
            }
        }
    });
});
/*<!------------------------------------------------------------------------->
<!-----                    N E W S  L E T T E R                         ----->
<!--------------------------------------------------------------------------->
<!-----                    N E W S  L E T T E R                       ----->*/ 
document.addEventListener('DOMContentLoaded', () =>{
    let toastBox = document.getElementById('toastBox');
    let signNotify = document.getElementById('signNotification');
    let emailInput = document.querySelector('#newsLetter input[type="text"]');

    function showNotify(msg){
        let notify = document.createElement('div');
        notify.classList.add('notify');
        notify.innerHTML = msg;
        toastBox.appendChild(notify);

        setTimeout(() => {
            notify.remove();
        }, 4000)

    }
    /*signNotify.addEventListener('click', () => {
        showNotify('Thank you for joining us.');
    });*/
    signNotify.addEventListener('click', () => {
        // Check if the email input is empty
        if (emailInput.value.trim() === "") {
            showNotify('<i class="bx bxs-shield-x error-icon"></i> Please enter an email .');
        } else {
            showNotify('<i class="bx bx-check-shield  success-icon"></i> Thank you for joining us.');
        }
    });
})

/*<!------------------------------------------------------------------------->
<!-----                     M O D E L . H T M L                         ----->
<!--------------------------------------------------------------------------->
<!-----                  M O D E L   E L E M E N T                    ----->*/

/*-----------------------------------click event on btn----------------------------------------------*/ 
const buttons = document.querySelectorAll('.selectBtn');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});


/*-----------------------------------functionality add on btn----------------------------------------------*/ 
function filterElements(category){
    let elements = document.querySelectorAll('.element');

    elements.forEach(element => element.style.display = 'none');
    if(category === "all"){
        elements.forEach(element => element.style.display = 'block')
    }
    else{
        let filterElements = document.querySelectorAll('.element[data-type = "' + category + '"]');
        filterElements.forEach(element => element.style.display = 'block');
    }
}

document.querySelectorAll('.selectBtn').forEach(btn => {
    btn.addEventListener('click', function() {
        let category = this.getAttribute('data-category');
        filterElements(category);
    });
});

filterElements('all');



/*<!------------------------------------------------------------------------->
<!-----                        S E R V I C E S                          ----->
<!--------------------------------------------------------------------------->
<!-----                     P L A C E H O L D E R                     ----->*/
document.addEventListener("DOMContentLoaded", function() {
    let isTyping = false;

    var options = {
        strings: ["Can i get advanced research paper on Cryogenic Engine?", "how to work liquid propulsion engine?", "What is our company policy?"],
        typeSpeed: 70,
        backSpeed: 30,
        backDelay: 1000,
        loop: true,
        preStringTyped : function(){
            if (isTyping){
                return false;
            }
        },
        onStringTyped: function(pos, self){
            document.getElementById('placeInput').placeholder = self.el.innerText;
        }
    };

    var typed = new Typed("#placeInput", options);

     // Listen for focus event on the input field
    document.getElementById("placeInput").addEventListener('focus', function(){
        typed.stop();
    });

    // Listen for input event (when user starts typing)
    document.getElementById('placeInput').addEventListener('input', function(){
        if(this.value){
            isTyping = true;
        }
    });

    // Listen for blur event on the input field
    document.getElementById('placeInput').addEventListener('blur', function(){
        if(isTyping){
            this.value = '';
            isTyping = false;
        }
        typed.start();

    });
    
});

/*<!------------------------------------------------------------------------->
<!-----                        S E R V I C E S                          ----->
<!--------------------------------------------------------------------------->
<!-----                         C A R O S E L                         ----->*/

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    let slides = document.getElementsByClassName("serSliders");
    let dots = document.getElementsByClassName("dot");

    // Display the first slide by default
    showSlides();

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "flex";
        dots[slideIndex - 1].className += " active-dot";

        // Uncomment the next line to make the slides change every 4 seconds
        // setTimeout(showSlides, 4000); 
    }
    setInterval(showSlides, 4000);
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function() {
            slideIndex = i;
            showSlides();
        });
    }
});
