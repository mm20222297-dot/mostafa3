 
const heartContainers = document.querySelectorAll('.heart-container');

heartContainers.forEach(container => {
    const heart = container.querySelector('.heart');
    const count = container.querySelector('.count');
    let liked = false;
    let currentCount = 0;

    container.addEventListener('click', () => {
        liked = !liked;
        heart.classList.toggle('liked', liked);

        if(liked){
            currentCount++;
        } else {
            currentCount--;
        }

        count.textContent = currentCount;
    });
});
 

