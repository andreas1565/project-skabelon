const menu = document.querySelector('nav ul');
 /* få fat i det element der har classen burgermenu og når det bliver clicket så hvis menu*/ 
const burgermenu = document.querySelector('#burgermenu');
burgermenu.addEventListener('click', function(){
        menu.style.display = "block";
        burgermenu.style.display = 'none';
    });
    /* få fat i det element der har classen closebtn og når det bliver clicket så skjulæ menuen*/
    const closebtn = document.querySelector('#closebtn');
  
    closebtn.addEventListener('click', function(){
        menu.style.display = "none";
        burgermenu.style.display = 'block';
});