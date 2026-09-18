/* =========================================
   DANIELA DEVELOP
   PORTAFOLIO 2026
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const header =
    document.querySelector(".header");

const menuButton =
    document.querySelector("#menuButton");

const nav =
    document.querySelector("#nav");

const navLinks =
    document.querySelectorAll(".nav a");

const revealElements =
    document.querySelectorAll(".reveal");

const cursorGlow =
    document.querySelector(".cursor-glow");

const heroVisual =
    document.querySelector(".hero-visual");

const whatsappLinks =
    document.querySelectorAll(".whatsapp-link");


/* =========================================
   WHATSAPP
========================================= */

const whatsappNumber =
    "584243162321";


const whatsappMessage =
    "Hola Daniela, vi tu portafolio de DanielaDevelop y me gustaría conversar sobre un proyecto web.";


const encodedWhatsappMessage =
    encodeURIComponent(
        whatsappMessage
    );


/* =========================================
   DETECTAR DISPOSITIVO MÓVIL
========================================= */

function isMobileDevice() {

    const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        window.opera;


    return (
        /Android|iPhone|iPad|iPod|Mobile/i
            .test(userAgent)
    );

}


/* =========================================
   CREAR ENLACE DE WHATSAPP
========================================= */

function getWhatsappLink() {

    if (isMobileDevice()) {

        return (
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodedWhatsappMessage
        );

    }


    return (
        "https://web.whatsapp.com/send?phone=" +
        whatsappNumber +
        "&text=" +
        encodedWhatsappMessage
    );

}


/* =========================================
   ASIGNAR WHATSAPP
========================================= */

function updateWhatsappLinks() {

    const whatsappURL =
        getWhatsappLink();


    whatsappLinks.forEach(
        link => {

            link.href =
                whatsappURL;

        }
    );

}


updateWhatsappLinks();


/* =========================================
   HEADER AL HACER SCROLL
========================================= */

function updateHeader() {

    if (!header) {
        return;
    }


    header.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =========================================
   MENÚ RESPONSIVE
========================================= */

function closeMobileMenu() {

    if (nav) {

        nav.classList.remove(
            "active"
        );

    }


    if (menuButton) {

        menuButton.classList.remove(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    document.body.classList.remove(
        "menu-open"
    );

}


if (
    menuButton &&
    nav
) {

    menuButton.addEventListener(
        "click",
        () => {

            const isActive =
                nav.classList.toggle(
                    "active"
                );


            menuButton.classList.toggle(
                "active",
                isActive
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isActive)
            );


            document.body.classList.toggle(
                "menu-open",
                isActive
            );

        }
    );

}


/* =========================================
   CERRAR MENÚ AL PULSAR ENLACE
========================================= */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    }
);


/* =========================================
   CERRAR MENÚ AL CAMBIAR TAMAÑO
========================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 1100
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================
   ANIMACIONES REVEAL
========================================= */

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "active"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "active"
            );

        }
    );

}


/* =========================================
   CURSOR GLOW
========================================= */

const hasFinePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (
    cursorGlow &&
    hasFinePointer
) {

    window.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.opacity =
                "1";


            cursorGlow.style.left =
                `${event.clientX}px`;


            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            cursorGlow.style.opacity =
                "0";

        }
    );

}


/* =========================================
   EFECTO 3D DEL HERO
========================================= */

if (
    heroVisual &&
    hasFinePointer
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual
                    .getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left;


            const mouseY =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                (
                    mouseX -
                    centerX
                ) / 100;


            const rotateX =
                (
                    centerY -
                    mouseY
                ) / 100;


            heroVisual.style.transform = `

                perspective(1200px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                translateY(-3px)

            `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform = `

                perspective(1200px)

                rotateX(0deg)

                rotateY(0deg)

                translateY(0)

            `;

        }
    );

}


/* =========================================
   SCROLL SUAVE
========================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    anchor => {


        /*
            No interferimos con
            los botones de WhatsApp.
        */

        if (
            anchor.classList.contains(
                "whatsapp-link"
            )
        ) {

            return;

        }


        anchor.addEventListener(
            "click",
            function(event) {


                const targetId =
                    this.getAttribute(
                        "href"
                    );


                /*
                    Los enlaces # de Instagram
                    y GitHub todavía no tienen
                    URL real.
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    event.preventDefault();

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target
                        .getBoundingClientRect()
                        .top
                    +
                    window.pageYOffset
                    -
                    headerHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* =========================================
   TECLA ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }

    }
);