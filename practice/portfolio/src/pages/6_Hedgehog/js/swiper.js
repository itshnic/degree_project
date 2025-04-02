const swiper = new Swiper(".swiper", {
	// Optional parameters,
	spaceBetween: 40,
	speed: 800,
	slidesPerView: 2,
	loop: true,
	watchSlidesVisibility: true,

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-btn__next",
		prevEl: ".swiper-btn__prev",
	},
	breakpoints: {
		1100: {
			slidesPerView: 2,
		},
		900: {
			slidesPerView: 1.9,
			spaceBetween: 38,
		},
		950: {
			slidesPerView: 1.8,
		},
		800: {
			slidesPerView: 1.7,
			spaceBetween: 36,
		},
		700: {
			slidesPerView: 1.5,
		},
		600: {
			slidesPerView: 1.4,
			spaceBetween: 34,
		},
		500: {
			slidesPerView: 1.3,
		},
		300: {
			slidesPerView: 1.2,
		},
	},
});

const overflow = function () {
	const swiper = document.querySelector(".swiper");
	// swiper.style.overflow = "visible";
	swiper.style.marginRight = "-40px";
	swiper.style.marginLeft = "-40px";
	swiper.style.paddingLeft = "40px";
	swiper.style.paddingRight = "40px";
	window.addEventListener("resize", () => {
		if (window.innerWidth < 1270) {
			swiper.style.marginRight = "";
			swiper.style.marginLeft = "";
			swiper.style.paddingLeft = "";
			swiper.style.paddingRight = "";
		}
	});
};
overflow();
