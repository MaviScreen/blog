/* search start */
const search_btn = document.querySelector('#search-btn');
const search_text = document.querySelector('#search-btn form input');
search_btn.addEventListener('click', () => {
	if (!search_btn.classList.contains('focus-text')) {
		search_btn.classList.add('focus-text');
		search_text.focus();
	}else{
		search_btn.classList.remove('focus-text');
	}
});
/* search finish */

/* header sticky start */
const header_under = document.querySelector('#header-under');
const top_btn = document.querySelector('.top-btn');
window.addEventListener('scroll', () => {
	if(window.pageYOffset > 400){
		header_under.classList.add('sticky');
		top_btn.style.bottom = '30px';
	}else{
		header_under.classList.remove('sticky');
		top_btn.style.bottom = '-300px';
	}
});
top_btn.addEventListener('click', (e) => {
	document.documentElement.scrollTop = 0;
	console.log('x');
	e.preventDefault();
});
/* header sticky finish */
