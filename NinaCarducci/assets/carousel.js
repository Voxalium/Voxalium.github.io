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
    function createIndicator(i) {
        const indicator = document.createElement("span");
        indicator.id = `button${i}`;

        i == index
            ? (indicator.className = "button active")
            : (indicator.className = "button ");
        indicator.addEventListener("click", () => {
            index = i;
            setIndex();
            drawCarouselIndicators();
        });
        return indicator;
    }
    for (let i = 0; i < carouselImgArray.length; i++) {
        carouselIndicators.appendChild(createIndicator(i));
    }
}

drawCarouselIndicators();
function setIndex() {
    carouselImg.src = imgUrl + carouselImgArray[index].img;
    carouselImg.alt = imgUrl + carouselImgArray[index].alt;
}

rightArrow.addEventListener("click", () => {
    index = handleClick(+1);
    setIndex();
    drawCarouselIndicators();
});
leftArrow.addEventListener("click", () => {
    index = handleClick(-1);
    setIndex();
    drawCarouselIndicators();
});
