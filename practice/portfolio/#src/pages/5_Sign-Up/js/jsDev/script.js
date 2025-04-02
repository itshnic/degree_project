class SelectorsForm {
	constructor(selectors) {
		this.form = document.querySelector(selectors.form);
		this.focusType = selectors.typeEventFocus;
		this.selectHeader = selectors.selectHeader;
		this.selectItem = selectors.selectItem;
		this.selectBody = selectors.selectBody;
		this.selectList = Array.from(
			this.form.querySelectorAll(selectors.selectList)
		);
		this.select = selectors.select;
		this.submit = this.form.querySelector(selectors.submit);
		this.shake = selectors.shake;
		this.svg = this.form.querySelector(selectors.classSvg);
		this.validation = selectors.validation;
		this.validText = selectors.validText;
		this.validNo = selectors.validNo;
		this.password = this.form.querySelector(selectors.password);
		this.passwordConfirm = this.form.querySelector(selectors.passwordConfirm);
		this.inputAll = Array.from(this.form.querySelectorAll(selectors.input));
		this.inputType = selectors.typeEventInput;
		this.inputBox = selectors.inputBox;
		this.iconBlock = selectors.iconBlock;
		this.iconCheck = selectors.iconCheck;
		this.iconEye = selectors.iconEye;
		this.iconEyeBlocked = selectors.iconEyeBlocked;
		this.interval = selectors.interval;
		this.checkValueForEventFocus = selectors.checkValueForEventFocus;
		this.checkValueForEventInput = selectors.checkValueForEventInput;
		this.classAnimateBox = selectors.classAnimateBox;
		this.classAnimateSvg = selectors.classAnimateSvg;
		this.registered = this.form.querySelector(selectors.registered);
		this.timeVisibRegist = selectors.timeVisibRegist;
		this.header = this.form.querySelector(selectors.header);
		this.btnAnimate = this.form.querySelector(selectors.btnAnimate);
	}
	get selectHeaderAll() {
		return Array.from(this.form.querySelectorAll(`.${this.selectHeader}`));
	}
	getBlock(itemBlock, selector) {
		const mainBlock = itemBlock.closest(this.validation);
		return mainBlock.querySelector(selector);
	}
	checkValueSelector() {
		this.selectHeaderAll.forEach(item => {
			if (!item.innerText) {
				this.getBlock(item, this.validText).style.display = "block";
				this.getBlock(item, `.${this.select}`).classList.add(this.validNo);
			}
		});
	}
	checkValueInput() {
		this.inputAll.forEach(item => {
			if (!item.value) {
				this.getBlock(item, this.validText).style.display = "block";
				item.classList.add(this.validNo);
			}
		});
	}
}
class CheckValueAllSelectors extends SelectorsForm {
	constructor(selectors) {
		super(selectors);
	}

