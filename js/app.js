// global variables
const pageNavContainer = document.querySelector('.navbar__list');
const pageContainer = document.querySelector('main');
const pageSections = document.querySelectorAll('main section');
const scrollButton = document.querySelector('.landing__scroll-button');
const fragment = document.createDocumentFragment();
let pageAtTop = true;

// create nav items (links)
function createNavItems() {
	for (let section of pageSections) {
		observer.observe(section);
		const newNavItem = document.createElement('li');
		const newNavAnchorItem = document.createElement('a');

		const sectionName = section.dataset.nav;
		newNavAnchorItem.innerText = sectionName;
		const newAnchorLink = sectionName.split(' ').join('').toLowerCase();
		newNavAnchorItem.setAttribute('href', `#${newAnchorLink}`);
		newNavAnchorItem.classList.add('menu__link');
		newNavAnchorItem.addEventListener('click', event => {
			event.preventDefault();
			section.scrollIntoView({ behavior: 'smooth' });
		});

		newNavItem.appendChild(newNavAnchorItem);
		fragment.appendChild(newNavItem);
	}

	navbar__list.appendChild(fragment);
}

// method called for scroll to top or bottom
function scrollPage() {
	pageAtTop ? window.scroll(0, 10000) : window.scroll(0, 0);
}

// called from intersection observer to know which section to set active and update the scroll to top/button content and action
function setPageSectionActiveState(entry) {
	let entryAnchorClassList = document.querySelector('[href="#' + entry.target.id + '"]').classList;
	const entryLastItem = pageSections[pageSections.length - 1];
	const entryFirstItem = pageSections[0];
	entry.target.classList.add('active');
	entryAnchorClassList.add('active');

	if (entry.target.id === entryFirstItem.id) {
		pageAtTop = true;
		scrollButton.innerText = '👇🏾';
		scrollButton.style.display = 'block';
	} else if (entry.target.id === entryLastItem.id) {
		pageAtTop = false;
		scrollButton.innerText = '👆🏾';
		scrollButton.style.display = 'block';
	} else {
		scrollButton.style.display = 'none';
	}
}

// called from intersection observer to know which section to set inactive and update the scroll to top/button content and action
function removePageSectionActiveState(entry) {
	entry.target.classList.remove('active');
	document.querySelector('[href="#' + entry.target.id + '"]').classList.remove('active');
}

// setting observer for the sections to get when they are active
let observer = new IntersectionObserver(
	(entries, _observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setPageSectionActiveState(entry);
			} else {
				removePageSectionActiveState(entry);
			}
		});
	},
	{ threshold: 0.6 }
);

// page load action
document.addEventListener('DOMContentLoaded', _event => {
	createNavItems();
});
