window.addEventListener('DOMContentLoaded',onload,false);
            
function onload() {
    alert('Welcome! This page is currently under construction, but check back soon for updates!');
    var buttons = document.getElementsByTagName("button")
    buttons[0].addEventListener('click', mitford, false)
    buttons[1].addEventListener('click', brecon, false)
    buttons[2].addEventListener('click', titan, false)
}

function mitford() {
hide_last();
    var mitfords = document.getElementById("mitford");
    if (mitfords.style.display == 'none')
        {mitfords.style.display = "block";}
        else {mitfords.style.display='none'}
}

function brecon() {
    var brecons = document.getElementById("brecon");
    if(brecons.style.display == 'none')
    {brecons.style.display = "block";}
    else {brecons.style.display='none'}
}

function titan() {
    var titans = document.getElementById("titans");
    if(titans.style.display == 'none')
    {titans.style.display = "block";}
    else{titans.style.display='none'}
}

function hide_last() {
    
}