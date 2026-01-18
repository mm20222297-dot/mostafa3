 
 
const scrollContainer =document .querySelectorAll('.products');
for(const item of scrollContainer ){
item.addEventListener('wheel',(evt)=>{
    evt.preventDefault();
    item.scrollLeft += evt.deltaY;
});
};

  