const navContainerOfItems = document.querySelector(".nav__list");

    if(window.matchMedia("(min-width: 48.44rem)").matches && window.matchMedia("(max-width: 79.43rem)").matches){
        navContainerOfItems.innerHTML = `
        <li class="li-ig"><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                        <div class="nav-query-div">
                            <li><a href="#"><i class="fa-solid fa-house"></i></a></li>
                            <li><a href="#"><span class="material-symbols-outlined">search</span></a></li>
                            <li><a href="#"><i class="fa-regular fa-compass"></i></a></li>
                            <li><a href="#"><i class="fa-solid fa-play"></i></a></li>
                            <li><a href="#"><i class="fa-regular fa-square-plus"></a></i></li>
                            <li><a href="#"><i class="fa-brands fa-facebook-messenger"></a></i></li>
                            <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                            <li><a href="#"><img src="perfil.jpg" alt=""></a></li>
                        </div>
                        <li class="last-item"><a href="#"><i class="fa-solid fa-bars"></i></a></li>
        `;
    }
    else if(window.matchMedia("(min-width: 79.44rem)").matches){
        navContainerOfItems.innerHTML = `
        <li class="li-ig"><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                        <div class="nav-query-div">
                            <li><a href="#"><i class="fa-solid fa-house"></i>Inicio</a></li>
                            <li><a href="#"><span class="material-symbols-outlined">search</span>Búsqueda</a></li>
                            <li><a href="#"><i class="fa-regular fa-compass"></i>Explorar</a></li>
                            <li><a href="#"><i class="fa-solid fa-play"></i>Reels</a></li>
                            <li><a href="#"><i class="fa-regular fa-square-plus"></i>Crear</a></li>
                            <li><a href="#"><i class="fa-brands fa-facebook-messenger"></i>Mensajes</a></li>
                            <li><a href="#"><i class="fa-regular fa-heart"></i>Notificaciones</a></li>
                            <li><a href="#"><img src="perfil.jpg" alt=""></a></li>
                        </div>
                        <li class="last-item"><a href="#"><i class="fa-solid fa-bars"></i>Más</a></li>
        `;
    }
    else{
        navContainerOfItems.innerHTML = `
        <li><a href="#"><i class="fa-solid fa-house"></i></a></li>
                        <li><a href="#"><i class="fa-regular fa-compass"></i></a></li>
                        <li><a href="#"><i class="fa-solid fa-play"></i></a></li>
                        <li><a href="#"><i class="fa-regular fa-square-plus"></a></i></li>
                        <li><a href="#"><i class="fa-brands fa-facebook-messenger"></a></i></li>
                        <li><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                        <li><a href="#"><img src="perfil.jpg" alt=""></a></li>
        `;
    }
