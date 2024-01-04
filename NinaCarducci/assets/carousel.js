const carouselImg = document.querySelector(".carousel-img");
const leftArrow = document.querySelector(".carousel-control-prev");
const rightArrow = document.querySelector(".carousel-control-next");

const carouselIndicators = document.querySelector(".carousel-indicators");

const carouselImgArray = [
    {
        img: "ryoji-iwata-wUZjnOv7t0g-unsplash.webp",
        alt: "Photo d'un concert avec des lumières rouges",
    },
    {
        img: "nicholas-green-nPz8akkUmDI-unsplash.webp",
        alt: "Photo d'un homme d'affaire avec les bras croisés",
    },
    {
        img: "edward-cisneros-3_h6-1NPDGw-unsplash.webp ",
        alt: "Photo d'un femme souriante dans un environnement blanc",
    },
];

const imgUrl = "./assets/images/slider/";
let index = 0;

function handleClick(increment) {
    return (
        (index + increment + carouselImgArray.length) % carouselImgArray.length
    );
}

function drawCarouselIndicators() {
    while (carouselIndicators.hasChildNodes()) {
        carouselIndicators.removeChild(carouselIndicators.firstChild);
    }
    for (let i = 0; i < carouselImgArray.length; i++) {
        const indicator = document.createElement("span");
        i == index
            ? (indicator.className = "button active")
            : (indicator.className = "button ");

        indicator.id = `button${i}`;
        carouselIndicators.appendChild(indicator);
    }
}
drawCarouselIndicators();
function setIndex(newIndex) {
    index = newIndex;
    carouselImg.src = imgUrl + carouselImgArray[index].img;
    carouselImg.alt = imgUrl + carouselImgArray[index].alt;
}

function showNextImage() {
    index = handleClick(1);
    setIndex(index);
    drawCarouselIndicators();
}

function showPreviousImage() {
    index = handleClick(-1);
    setIndex(index);
    drawCarouselIndicators();
}

rightArrow.addEventListener("click", () => {
    showNextImage();
});

leftArrow.addEventListener("click", () => {
    showPreviousImage();
});

const carouselInterval = setInterval(showNextImage, 5000);
