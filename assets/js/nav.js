// Tre comportamenti: la tendina del menu su mobile, lo stato di apertura
// calcolato sull'ora di Roma, e l'ombra dell'header legata allo scroll.
// Le classi sono quelle di WordPress perche' custom.css e' il file del tema.
(function () {
	'use strict';

	/* --- Tendina del menu ------------------------------------------------ */
	var container = document.getElementById('lv-menu');
	var open = document.querySelector('.wp-block-navigation__responsive-container-open');
	var close = document.querySelector('.wp-block-navigation__responsive-container-close');

	if (container && open && close) {
		var SELETTORE_FOCUSABILI = 'a[href], button:not([disabled])';

		function focusabiliDelPannello() {
			return Array.prototype.filter.call(
				container.querySelectorAll(SELETTORE_FOCUSABILI),
				function (el) { return el.offsetParent !== null; }
			);
		}

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
			if (!container.classList.contains('is-menu-open')) return;

			if (e.key === 'Escape') {
				setOpen(false);
				return;
			}

			// Il pannello e' opaco e copre tutto: senza questo il Tab uscirebbe
			// a camminare fra i link della pagina sotto, invisibili.
			if (e.key !== 'Tab') return;
			var elementi = focusabiliDelPannello();
			if (!elementi.length) return;

			var primo = elementi[0];
			var ultimo = elementi[elementi.length - 1];

			if (e.shiftKey && document.activeElement === primo) {
				e.preventDefault();
				ultimo.focus();
			} else if (!e.shiftKey && document.activeElement === ultimo) {
				e.preventDefault();
				primo.focus();
			}
		});
	}

	/* --- Stato di apertura ------------------------------------------------ */
	// Orari: lunedi'-sabato 7:00-22:00, domenica chiuso. L'ora e' quella di
	// Roma, non quella del visitatore: un turista con il telefono su un altro
	// fuso deve leggere lo stesso "aperto" di chi e' in Via XX Settembre.
	var APERTURA = 7 * 60;
	var CHIUSURA = 22 * 60;

	function statoApertura() {
		var roma = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
		var giorno = roma.getDay(); // 0 = domenica
		var minuti = roma.getHours() * 60 + roma.getMinutes();

		if (giorno !== 0 && minuti >= APERTURA && minuti < CHIUSURA) {
			return { aperto: true, testo: 'Aperto ora · si chiude alle 22:00' };
		}

		var quando;
		if (giorno !== 0 && minuti < APERTURA) quando = 'oggi';
		else if (giorno === 6) quando = 'lunedì';
		else quando = 'domani';

		return { aperto: false, testo: 'Chiuso · si riapre ' + quando + ' alle 7:00' };
	}

	var stato = statoApertura();
	Array.prototype.forEach.call(document.querySelectorAll('.lv-status'), function (el) {
		el.textContent = stato.testo;
		el.classList.add(stato.aperto ? 'lv-status-aperto' : 'lv-status-chiuso');
		el.hidden = false;
	});

	/* --- Ombra dell'header sullo scroll ----------------------------------- */
	var header = document.querySelector('.lv-header');
	if (header) {
		var aggiornaHeader = function () {
			header.classList.toggle('is-scrolled', window.scrollY > 8);
		};
		aggiornaHeader();
		window.addEventListener('scroll', aggiornaHeader, { passive: true });
	}
})();
