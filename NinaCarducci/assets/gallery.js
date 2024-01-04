const gallery = document.querySelector(".gallery");
const galleryClass = "gallery-item";
const size = 316;
const galleryData = [
    {
        img: "./assets/images/gallery/concerts/aaron-paul-wnX-fXzB6Cw-unsplash.webp",
        alt: "Photo d'un concert avec des lumières rouges",
        tag: "Concert",
    },

    {
        img: "./assets/images/gallery/entreprise/ali-morshedlou-WMD64tMfc4k-unsplash.webp",
        alt: "Photo d'un homme d'affaire avec les bras croisés",
        tag: "Entreprises",
    },
    {
        img: "./assets/images/gallery/entreprise/jason-goodman-tHO1_OuKbg0-unsplash.webp",
        alt: "Photo d'un femme souriante dans un environnement blanc",
        tag: "Entreprises",
    },
    {
        img: "./assets/images/gallery/mariage/hannah-busing-RvF2R_qMpRk-unsplash.webp",
        alt: "Photo d'un couple marié qui se touche des bouts des doigts",
        tag: "Mariages",
    },
    {
        img: "./assets/images/gallery/portraits/ade-tunji-rVkhWWZFAtQ-unsplash.webp",
        alt: "Photo d'un homme avec les yeux fermé",
        tag: "Portraits",
    },
    {
        img: "./assets/images/gallery/mariage/jakob-owens-SiniLJkXhMc-unsplash.webp",
        alt: "Photo d'un couple marié qui se tien la main en souriant sous un palmier",
        tag: "Mariages",
    },
    {
        img: "./assets/images/gallery/portraits/nino-van-prattenburg--443cl1uR_8-unsplash.webp",
        alt: "Photo d'un femme portant des lunettes qui s'appuie sur une grille",
        tag: "Portraits",
    },
    {
        img: "./assets/images/gallery/concerts/austin-neill-hgO1wFPXl3I-unsplash.webp",
        alt: "Photo d'un homme qui chante dans un micro avec la main en l'air devant de la fumée blanche",
        tag: "Concert",
    },
    {
        img: "./assets/images/gallery/entreprise/mateus-campos-felipe-Fsgzm8N0hIY-unsplash.webp",
        alt: "Photo d'un femme souriante devant un ordinateur portable",
        tag: "Entreprises",
    },
];

galleryData.forEach((data) => {
    const img = createImage(data.img, data.alt, data.tag);
    gallery.appendChild(img);
});

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedTag = button.getAttribute("data-tag");
        filterImages(selectedTag);

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
    });
});

function createImage(pic, alt, tag) {
    const img = document.createElement("img");
    img.width = size;
    img.height = size;
    img.src = pic;
    img.alt = alt;
    img.dataset.tag = tag;
    img.classList.add(galleryClass);
    img.classList.add("filtered");
    return img;
}

function filterImages(selectedTag) {
    const images = document.querySelectorAll(".gallery img");
    images.forEach((img) => {
        const imgTag = img.dataset.tag;

        if (selectedTag === "Tous" || imgTag === selectedTag) {
            img.classList.remove("hidden");
            img.classList.add("visible");
        } else {
            img.classList.add("hidden");
            img.classList.remove("visible");
        }
    });
}
