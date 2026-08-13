# La Vineria — sito statico

Landing page di **Vineria Viaventi** (Rimini), convertita dal tema WordPress
`lavineria` in HTML statico per essere pubblicata su GitHub Pages.

**Sito online:** https://rinaldi-fabio.github.io/lavineria/

## Cosa contiene

| File | Contenuto |
|---|---|
| `index.html` | la landing completa: hero, il locale, cosa trovi, galleria, orari e contatti |
| `privacy.html` | informativa privacy |
| `assets/css/base.css` | variabili e stili dei blocchi, al posto di quelli che WordPress generava a runtime |
| `assets/css/custom.css` | identico al file del tema: header sticky, schede, dock social, barra CTA mobile |
| `assets/js/nav.js` | apertura e chiusura del menu su mobile |
| `assets/fonts/` | Vollkorn e Manrope (woff2, caricati dal sito, nessuna CDN) |
| `assets/img/` | le 10 foto del locale |

Nessuna dipendenza, nessun build step: sono file che il browser apre così come sono.

## Modificare i contenuti

Testi, orari, numeri di telefono e indirizzo stanno tutti in `index.html`.
Cambia il file, fai commit, e GitHub Pages ripubblica da solo in un minuto.

Colori, spaziature e dimensioni dei caratteri sono variabili CSS in cima a
`assets/css/base.css` (`--wp--preset--color--*`, `--wp--preset--spacing--*`).

## Provarlo in locale

```bash
python -m http.server 4173
```

Poi apri http://localhost:4173.

## Origine

Il progetto WordPress da cui nasce (tema, database, pacchetto di migrazione)
resta in `D:\Repo\LaVineria`. Questa copia serve solo alla pubblicazione su
GitHub Pages e a far vedere il lavoro al cliente.

## Da verificare col cliente

- orari di apertura
- foto originali del locale (queste sono quelle di partenza)
