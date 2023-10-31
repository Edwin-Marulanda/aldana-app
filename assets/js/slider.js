let prevScrollPosition = 0;

function scrollHandler(e) {
    // At a time out of 150 by default for better browser support,
    // but do not set a time out if a snapping point has been reached.
    let atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0,
        timeOut = atSnappingPoint ? 0 : 150,
        slider = e.target.closest(".js-slider");

    clearTimeout(e.target.scrollTimeout);
    e.target.scrollTimeout = setTimeout(function () {
        const currentScrollPosition = parseInt(e.target.scrollLeft, 10);

        slider.classList.remove("slider--last", "slider--first");

        if (currentScrollPosition > prevScrollPosition) {
            if (
                e.target.scrollWidth - currentScrollPosition ===
                e.target.offsetWidth
            ) {
                slider.classList.add("slider--last");
            }
        } else if (currentScrollPosition < prevScrollPosition) {
            if (currentScrollPosition <= 0) {
                slider.classList.add("slider--first");
            }
        }
        prevScrollPosition = currentScrollPosition;
    }, timeOut);
}

function updateSlidePosition(e, direction) {
    const firstSlideWidth = e.querySelector(".slider__slide").offsetWidth;

    if (direction === "prev") {
        e.scrollLeft = e.scrollLeft - firstSlideWidth;
    } else {
        e.scrollLeft = e.scrollLeft + firstSlideWidth;
    }
}

document
    .querySelector(".js-slider-inner")
    .addEventListener("scroll", scrollHandler);

document
    .querySelector(".js-slider-prev")
    .addEventListener("click", function () {
        updateSlidePosition(this.nextElementSibling, "prev");
    });

document
    .querySelector(".js-slider-next")
    .addEventListener("click", function () {
        updateSlidePosition(this.previousElementSibling, "next");
    });
