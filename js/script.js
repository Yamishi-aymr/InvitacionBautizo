
/* =====================================================
   INVITACIÓN DIGITAL - BAUTIZO
   JavaScript: Interacciones y funcionalidades
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌸 Invitación de bautizo iniciada correctamente");


    /* =================================================
       1. CONFIGURACIÓN GENERAL
       ================================================= */

    const CONFIG = {

        // Número de WhatsApp con código de país.
        // Ejemplo México: 521234567890
        whatsappNumber: "774474206",

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
