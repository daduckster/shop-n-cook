import { searchInStorage, populateList } from '/src/index';

const searchForm = document.querySelectorAll('.search');
const searchbar = document.querySelectorAll('.input--search');
const searchMobile = document.querySelector('.search-mobile');
const searchDesktop = document.querySelector('.search-desktop');
const toggleBtn = document.querySelectorAll('.toggle-btn');

toggleBtn.forEach(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault();
		if (btn.classList.contains('toggle-btn--disabled')) {
			toggleBtn.forEach(btn => {
				btn.classList.remove('toggle-btn--disabled');
				btn.classList.add('toggle-btn--active');
			});
		} else if (btn.classList.contains('toggle-btn--active')) {
			toggleBtn.forEach(btn => {
				btn.classList.remove('toggle-btn--active');
				btn.classList.add('toggle-btn--disabled');
			});
		}
		keywordSearch(e);
	});
});

searchMobile.addEventListener('keyup', e => {
	synchronizeMobileSearchbar(e);
	keywordSearch(e);
});
searchDesktop.addEventListener('keyup', e => {
	synchronizeDesktopSearchbar(e);
	keywordSearch(e);
});

searchDesktop.addEventListener('search', e => {
	e.preventDefault();
	if (e.target.value === '') {
		synchronizeDesktopSearchbar(e);
		populateList();
	}
});
searchMobile.addEventListener('search', e => {
	e.preventDefault();
	if (e.target.value === '') {
		synchronizeMobileSearchbar(e);
		populateList();
	}
});

searchForm.forEach(form => {
	form.addEventListener('submit', e => keywordSearch(e));
});

searchMobile.addEventListener('submit', e => keywordSearch(e));
searchDesktop.addEventListener('submit', e => keywordSearch(e));

const synchronizeMobileSearchbar = e => {
	e.preventDefault();
	searchDesktop.value = searchMobile.value;
};

const synchronizeDesktopSearchbar = e => {
	e.preventDefault();
	searchMobile.value = searchDesktop.value;
};

function keywordSearch(e) {
	e.preventDefault();
	const searchInputText = searchMobile.value.toLowerCase();

	if (toggleBtn[0].classList.contains('toggle-btn--disabled')) {
		const id = 'withoutIngredients';
		searchInStorage(searchInputText, id, e);
	} else if (toggleBtn[0].classList.contains('toggle-btn--active')) {
		const id = 'withIngredients';
		searchInStorage(searchInputText, id, e);
	}
}

export { searchMobile, searchDesktop };
