document.addEventListener('DOMContentLoaded', function() {

    navegacionFija()
    crearGaleria()
    navegacionEnlace()
    scrollNav() 
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    document.addEventListener('scroll', function() {
        if( sobreFestival.getBoundingClientRect().bottom < 1 ) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')
    const CANTIDAD_IMAGENES = 16

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/${i}.jpg`
        imagen.alt = 'Imagen Galería'

        // Event Handler = Es el proceso de detectar y responder a una interacción del usuario
        imagen.onclick = function () {
            mostrarImagen(i)
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen (i) {
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/${i}.jpg`
    imagen.alt = 'Imagen Galería'

    //Generar Modal = Es una ventana de diálogo o cuadro emergente que se muestra sobre la página actual.
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    // Botón cerrar modal
    const cerrarModalBoton = document.createElement('BUTTON')
    cerrarModalBoton.textContent = 'X'
    cerrarModalBoton.classList.add('boton-cerrar')
    cerrarModalBoton.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBoton)

    //agregar al HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)

    // Agregar evento para cerrar con ESC
    document.addEventListener("keydown", (ev) => {
        if (ev.key === 'Escape'){
            cerrarModal()
        }
    })    
} 

function cerrarModal () {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
    
}

function navegacionEnlace () {
    document.addEventListener ('scroll', function() {
        const section = document.querySelectorAll('section')
        const navLinks =document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        section.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if ( window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                actual = section.id
            }
        })

        navLinks.forEach( link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}