	checkValue(object, eventBlock) {
		if (eventBlock.value) {
			if (eventBlock.value.match(object.patternReg)) {
				if (eventBlock.classList.contains(this.validNo)) {
					eventBlock.classList.remove(this.validNo);
					this.getBlock(eventBlock, this.validText).style.display = "none";
				}
				if (object.iconClass) {
					this.getBlock(eventBlock, this.iconBlock).classList.add(
						object.iconClass
					);
				}
			} else {
				if (!eventBlock.classList.contains(this.validNo))
					eventBlock.classList.add(this.validNo);
				this.getBlock(eventBlock, this.validText).style.display = "block";
			}
		} else {
			if (eventBlock.classList.contains(this.validNo)) {
				eventBlock.classList.remove(this.validNo);
				this.getBlock(eventBlock, this.validText).style.display = "none";
			}
		}
	}
}
class CheckPassword extends CheckValueAllSelectors {
	constructor(selectors) {
		super(selectors);
	}
	passwordConfirmOnLock() {
		if (this.password.value) this.passwordConfirm.disabled = 0;
		else this.passwordConfirm.disabled = 1;
	}
	contrastPassword() {
		if (this.password.value && this.passwordConfirm.value) {
			let iconBlock = this.getBlock(this.passwordConfirm, this.iconBlock);
			if (this.password.value == this.passwordConfirm.value) {
				iconBlock.classList.add(this.iconCheck);
				if (this.passwordConfirm.classList.contains(this.validNo)) {
					this.passwordConfirm.classList.remove(this.validNo);
					this.getBlock(this.passwordConfirm, this.validText).style.display =
						"none";
				}
			} else {
				if (iconBlock.classList.contains(this.iconCheck))
					iconBlock.classList.remove(this.iconCheck);
				if (!this.passwordConfirm.classList.contains(this.validNo))
					this.passwordConfirm.classList.add(this.validNo);
			}
		} else if (!this.passwordConfirm.value)
			if (this.passwordConfirm.classList.contains(this.validNo)) {
				this.passwordConfirm.classList.remove(this.validNo);
				this.getBlock(this.passwordConfirm, this.validText).style.display =
					"none";
			}
	}
	addEye() {
		let iconBlock = this.getBlock(this.password, this.iconBlock);
		if (this.password.value) {
			if (
				!iconBlock.classList.contains(this.iconEye) &&
				!iconBlock.classList.contains(this.iconEyeBlocked)
			)
				iconBlock.classList.add(this.iconEye);
		} else if (!this.password.value) {
			if (iconBlock.classList.contains(this.iconEye))
				iconBlock.classList.remove(this.iconEye);
			if (iconBlock.classList.contains(this.iconEyeBlocked)) {
				iconBlock.classList.remove(this.iconEyeBlocked);
				this.password.type = "password";
				this.passwordConfirm.type = "password";
			}
		}
	}
}
class EventBlock extends CheckPassword {
	constructor(selectors) {
		super(selectors);
		this.eventInput(this.checkValueForEventInput, this.inputType);
		this.eventInput(this.checkValueForEventFocus, this.focusType);
		this.clickEye();
		this.eventInputConfirm();
		this.eventSelect();
	}
	eventInput(arr, type) {
		arr.forEach(object => {
			let eventBlock = this.form.querySelector(object.selector);
			eventBlock.addEventListener(`${type}`, () => {
				this.passwordConfirmOnLock();
				this.addEye();
				this.checkValue(object, eventBlock);
			});
		});
	}
	eventSelect() {
		this.selectList.forEach(item => {
			item.addEventListener("click", () => {
				let selectBlock = this.getBlock(item, `.${this.select}`);
				let selectText = this.getBlock(item, `.${this.selectHeader}`);
				if (
					selectText.innerText &&
					selectBlock.classList.contains(this.validNo)
				) {
					this.getBlock(item, this.validText).style.display = "none";
					selectBlock.classList.remove(this.validNo);
				}
			});
		});
	}
	eventInputConfirm() {
		this.passwordConfirm.addEventListener("input", () => {
			this.contrastPassword();
		});
	}
	clickEye() {
		let blockEye = this.getBlock(this.password, this.iconBlock);
		blockEye.addEventListener("click", () => {
			if (this.password.type == "password") {
				this.password.type = "text";
				this.passwordConfirm.type = "text";
				blockEye.classList.remove(this.iconEye);
				blockEye.classList.add(this.iconEyeBlocked);
			} else if (this.password.type == "text") {
				this.password.type = "password";
				this.passwordConfirm.type = "password";
				blockEye.classList.remove(this.iconEyeBlocked);
				blockEye.classList.add(this.iconEye);
			}
		});
	}
}
class SubmitForm extends EventBlock {
	constructor(selectors) {
		super(selectors);
		this.submitForm();
		this.getAnimate();
		this.visibilityOnLoad();
	}
	get arrayBlocks() {
		let arr = Array.from(this.form.querySelectorAll(this.inputBox));
		arr.push(this.btnAnimate);
		arr.unshift(this.header);
		return arr;
	}
	submitForm() {
		let formTag = document.querySelector("form");
		formTag.addEventListener("submit", e => {
			e.preventDefault();
			let formData = new FormData(this.form);
			this.checkValueSelector();
			this.checkValueInput();
			if (this.form.querySelectorAll(`.${this.validNo}`).length) {
				this.submit.classList.add(this.shake);
				this.shakeNot();
			} else {
				this.visibility(this.svg, this.classAnimateSvg);
				this.arrayBlocks.forEach(item => {
					this.visibility(item, this.classAnimateBox);
				});
				this.visibilityTimeOut(formData);
			}
		});
	}
	NameValueOfSelect(obj) {
		this.selectHeaderAll.forEach(item => {
			let text = item.innerText;
			let name = item.getAttribute("data-name");
			obj.append(name, text);
		});
		return obj;
	}
	shakeNot() {
		setTimeout(() => {
			this.submit.classList.remove(this.shake);
		}, 800);
	}
	visibility(item, selector) {
		item.classList.toggle(selector);
	}
	removeValue() {
		this.selectHeaderAll.forEach(item => {
			item.innerText = "";
		});
		this.inputAll.forEach(item => {
			item.value = "";
			let iconBlock = this.getBlock(item, this.iconBlock);
			if (iconBlock) {
				if (iconBlock.classList.contains(this.iconCheck))
					iconBlock.classList.remove(this.iconCheck);
				if (iconBlock.classList.contains(this.iconEyeBlocked))
					iconBlock.classList.remove(this.iconEyeBlocked);
				if (iconBlock.classList.contains(this.iconEye))
					iconBlock.classList.remove(this.iconEye);
			}
		});
	}
	visibilityOnLoad() {
		this.visibility(this.svg, this.classAnimateSvg);
		let interval = 1;
		let length = this.arrayBlocks.length;
		this.arrayBlocks.forEach(item => {
			this.visibility(item, this.classAnimateBox);
			length -= 1;
			interval += this.interval;
			item.style.zIndex = length;
			item.style.animationDelay = `${interval}s`;
		});
	}
	async visibilityTimeOut(obj) {
		let response = await fetch("php/server.php", {
			method: "POST",
			body: this.NameValueOfSelect(obj),
		});
		if (response.ok) {
			this.visibility(this.registered, this.classAnimateBox);
			setTimeout(() => {
				this.visibility(this.registered, this.classAnimateBox);
				this.removeValue();
				this.passwordConfirmOnLock();
				this.visibilityOnLoad();
			}, this.timeVisibRegist);
		}
	}
	getAnimate() {
		let lengthSvg = this.form.querySelector("#iconPath").getTotalLength();
		this.svg.setAttribute(`stroke-dashoffset`, lengthSvg);
		this.svg.setAttribute(`stroke-dasharray`, lengthSvg);
	}
}
class RenderSelect extends SubmitForm {
	constructor(selectors) {
		super(selectors);
		this.wayServer = selectors.wayServer;
		this.idDay = this.form.querySelector(selectors.idDay);
		this.idYear = this.form.querySelector(selectors.idYear);
		this.idMonth = this.form.querySelector(selectors.idMonth);
		this.idNationality = this.form.querySelector(selectors.idNationality);
		this._fetchData();
	}
	_fetchData() {
		fetch(this.wayServer)
			.then(response => response.json())
			.then(data => {
				this.dataServer = data;
				this.addElement(this.idDay, this.inArrayNum(this.dataServer.day));
				this.addElement(this.idYear, this.inArrayNum(this.dataServer.year));
				this.addElement(this.idMonth, this.dataServer.month);
				this.addElement(this.idNationality, this.dataServer.nationality);
				this.clickAddText();
			})
			.catch(error => {
				console.log(error);
			});
	}
	inArrayNum(arr) {
		let arrItem = [];
		for (let i = arr[1]; i >= arr[0]; i--) {
			arrItem.push(i);
		}
		return arrItem;
	}
	render(element) {
		return `<li class="select__item">${element}</li>`;
	}
	addElement(el, data) {
		let list = el.querySelector(".select__list");
		data.forEach(element => {
			list.insertAdjacentHTML("beforeend", this.render(element));
		});
	}
}
class SelectForm extends RenderSelect {
	constructor(selectors) {
		super(selectors);
		this.clickOutside();
		this.clickOpen();
	}

