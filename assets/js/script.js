document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='http']:not([target])");
    links.forEach(link => {
        const isExternal = link.hostname !== location.hostname;
        if (isExternal) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "nofollow noopener noreferrer");
        }
    });
});