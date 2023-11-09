const offset = (el) => {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: Math.round(rect.top + scrollTop),
		left: Math.round(rect.left + scrollLeft),
	};
};

const viewElementInPage = (el) => {
	const elemHeight = el.offsetHeight; // высота элемента
	const elemOffsetTop = offset(el).top; /// позиция элемента
	const animateStart = 3; //момент скрола

	const animatePoint =
		window.innerHeight < elemHeight
			? window.innerHeight - window.innerHeight / animateStart
			: window.innerHeight - elemHeight / animateStart;

	if (
		window.pageYOffset > elemOffsetTop - animatePoint &&
		window.pageYOffset < elemOffsetTop + elemHeight
	) {
		el.classList.add('active');
	} else {
		if (!el.dataset.animateCount === 'once') {
			el.classList.remove('active');
		}
	}
};

window.addEventListener('load', () => {
	const ArrayAnimateElement = Array.from(document.querySelectorAll('.animate'));

	window.addEventListener('scroll', () => {
		ArrayAnimateElement.forEach((elem) => {
			viewElementInPage(elem);
		});
	});
});