	get selectItemsArr() {
		return this.form.querySelectorAll(`.${this.selectItem}`);
	}

	clickOutside() {
		window.addEventListener("click", event => {
			if (
				!event.target.classList.contains(this.selectHeader) &&
				!event.target.classList.contains(this.selectItem)
			) {
				this.closeAll();
			}
		});
	}
	clickOpen() {
		this.selectHeaderAll.forEach(item => {
			item.addEventListener("click", event => {
				this.selectToggle(event.target);
			});
		});
	}
	clickAddText() {
		this.selectItemsArr.forEach(item => {
			item.addEventListener("click", event => {
				this.selectChoose(event.target);
			});
		});
	}
	closeAll(event = null) {
		this.form.querySelectorAll(`.${this.select}`).forEach(item => {
			let header = item.querySelector(`.${this.selectHeader}`),
				body = item.querySelector(`.${this.selectBody}`);
			if (body.classList.contains("_is-active") && event != header) {
				body.classList.remove("_is-active");
				header.classList.remove("_rotate");
			}
		});
	}
	selectToggle(event) {
		this.closeAll(event);
		event.classList.toggle("_rotate");
		event.nextElementSibling.classList.toggle("_is-active");
	}
	selectChoose(event) {
		let text = event.innerText,
			select = event.closest(".select"),
			currentText = select.querySelector(".select__header"),
			bodyActive = select.querySelector(".select__body");
		currentText.innerText = text;
		bodyActive.classList.remove("_is-active");
		currentText.classList.remove("_rotate");
	}
}

