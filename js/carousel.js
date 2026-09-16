// Infinite carousel functionality
const carousel = document.querySelector(".carousel-container");

// Get the original carousel items
const originalItems = Array.from(
    carousel.querySelectorAll(".carousel-item-custom")
);

// Clone the items
const firstClones = originalItems.map(item => item.cloneNode(true));
const lastClones = originalItems.map(item => item.cloneNode(true));

// Add clones to the END
firstClones.forEach(clone => {
    carousel.appendChild(clone);
});

// Add clones to the START
lastClones.reverse().forEach(clone => {
    carousel.insertBefore(clone, carousel.firstChild);
});

let isJumping = false;

// Wait for images/layout to load, then center the 3rd original image
window.addEventListener("load", () => {
    const originalWidth = getOriginalWidth();
    const items = carousel.querySelectorAll(".carousel-item-custom");
    
    // The 3rd original image is at index (originalItems.length + 2) because of the clones at the start
    const thirdItem = items[originalItems.length + 2];
    if (thirdItem) {
        const itemOffset = thirdItem.offsetLeft;
        const itemWidth = thirdItem.offsetWidth;
        const containerWidth = carousel.offsetWidth;
        
        carousel.scrollLeft = itemOffset - (containerWidth / 2) + (itemWidth / 2);
    } else {
        carousel.scrollLeft = originalWidth;
    }
});

function getOriginalWidth() {
    const items = carousel.querySelectorAll(".carousel-item-custom");

    let width = 0;

    // Calculate width of the first 7 items
    for (let i = 0; i < originalItems.length; i++) {
        width += items[i].offsetWidth;

        const style = getComputedStyle(items[i]);
        width += parseFloat(style.marginLeft);
        width += parseFloat(style.marginRight);
    }

    return width;
}

carousel.addEventListener("scroll", () => {
    if (isJumping) return;

    const originalWidth = getOriginalWidth();

    // If user reaches the cloned section on the left
    if (carousel.scrollLeft < 10) {
        isJumping = true;

        carousel.scrollLeft += originalWidth;

        requestAnimationFrame(() => {
            isJumping = false;
        });
    }

    // If user reaches the cloned section on the right
    else if (carousel.scrollLeft >= originalWidth * 2) {
        isJumping = true;

        carousel.scrollLeft -= originalWidth;

        requestAnimationFrame(() => {
            isJumping = false;
        });
    }
});