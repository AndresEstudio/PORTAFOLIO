// ===== CONFIGURACIÓN INICIAL =====
// Esperamos a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN MÓVIL =====
    // Obtener referencias a los elementos del menú móvil
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        // Alternar la clase 'active' en el menú
        navMenu.classList.toggle('active');
        // Alternar la clase 'active' en el botón hamburguesa
        navToggle.classList.toggle('active');
    }
    
    // Agregar evento de clic al botón hamburguesa
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar el menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remover las clases 'active' para cerrar el menú
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // ===== NAVEGACIÓN SUAVE =====
    // Hacer que los enlaces de navegación se desplacen suavemente a las secciones
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            
            // Obtener el ID de la sección desde el atributo href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición de la sección, restando la altura de la navegación
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // Desplazarse suavemente a la sección
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    // Obtener referencia al formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    // Función para manejar el envío del formulario
    function handleFormSubmit(e) {
        e.preventDefault(); // Prevenir el envío por defecto del formulario
        
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica de campos requeridos
        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Validación básica del formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // Simular envío del formulario
        console.log('Formulario enviado correctamente');
        console.log('Datos del formulario:', {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        });
        
        // Mostrar mensaje de confirmación al usuario
        alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
        
        // Limpiar el formulario después del envío
        contactForm.reset();
    }
    
    // Agregar evento de envío al formulario
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // ===== EFECTOS DE SCROLL =====
    // Función para agregar efectos visuales al hacer scroll
    function handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;
        
        // Cambiar el estilo de la barra de navegación al hacer scroll
        if (scrollPosition > 100) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Efecto de aparición gradual para las secciones
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Si la sección está visible en la ventana
            if (scrollPosition + windowHeight > sectionTop + 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Agregar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // ===== ANIMACIONES DE ENTRADA =====
    // Configurar animaciones iniciales para las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Aplicar estilos iniciales para la animación
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Aplicar un pequeño retraso para cada sección
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // ===== EFECTOS HOVER PARA TARJETAS =====
    // Agregar efectos interactivos a las tarjetas de proyectos y habilidades
    const cards = document.querySelectorAll('.skill-card, .project-card, .area-card');
    
    cards.forEach(card => {
        // Efecto al pasar el mouse por encima
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        // Efecto al quitar el mouse
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO =====
    // Obtener referencias a los campos del formulario
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    
    // Función para validar el campo de nombre
    function validateNombre() {
        const nombre = nombreInput.value.trim();
        if (nombre.length < 2) {
            nombreInput.style.borderColor = '#ef4444';
            return false;
        } else {
            nombreInput.style.borderColor = '#38bdf8';
            return true;
        }
    }
    
    // Función para validar el campo de email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.style.borderColor = '#ef4444';
            return false;
        } else {
            emailInput.style.borderColor = '#38bdf8';
            return true;
        }
    }
    
    // Función para validar el campo de mensaje
    function validateMensaje() {
        const mensaje = mensajeInput.value.trim();
        if (mensaje.length < 10) {
            mensajeInput.style.borderColor = '#ef4444';
            return false;
        } else {
            mensajeInput.style.borderColor = '#38bdf8';
            return true;
        }
    }
    
    // Agregar validación en tiempo real a los campos
    if (nombreInput) {
        nombreInput.addEventListener('input', validateNombre);
        nombreInput.addEventListener('blur', validateNombre);
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('blur', validateEmail);
    }
    
    if (mensajeInput) {
        mensajeInput.addEventListener('input', validateMensaje);
        mensajeInput.addEventListener('blur', validateMensaje);
    }
    
    // ===== EFECTO DE TYPING EN EL TÍTULO PRINCIPAL =====
    // Función para crear efecto de escritura en el título
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de typing al título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
    
    // ===== CONTADOR DE ESTADÍSTICAS =====
    // Función para animar números en contadores
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ===== MENSAJE DE BIENVENIDA =====
    // Mostrar mensaje de bienvenida en la consola
    console.log('🚀 ¡Bienvenido al portafolio de Andres Entrena!');
    console.log('📧 Para contactar: andres.entrena@email.com');
    console.log('🔧 Desarrollado con HTML, CSS y JavaScript puro');
    
    // ===== MANEJO DE ERRORES =====
    // Función para manejar errores de manera elegante
    window.addEventListener('error', function(e) {
        console.error('Error en la aplicación:', e.error);
        // En un entorno de producción, aquí podrías enviar el error a un servicio de monitoreo
    });
    
    // ===== OPTIMIZACIÓN DE RENDIMIENTO =====
    // Función para cargar imágenes de manera lazy (perezosa)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Inicializar carga perezosa de imágenes
    lazyLoadImages();
    
});

// ===== FUNCIONES GLOBALES =====
// Función para mostrar/ocultar el botón de "volver arriba"
function toggleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
}

// Agregar evento de scroll para el botón de volver arriba
window.addEventListener('scroll', toggleBackToTop);

// ===== CONFIGURACIÓN DE PERFORMANCE =====
// Optimizar el rendimiento reduciendo la frecuencia de eventos de scroll
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function() {
        // Aquí se ejecutarían las funciones de scroll optimizadas
    }, 10);
});
