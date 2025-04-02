//<Burger>
const burger = function () {
	const icon = document.querySelector("._burger-cross");

	function active() {
		this.classList.toggle("_active");
		document.querySelector("._burger-list").classList.toggle("_active");
	}
	icon.addEventListener("click", active);
};
burger();

//</Burger>
// <блок формы>
const getForm = function () {
	const form = document.querySelector("#form"),
		btn = form.querySelector("#footer-form__btn"),
		formContent = document.querySelectorAll("[data-form]"),
		valid = form.querySelectorAll("[data-form='valid']"),
		formResponse = document.querySelector(".footer-mail__response");
	function textResponse() {
		formContent.forEach(item => {
			item.classList.toggle("_hidden-form");
		});
		formResponse.classList.toggle("_hidden-form");
	}
	btn.addEventListener("click", e => {
		e.preventDefault();
		valid.forEach(item => {
			if (!item.value && !item.classList.contains("_valid-no")) {
				item.classList.add("_valid-no");
			} else if (item.value && item.classList.contains("_valid-no")) {
				item.classList.remove("_valid-no");
			}
		});
		if (form.querySelector("._valid-no")) {
			btn.classList.toggle("_shake");
			setTimeout(() => {
				btn.classList.toggle("_shake");
			}, 1000);
		} else sendMessage();
	});
	async function sendMessage() {
		const formData = new FormData(form);
		const response = await fetch("php/server.php", {
			method: "POST",
			body: formData,
		});
		if (response.ok) {
			textResponse();
			form.reset();
			setTimeout(textResponse, 3000);
		} else {
			alert("Ошибка");
		}
	}
};
getForm();
// </блок формы>

// <popup>
const popup = function () {
	const portfolioImg = document.querySelectorAll(".main-portfolio__linkImg"),
		scrollNone = document.querySelector("body"),
		btn = document.querySelector(".footer-mail__btn"),
		popup = document.querySelectorAll("._main-popup");

	portfolioImg.forEach(item => {
		item.addEventListener("click", el => {
			const parent = el.target.closest("._parent-popup");
			parent.querySelector("._main-popup").classList.toggle("_active");
			scrollNone.classList.add("lock");
			el.preventDefault();
		});
	});
	btn.addEventListener("click", el => {
		const parent = el.target.closest("._parent-popup");
		parent.querySelector("._main-popup").classList.toggle("_active");
		scrollNone.classList.add("lock");
		el.preventDefault();
	});
	popup.forEach(item => {
		item.addEventListener("click", el => {
			if (el.target.classList.contains("_active")) {
				el.target.classList.remove("_active");
				scrollNone.classList.remove("lock");
			} else if (el.target.classList.contains("_close-popup")) {
				el.target.closest("._main-popup").classList.remove("_active");
				scrollNone.classList.remove("lock");
			}
			el.preventDefault();
		});
	});
};
popup();
// </popup>

