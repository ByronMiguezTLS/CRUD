// // Establecer cookies
// document.cookie = "name=Byron; expires=Mon, 01 Jul 2024 10:21:00 UTC; path=/";
// document.cookie = "apellido=Miguez; expires=Mon, 01 Jul 2024 10:23:40 UTC; path=/";

// // Establecer una cookie utilizando la función setCookie
// setCookie("email", "byron@gmail.com", 365);

// Eliminar cookies
// deleteCookie("name");
// deleteCookie("apellido");
// deleteCookie("email");

// console.log(document.cookie);

setCookie("nombre", "Byron", 365);
setCookie("apellido", "Miguez", 365);

getCookie("nombre");
function setCookie(name, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    console.log(cDecoded);
}
