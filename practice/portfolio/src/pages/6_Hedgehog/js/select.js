let select = function () {
	let selectHeader = document.querySelectorAll(".select__header");

	window.addEventListener("click", event => {
		if (
			!event.target.classList.contains("select__header") &&
			!event.target.classList.contains("select__item")
		) {
			closeAll();
		}
	});

	selectHeader.forEach(item => {
		item.addEventListener("click", selectToggle);
	});

	function closeAll() {
		let select = document.querySelectorAll(".select");
		select.forEach(item => {
			let header = item.querySelector(".select__header"),
				body = item.querySelector(".select__body");
			if (body.classList.contains("_is-active")) {
				body.classList.remove("_is-active");
				header.classList.remove("_rotate");
			}
		});
	}

	function selectToggle() {
		this.classList.toggle("_rotate");
		this.nextElementSibling.classList.toggle("_is-active");
	}
};

select();
