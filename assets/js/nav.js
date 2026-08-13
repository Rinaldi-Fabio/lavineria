// Tendina del menu su mobile: apre, chiude, blocca lo scroll.
// Le classi sono quelle di WordPress perche' custom.css e' il file del tema,
// copiato senza modifiche.
(function () {
	var container = document.getElementById('lv-menu');
	var open = document.querySelector('.wp-block-navigation__responsive-container-open');
	var close = document.querySelector('.wp-block-navigation__responsive-container-close');
	if (!container || !open || !close) return;

	function setOpen(isOpen) {
		container.classList.toggle('is-menu-open', isOpen);
		document.documentElement.classList.toggle('has-modal-open', isOpen);
		open.setAttribute('aria-expanded', String(isOpen));
		if (isOpen) close.focus();
		else open.focus();
	}

	open.addEventListener('click', function () { setOpen(true); });
	close.addEventListener('click', function () { setOpen(false); });

	// Un link ancora chiude la tendina, altrimenti copre la sezione raggiunta.
	container.addEventListener('click', function (e) {
		if (e.target.closest('a')) setOpen(false);
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && container.classList.contains('is-menu-open')) setOpen(false);
	});
})();