// <language Russ/Engl>
const language = function () {
	function selectLang(prefix) {
		fetch("json/language.json")
			.then(response => response.json())
			.then(data => {
				render(prefix, data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function render(prefix, data) {
		content.forEach(element => {
			const dataSet = `${element.dataset.lang}-${prefix}`;
			for (let key in data) {
				if (key == dataSet) {
					element.innerHTML = data[key];
				}
			}
		});
	}
	function action(e) {
		btnAll.forEach(item => {
			if (item.classList.contains("_active")) item.classList.remove("_active");
		});
		if (!e.target.classList.contains("_active"))
			e.target.classList.add("_active");
	}

	const content = document.querySelectorAll("[data-lang]");
	const btnRu = document.querySelector("#ru");
	const btnEng = document.querySelector("#eng");
	const btnAll = document.querySelectorAll(".lang__link");
	selectLang("eng");
	btnRu.addEventListener("click", e => {
		selectLang("ru");
		action(e);
		e.preventDefault();
	});
	btnEng.addEventListener("click", e => {
		selectLang("eng");
		action(e);
		e.preventDefault();
	});
};
language();
// </language Russ/Engl>

// <scroll to the block>
const scrollToBlock = function () {
	const arrBtn = ["home", "about", "skills", "portfolio", "contacts"];
	arrBtn.forEach(item => {
		const block = document.querySelector(`#${item}`);
		block.addEventListener("click", e => {
			document
				.querySelector(`#scroll-${item}`)
				.scrollIntoView({ behavior: "smooth", block: "center" });
			e.preventDefault();
			arrBtn.forEach(item => {
				const removeColor = document.querySelector(`#${item}`);
				if (removeColor.classList.contains("_active")) {
					removeColor.classList.remove("_active");
				}
			});
			e.target.classList.add("_active");
		});
	});
};
scrollToBlock();
// </scroll to the block>

//<RenderSkills> Чтение JSON и рендер данных в swiper (style="width: ${data[key].stars * 20}%;) - звездный рейтинг управление
const renderSlideSkills = function () {
	const parent = document.querySelector("#wrapper-skills");
	function renderSkills(data, key) {
		return `<div class="main-skills__slide slide-skills swiper-slide">
									<div class="slide-skills__img">
										<img src="${data[key].img}" alt="skill" />
									</div>
									<h3 class="slide-skills__title">${data[key].title}</h3>
									<div class="slide-skills__star">
										<div class="slide-skills__active" style="width: ${data[key].stars * 20}%;">
									</div>
								</div>`;
	}
	fetch("json/skills.json")
		.then(response => response.json())
		.then(data => {
			// console.log(data);
			for (let key in data) {
				parent.insertAdjacentHTML("beforeend", renderSkills(data, key));
			}
			if (document.querySelector(".main-skills__swiper")) {
				new Swiper(".main-skills__swiper", {
					loop: true,
					slidesPerView: 4,
					grabCursor: true,
					spaceBetween: 9,
					autoHeight: true,
					speed: 800,
					watchOverflow: true,
					loopAdditionalSliders: true,
					pagination: {
						el: ".main-skills__dots",
						clickable: true,
					},
					autoplay: {
						delay: 2000,
						disableOnInteraction: false,
					},
					slideToClickedSlide: true,
					breakpoints: {
						320: {
							slidesPerView: 1.0,
						},
						440: {
							slidesPerView: 2,
						},
						650: {
							slidesPerView: 3,
						},
						950: {
							slidesPerView: 4.0,
						},
					},
				});
			}
		})
		.catch(error => {
			console.log(error);
		});
};
renderSlideSkills();
//</RenderSkills>

//<show card portfolio>
const clickCount = function () {
	let input = document.querySelector("#input");
	let click = parseInt(input.value);
	click++;
	input.value = click;
	showPage(click);

	function showPage(click) {
		let allItems = document.querySelectorAll(".item-portfolio");
		let arrAllItems = Array.from(allItems);
		// console.log(arrAllItems);
		let countPage = click * 3;
		let showCountPage =
			arrAllItems.length >= countPage ? countPage : arrAllItems.length;
		for (let a = 0; a < allItems.length; a++) {
			if (allItems[a].className != "_hidden")
				allItems[a].classList.add("_hidden");
		}
		// console.log(arrAllItems);
		for (let i = 0; i < showCountPage; i++) {
			arrAllItems[i].classList.toggle("_hidden");
		}
	}
};
clickCount();
//</show card portfolio>

//<Swiper>
if (document.querySelector(".main-portfolio__swiper")) {
	new Swiper(".main-portfolio__swiper", {
		loop: true,
		slidesPerView: 1,
		grabCursor: true,
		spaceBetween: 10,
		autoHeight: true,
		speed: 800,
		watchOverflow: true,
		loopAdditionalSliders: true,
		slideToClickedSlide: true,
		navigation: {
			nextEl: ".swiper-button-prev",
			prevEl: ".swiper-button-next",
		},
	});
}
//</Swiper>
