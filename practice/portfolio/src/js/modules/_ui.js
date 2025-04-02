//<CloseWindow>
const closeWindow = function () {
	function closeSelect(event) {
		if (
			!event.classList.contains("_select__header") &&
			!event.classList.contains("_select__item")
		) {
			document.querySelectorAll("._select").forEach(item => {
				if (
					item.querySelector("._select__body").classList.contains("_active")
				) {
					item.querySelector("._select__body").classList.remove("_active");
					item.querySelector("._select__header").classList.remove("_rotate");
				}
			});
		}
	}
	function closeAccordeon(event) {
		if (!event.classList.contains("_button-accordeon")) {
			document.querySelectorAll("._button-accordeon").forEach(item => {
				if (item.classList.contains("_active")) {
					item.classList.remove("_active");
					item.nextElementSibling.classList.remove("_active");
				}
			});
		}
	}
	function closeBurger(event) {
		if (!event.classList.contains("_burger-cross")) {
			document.querySelectorAll("._burger-cross").forEach(item => {
				if (item.classList.contains("_active")) {
					item.classList.remove("_active");
					document.querySelector("._burger-list").classList.remove("_active");
				}
			});
		}
	}
	window.addEventListener("click", event => {
		closeSelect(event.target);
		closeAccordeon(event.target);
		closeBurger(event.target);
	});
};

//</CloseWindow>

//<Accordeon>
const accordeon = function () {
	const btn = document.querySelectorAll("._button-accordeon");

	btn.forEach(item => {
		item.addEventListener("click", active);
	});
	function active() {
		if (!this.classList.contains("_active")) {
			btn.forEach(item => {
				if (item.classList.contains("_active")) {
					item.classList.remove("_active");
					item.nextElementSibling.classList.remove("_active");
				}
			});
		}
		this.classList.toggle("_active");
		this.nextElementSibling.classList.toggle("_active");
	}
};
// accordeon();

//</Accordeon>

//<Burger>
const burger = function () {
	const icon = document.querySelector("._burger-cross");

	function active() {
		this.classList.toggle("_active");
		document.querySelector("._burger-list").classList.toggle("_active");
	}
	icon.addEventListener("click", active);
};
// burger();

//</Burger>

//<Select>
let select = function () {
	let selectHeader = document.querySelectorAll("._select__header");
	let selectItem = document.querySelectorAll("._select__item");

	selectHeader.forEach(item => {
		item.addEventListener("click", selectToggle);
	});

	selectItem.forEach(item => {
		item.addEventListener("click", selectChoose);
	});
	function closeAll() {
		document.querySelectorAll("._select").forEach(item => {
			if (item.querySelector("._select__body").classList.contains("_active")) {
				item.querySelector("._select__body").classList.remove("_active");
				item.querySelector("._select__header").classList.remove("_rotate");
			}
		});
	}

	function selectToggle() {
		closeAll();
		this.classList.toggle("_rotate");
		this.nextElementSibling.classList.toggle("_is-active");
	}

	function selectChoose() {
		let text = this.innerText,
			select = this.closest(".select"),
			currentText = select.querySelector(".select__header"),
			bodyActive = select.querySelector(".select__body");
		currentText.innerText = text;
		bodyActive.classList.remove("_is-active");
		currentText.classList.remove("_rotate");
	}
};
//select();

//</Select>

//<Scroll to the block>
const scrollToBlock = function () {
	const btn = document.querySelectorAll("._scroll-btn"), // кнопок может быть несколько
		block = document.querySelector("._scrollBlock-bg"), //Фон - накрывает все блоки
		cross = block.querySelector("._cross");
	btn.forEach(item => {
		item.addEventListener("click", open);
	});
	cross.addEventListener("click", open);
	function open() {
		block.classList.toggle("_active");
		block.scrollIntoView({ behavior: "smooth" });
	}
};
// scrollToBlock();

//</Scroll to the block>

// <Moving (перемещение) a tag>
const movingTag = function () {
	const tag = document.querySelector("._tag").cloneNode(true),
		whereFrom = document.querySelector("._откуда"),
		where = document.querySelector("_куда");

	function handleTabletChange(addElement, removeElement) {
		if (!addElement.querySelector("._tag")) addElement.append(tag);
		if (removeElement.querySelector("._tag"))
			removeElement.querySelector("._tag").remove();
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth < 991.98) handleTabletChange(whereFrom, where);
		if (window.innerWidth > 991.98) handleTabletChange(where, whereFrom);
	});
	function controlWidth() {
		if (window.innerWidth < 991.98) handleTabletChange(whereFrom, where);
	}
	controlWidth();
};
// movingTag();
// </Moving (перемещение) a tag>
