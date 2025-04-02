//Перемещение тега
const media = function () {
	const telTag = document.querySelector("#tel").cloneNode(true),
		menuTel = document.querySelector(".top-header__phone"),
		menuHeader = document.querySelector("#menu-header");

	function handleTabletChange(addElement, removeElement) {
		if (!addElement.querySelector("#tel")) addElement.append(telTag);
		if (removeElement.querySelector("#tel"))
			removeElement.querySelector("#tel").remove();
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth < 991.98) handleTabletChange(menuHeader, menuTel);
		if (window.innerWidth > 991.98) handleTabletChange(menuTel, menuHeader);
	});
	function controlWidth() {
		if (window.innerWidth < 991.98) handleTabletChange(menuHeader, menuTel);
	}
	controlWidth();
};
media();
// Бургер
const burger = function () {
	const icon = document.querySelector(".icons-header__burger");

	function active() {
		this.classList.toggle("_is-active");
		document.querySelector("#menu-header").classList.toggle("_is-active");
	}
	icon.addEventListener("click", active);
};
burger();
