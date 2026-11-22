document.addEventListener("DOMContentLoaded", () => {

    console.log("🌸 Invitación de bautizo iniciada correctamente");


    /* =================================================
       1. CONFIGURACIÓN GENERAL
       ================================================= */

    const CONFIG = {

        whatsappNumber: "7711362516",

        // Mensaje automático para WhatsApp.
        whatsappMessage:
            "¡Hola! Me gustaría confirmar mi asistencia al bautizo. 💗",

        // Mensaje cuando falta configurar algún enlace.
        errorMessage:
            "Este enlace todavía no está configurado. Por favor, actualiza los datos de la invitación."

    };


    /* =================================================
       2. CONFIRMACIÓN POR WHATSAPP
       ================================================= */

    const whatsappButton = document.getElementById("whatsappButton");

    if (whatsappButton) {

        whatsappButton.addEventListener("click", (event) => {

            event.preventDefault();

            // Eliminar espacios, guiones y símbolos.
            const number = CONFIG.whatsappNumber.replace(/\D/g, "");

            // Validar número.
            if (
                !number ||
                number === "NUMERODEWHATSAPP" ||
                number.length < 10
            ) {

                alert("Por favor, configura primero el número de WhatsApp.");

                return;
            }

            // Crear mensaje codificado.
            const message = encodeURIComponent(
                CONFIG.whatsappMessage
            );

            // Construir enlace.
            const whatsappURL =
                `https://wa.me/${number}?text=${message}`;

            // Abrir WhatsApp.
            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* =================================================
       3. ENLACES DE GOOGLE MAPS
       ================================================= */

    const mapLinks = document.querySelectorAll(".location-link");

    mapLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const url = link.getAttribute("href");

            // Detectar enlaces sin configurar.
            if (
                !url ||
                url === "#" ||
                url.includes("[") ||
                url.includes("ENLACE GOOGLE MAPS")
            ) {

                event.preventDefault();

                alert(CONFIG.errorMessage);

                return;
            }

            // Comprobar que sea un enlace válido.
            try {

                const parsedURL = new URL(url);

                if (
                    parsedURL.protocol !== "https:" &&
                    parsedURL.protocol !== "http:"
                ) {
                    throw new Error("Enlace no permitido");
                }

            } catch (error) {

                event.preventDefault();

                alert("El enlace de Google Maps no es válido.");

            }

        });

    });


    /* =================================================
       4. ANIMACIONES AL DESPLAZARSE
       ================================================= */

    const animatedElements = document.querySelectorAll(
        ".information-card, .confirmation-section"
    );

    // Respetar las preferencias de accesibilidad.
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach((element) => {

            element.classList.add("scroll-animation");

            observer.observe(element);

        });

    }


    /* =================================================
       5. CARGA DE IMÁGENES
       ================================================= */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            console.warn(
                "No se pudo cargar la imagen:",
                image.getAttribute("src")
            );

        });

    });


    /* =================================================
       6. ENLACES EXTERNOS SEGUROS
       ================================================= */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach((link) => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =================================================
       7. FINALIZACIÓN
       ================================================= */

    console.log("💗 Todas las interacciones están preparadas.");

});

/* =====================================================
   LLUVIA ALEATORIA Y CONSTANTE DE FLORES
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const flowerContainer = document.getElementById("flowerRain");

    if (!flowerContainer) return;

    // Respetar las preferencias de accesibilidad.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Imagen de la flor.
    const FLOWER_IMAGE = "img/flores/flor-lluvia.png";

    // Configuración de la lluvia.
    const CONFIG = {
        minInterval: 450,
        maxInterval: 1100,

        minSize: 14,
        maxSize: 32,

        minDuration: 12,
        maxDuration: 23,

        minOpacity: 0.12,
        maxOpacity: 0.28,

        maxFlowers: 35
    };

    // Generador aleatorio.
    const random = (min, max) =>
        Math.random() * (max - min) + min;

    // Crear una flor.
    function createFlower() {

        if (flowerContainer.childElementCount >= CONFIG.maxFlowers) {
            return;
        }

        const flower = document.createElement("img");

        flower.src = FLOWER_IMAGE;
        flower.alt = "";
        flower.className = "falling-flower";
        flower.draggable = false;

        // Tamaño aleatorio.
        const size = random(CONFIG.minSize, CONFIG.maxSize);

        // Velocidad aleatoria.
        const duration = random(
            CONFIG.minDuration,
            CONFIG.maxDuration
        );

        // Transparencia aleatoria.
        const opacity = random(
            CONFIG.minOpacity,
            CONFIG.maxOpacity
        );

        // Posición horizontal.
        const positionX = random(2, 96);

        // Movimiento lateral aleatorio.
        flower.style.left = `${positionX}%`;

        flower.style.setProperty("--flower-size", `${size}px`);

        flower.style.setProperty("--fall-duration", `${duration}s`);

        flower.style.setProperty("--flower-opacity", opacity);

        flower.style.setProperty(
            "--fall-distance",
            `${flowerContainer.scrollHeight + 100}px`
        );

        flower.style.setProperty(
            "--drift-one",
            `${random(-65, 65)}px`
        );

        flower.style.setProperty(
            "--drift-two",
            `${random(-80, 80)}px`
        );

        flower.style.setProperty(
            "--drift-three",
            `${random(-60, 60)}px`
        );

        flower.style.setProperty(
            "--drift-four",
            `${random(-90, 90)}px`
        );

        // Agregar la flor.
        flowerContainer.appendChild(flower);

        // Eliminarla al terminar su animación.
        flower.addEventListener("animationend", () => {
            flower.remove();
        }, { once: true });

        // Si la imagen no carga, eliminarla.
        flower.addEventListener("error", () => {
            flower.remove();
        }, { once: true });

    }

    // Lluvia constante con intervalos aleatorios.
    function startFlowerRain() {

        createFlower();

        const nextFlower = () => {

            const interval = random(
                CONFIG.minInterval,
                CONFIG.maxInterval
            );

            window.setTimeout(() => {

                createFlower();

                nextFlower();

            }, interval);

        };

        nextFlower();

    }

    startFlowerRain();

    console.log("🌸 Lluvia floral activada correctamente.");

});
