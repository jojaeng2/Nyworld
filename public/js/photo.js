const target = document.getElementsByClassName('main-box__photo__box');

function show__photo(now) {
    for(var i=0; i<target.length; i++) {
        if(parseInt(i/3) + 1 == now.innerText) {
            target[i].style.display = "block";
        }
        else {
            target[i].style.display = "none";
        }
    }
}

function init() {
    var len;
    if(target.length % 3 == 0) {
        len = parseInt(target.length)/3 - 1;
    }
    else {
        len = parseInt(target.length)/3;
    }
    for(var i=0; i<=len; i++) {
        const selecting = document.createElement('div');
        selecting.className = 'select__btn';
        selecting.innerText = i+1;
        selecting.addEventListener("click", function(){show__photo(this)});
        document.querySelector('.main-box__photo__wrap').appendChild(selecting);
    }
    for(var i=0; i<target.length; i++) {
        if(parseInt(i/3) == 0) {
            target[i].style.display = "block";
        }
        else {
            target[i].style.display = "none";
        }
    }
}

window.onload = init();