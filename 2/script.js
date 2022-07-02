// list and length
var list;
var len;
fetch("./list.json")
.then(response => {
   return response.json();
})
.then(jsondata => list = jsondata)
.then(list => len = list.length-1)
.then(() => movement(1))



//current last people
var change = 6;
if(window.getComputedStyle(document.getElementsByClassName("comp")[0]).display != "none"){
    change = 6;
    console.log("Desktop")
} else {
    change = 3;
    console.log("Mobile")
}

//remove last word
function removeLastWord(str) {
    var lastIndex = str.lastIndexOf(" ");

    str = str.substring(0, lastIndex);
    return(str);
}

//show more
function show(string, review){
    review.getElementsByClassName("altro")[0].onclick = function(){
        review.getElementsByClassName("text")[0].innerHTML = string;
        review.getElementsByClassName("altro")[0].style.display = "none";
    } 
}

function altro(review){
    if(change==6){
        var limit = 65
    }
    if(change==3){
        var limit = 43
    }
    if(review.getElementsByClassName("text")[0].offsetHeight >= limit){
        original_string = review.getElementsByClassName("text")[0].innerHTML;
        while(review.getElementsByClassName("text")[0].offsetHeight >= limit){
            review.getElementsByClassName("text")[0].innerHTML = removeLastWord(review.getElementsByClassName("text")[0].innerHTML) + "...";
        }
        review.getElementsByClassName("altro")[0].style.display = "block";
        review.getElementsByClassName("altro")[0].addEventListener("click", show(original_string, review));
    }
}

//scroll
current_iter = -1
function movement(add){
    //fix version switch
    if(window.getComputedStyle(document.getElementsByClassName("comp")[0]).display != "none"){
        change = 6;
        console.log("Desktop")
    } else {
        change = 3;
        console.log("Mobile")
    }
    //current tab
    current_iter += add;
    for(var i = 0; i<change; i++){
        try {
            var review = document.getElementsByClassName("content")[i];
            //set reviews
            review.getElementsByClassName("name")[0].innerHTML = list[i + current_iter*change]["title"];
            review.getElementsByClassName("text")[0].innerHTML = list[i + current_iter*change]["text"];
            review.getElementsByClassName("time")[0].innerHTML = list[i + current_iter*change]["date"];
            review.getElementsByClassName("avatar")[0].src = list[i + current_iter*change]["icon"];
            review.getElementsByClassName("altro")[0].onclick = function(){return false};
            review.getElementsByClassName("altro")[0].style.display = "none"
            altro(review)
        } catch (error) {
            console.log("Overflow");
        }
    }
    
    //lock scroll down
    if(current_iter>=1){
        document.getElementsByClassName("arrow")[0].style.display = "flex"
    } else {
        document.getElementsByClassName("arrow")[0].style.display = "none"
    }
    //scroll lock up
    if(current_iter <= len/change-1){
        document.getElementsByClassName("arrow")[1].style.display = "flex"
    } else {
        document.getElementsByClassName("arrow")[1].style.display = "none"
    }
}

