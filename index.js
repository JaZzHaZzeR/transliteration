const converter = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'g',
	д: 'd',
	е: 'e',
	ё: 'e',
	ж: 'zh',
	з: 'z',
	и: 'i',
	й: 'y',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'h',
	ц: 'c',
	ч: 'ch',
	ш: 'sh',
	щ: 'sch',
	ь: '',
	ы: 'y',
	ъ: '',
	э: 'e',
	ю: 'yu',
	я: 'ya',
	А: 'A',
	Б: 'B',
	В: 'V',
	Г: 'G',
	Д: 'D',
	Е: 'E',
	Ё: 'E',
	Ж: 'Zh',
	З: 'Z',
	И: 'I',
	Й: 'Y',
	К: 'K',
	Л: 'L',
	М: 'M',
	Н: 'N',
	О: 'O',
	П: 'P',
	Р: 'R',
	С: 'S',
	Т: 'T',
	У: 'U',
	Ф: 'F',
	Х: 'H',
	Ц: 'C',
	Ч: 'Ch',
	Ш: 'Sh',
	Щ: 'Sch',
	Ь: '',
	Ы: 'Y',
	Ъ: '',
	Э: 'E',
	Ю: 'Yu',
	Я: 'Ya',
};

const data = [{ id: 1, rus: 'Привет 👋🏻', eng: 'Privet' }];
const btnPush = document.querySelector('#btn-add');
const inputText = document.querySelector('.text');
const buttonDelete = document.querySelector('.img-right');
const buttonDelAll = document.querySelector('.btn-clear');

// Функция сравнить текст из input со свойствами объекта
function tranaslit(str) {
	let result = '';
	for (let i = 0; i < str.length; i += 1) {
		const char = str[i];
		if (converter[char]) {
			result += converter[char];
		} else {
			result += str[i]; // подстраховка Privet - Privet
		}
	}
	return result;
}
//ставлю символ '…' если длина строки больше 7 символов
function hidden(str) {
	if (str.length > 7) {
		return str.slice(0, 7) + '…';
	}
	return str;
}

const tooltipHandler = element => {
	// наведение мышкой
	element.addEventListener('mouseover', event => {
		const tooltip = document.createElement('div');
		tooltip.className = 'tooltip'
		tooltip.innerText = event.target.getAttribute('title'); // достаем title из элемента на который навели мышку
		document.body.appendChild(tooltip); // добавил

		const rect = event.target.getBoundingClientRect(); // dвозвращаем размер эелемента в (таргите span класс word)
		const tooltipRect = tooltip.getBoundingClientRect(); // размер tooltip

		tooltip.style.top = `${rect.top - tooltipRect.height}px`; // отступы топ и лево
		tooltip.style.left = `${rect.left}px`;
	});

	element.addEventListener('mouseout', event => {
		const tooltip = document.querySelector('.tooltip');
		if (tooltip) tooltip.remove()
	});
};

const parseElements = data => {
	const oldLeftUl = document.querySelector('.table-left-list'); // нашли старую
	const oldRightUl = document.querySelector('.table-right-list');
	const leftUl = document.createElement('ul'); // создал новую
	const rightUl = document.createElement('ul');
	leftUl.className = 'table-left-list';
	rightUl.className = 'table-right-list';

	data.forEach((el, i) => {
		//левые
		const liRus = document.createElement('li');
		const number = document.createElement('span');
		const wordRus = document.createElement('span');
		number.className = 'number';
		wordRus.className = 'word';
		number.innerText = i + 1;
		wordRus.innerText = Number(el.id) !== 1 ? hidden(el.rus) : el.rus; // не обрезаем первую строку
		wordRus.title = el.rus;
		tooltipHandler(wordRus); // повесил маус слушатель
		liRus.appendChild(number);
		liRus.appendChild(wordRus);
		leftUl.appendChild(liRus);

		//правый
		const liEng = document.createElement('li');
		const wordEng = document.createElement('span');
		const buttonDel = document.createElement('img');
		liEng.id = el.id;// id
		buttonDel.className = 'img-right';
		buttonDel.src = './icons/cross.svg';
		wordEng.className = 'word';
		wordEng.title = el.eng;
		wordEng.innerText = hidden(el.eng);
		liEng.appendChild(wordEng);
		liEng.appendChild(buttonDel);
		rightUl.appendChild(liEng);
		buttonDel.addEventListener('click', deleteElement);
		tooltipHandler(wordEng);
	});

	oldLeftUl.innerHTML = '';
	oldLeftUl.append(leftUl); // добавил на страницу
	oldRightUl.innerHTML = '';
	oldRightUl.append(rightUl);//
};

function buttonHandler(event) {
	event.preventDefault();
	const rus = inputText.value;
	const eng = tranaslit(rus);

	if (rus.length) {
		const currentDate = new Date();
		// console.log(currentDate)
		const id = currentDate.getTime(); // переводим в числа
		// console.log(id)

		data.push({ id, rus, eng });

		parseElements(data);
		inputText.value = '';
	}
}

// клик кнопка Добавить
btnPush.addEventListener('click', event => {
	buttonHandler(event);
});

//клик кнопка Добавить по Enter
inputText.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		buttonHandler(event);
	}
});

buttonDelete.addEventListener('click', deleteElement);

function deleteElement(event) {
	event.preventDefault();
	const elementId = event.target.parentElement.id;// возвращаем родительский id
	// console.log(elementId)
	// console.log(data.findIndex(el => el.id === Number(elementId)))
	console.log(data)
	if (elementId !== '1') {
		data.splice(
			data.findIndex(el => el.id === Number(elementId)),
			1
		);
		parseElements(data); // перерисовываем элементы на основ. data
	}
}

buttonDelAll.addEventListener('click', event => {
	event.preventDefault();
	const filteredData = data.filter(el => el.id === 1);
	data.splice(0, data.length, ...filteredData); //удалем все, добавляем  filteredData
	parseElements(data); // перерисовываем страницу
});