//Background Option
let backgroundOption = true;

//variable to control background interval
let backGroundInterval;

//check if there's local storage
let backgroundLocalItem = localStorage.getItem("background_option");

if(backgroundLocalItem !== null){
    if(backgroundLocalItem === "true") {
        backgroundOption = true ;
        // console.log(backgroundLocalItem);
    }else {
        backgroundOption = false ;
        // console.log(backgroundLocalItem);

    }
    document.querySelectorAll(".random-background span").forEach(element=>{
        element.classList.remove("active");
    //add active class to the chosen element

    if(element.dataset.background == backgroundLocalItem ){
        element.classList.add("active");
    }
    })
}


//Check if there's local storage option
let maincolors = localStorage.getItem("currentColor");

if(maincolors !== null){
    

    //get color value from local storage
    document.documentElement.style.setProperty('--main--color',maincolors);

    //remove active class from all elements
    document.querySelectorAll(".colors-list li").forEach(element=>{
        element.classList.remove("active");
    //add active class to the chosen element

    if(element.dataset.color == maincolors){
        element.classList.add("active");
    }
    })
}


//select Landing page element
let landingPage = document.querySelector(".landing-page");

//Get Array Of Imgs
let imgArray = ["image 1.jpg","image 2.jpg","image 3.jpg","image 4.jpg","image 5.jpg"]
//Change Background image url 


//Get Random Number

// let randomNumber2 = Math.floor(Math.random())

// console.log(randomNumber);


//Make settings icon control settings box

let settingIcon = document.querySelector(".fa-gear");
var settingBox = document.querySelector(".settings-box");

settingIcon.addEventListener("click",function(){

        settingBox.classList.toggle("open");
        settingIcon.classList.toggle("fa-spin");
});

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color);

        //set color in local storage
        localStorage.setItem("currentColor",e.target.dataset.color);

        //remove active class from all childerns
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active");
        })

        //add active class to the chosen element
        e.target.classList.add("active");

    })
})


//Switch Background
const randomBackgroundElement = document.querySelectorAll(".random-background span");
randomBackgroundElement.forEach(span => {
    span.addEventListener("click",(e)=>{

        //remove active class from all childerns
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active");
        })

        //add active class to the chosen element
        e.target.classList.add("active");

        if(e.target.dataset.background === 'true'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
        }else{
            backgroundOption = false;
            clearInterval(backGroundInterval);
            localStorage.setItem("background_option",false);
                }

    })
})



// let noButton = document.querySelector(".no");


//function to randomize imgs

function randomizeImgs(){
    if(backgroundOption === true){
        backGroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage ='url("../image/' + imgArray[randomNumber] + '" )';
        }, 1000);
    }
}

randomizeImgs();


//Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function(){
    //skills offset top 
    let skillsOffsetTop = ourSkills.offsetTop;
    console.log(skillsOffsetTop);

    //Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    console.log(skillsOuterHeight);

    //Window Height
    let windowHeight = this.innerHeight;
    console.log(windowHeight);

    //Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    console.log(windowScrollTop);

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight))
    {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
}

//Create Popup With the image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{
    img.addEventListener("click",(e)=>{

        //Create Overlay Element
        let overlay = document.createElement("div");

        //Add Class To overlay
        overlay.className = 'popup-overlay';

        //Append Overlay To The Body
        document.body.appendChild(overlay);

        //Create The Popup
        let popupBox = document.createElement("div");

        // Add Class To The Popup
        popupBox.className = 'popup-box';

        //Create The close span
        let closeButton = document.createElement("span");

        //Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        //Add Class to Close Button
        closeButton.className = "close-button";

        //Append Close Button To The Popup Box 
        popupBox.appendChild(closeButton);

        if(img.alt !== null){
            //Create Heading
            let imgHeading = document.createElement("h3");

            //Create text inside The Heading
            let imgText = document.createTextNode(img.alt);

            //Append the text to the heading
            imgHeading.appendChild(imgText);

            //Append The Heading To Popup 
            popupBox.appendChild(imgHeading);

        }

        //Create The Image
        let popupImage = document.createElement("img");

        //Set Image Source
        popupImage.src = img.src;

        //Add Image to Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);
        
    })
})

//Close Popup
document.addEventListener("click",function(e){
    if(e.target.className == 'close-button') {
        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
})