let valueForm = new SelectForm({
	form: ".form-signUp",
	input: "._input",
	selectHeader: "select__header",
	validation: ".validation",
	select: "select",
	selectList: ".select__list",
	selectBody: "select__body",
	selectItem: "select__item",
	validText: ".validation__text",
	validNo: "_valid-no",
	password: "#password",
	passwordConfirm: "#confirm-password",
	iconBlock: ".validation__icon", // селектор блока в который передадим иконку
	iconCheck: "_icon-check-mail",
	iconEye: "_icon-eye", // иконка - показывает пароль
	iconEyeBlocked: "_icon-eye-blocked",
	submit: "#submit",
	shake: "_shake",
	typeEventInput: "input",
	typeEventFocus: "focusout",
	//скрытие и плавное появление блока
	header: ".form-signUp__header",
	inputBox: ".input-signUp__box",
	btnAnimate: ".submit-signUp__animateBtn",
	registered: ".registered",
	timeVisibRegist: 4000,
	interval: 0.3,
	classAnimateSvg: "_animate-svg",
	classAnimateBox: "_animate-box",
	classSvg: ".form-signUp__svg",
	//</скрытие и плавное появление блока>
	// <render select>
	wayServer: "json/select.json",
	idDay: "#day",
	idYear: "#year",
	idMonth: "#month",
	idNationality: "#nationality",
	// </render select>
	checkValueForEventInput: [
		{
			selector: "#email",
			patternReg: "^[a-z0-9](.?[a-z0-9]){5,}@yahoo.com$",
			iconClass: "_icon-check-mail",
		},
		{
			selector: "#password",
			patternReg: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$",
			iconClass: false,
		},
	],
	checkValueForEventFocus: [
		{
			selector: "#name",
			patternReg: "[A-Za-zА-Яа-яЁё]{3,20}",
			iconClass: false, // если нужна иконка - передаем ее класс иначе передаем false
		},
		{
			selector: "#last-name",
			patternReg: "[A-Za-zА-Яа-яЁё]{3,20}",
			iconClass: false,
		},
	],
});
valueForm;
