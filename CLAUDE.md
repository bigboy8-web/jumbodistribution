# Kalkulator Distribusi — Sari Udang Jumbo (PWA STAND-ALONE)

## Apa ini
Aplikasi web **statis** (HTML/CSS/JS murni, tanpa framework, tanpa build step)
berupa kalkulator kelayakan distribusi kerupuk. Dibuat sebagai **PWA stand-alone**
— TIDAK digabung ke web app salesman atau proyek lain apa pun. Tujuan akhir:
online lewat HTTPS supaya bisa di-install ke home screen HP dan jalan offline.

## Struktur file
- `index.html`    — seluruh aplikasi (markup + CSS + JS + Chart.js dari CDN)
- `manifest.json` — identitas PWA (nama, ikon, warna)
- `sw.js`         — service worker (cache-first, bikin bisa offline)
- `logo.png`      — logo brand (dipakai di header)
- `icon-192.png`, `icon-512.png` — ikon aplikasi
- `netlify.toml`  — konfigurasi deploy Netlify

## Catatan teknis
- Tidak ada dependency yang perlu di-install (`npm install` TIDAK diperlukan).
- Chart.js dimuat dari cdnjs; di-cache oleh sw.js setelah load pertama.
- Semua perhitungan jalan di client; tidak ada backend, tidak ada data keluar.

## Tugas yang diinginkan dari Claude Code
1. `git init` + commit awal seluruh folder ini.
2. Preview lokal untuk verifikasi (mis. `python3 -m http.server 8080`), pastikan
   halaman & service worker OK di `http://localhost`.
3. Deploy Netlify:
   - Pasang `netlify-cli` bila belum ada.
   - `netlify deploy --prod` dari root folder ini.
   - MINTA USER login Netlify saat diminta — kredensial akun milik user,
     tidak boleh diasumsikan atau dibuatkan.
4. Setelah live, laporkan URL-nya + ingatkan cara install di HP
   (Android Chrome: menu tiga titik -> Install; iPhone Safari: Share -> Add to Home Screen).

## Aturan penting
- Ini STAND-ALONE. JANGAN mengintegrasikan ke proyek/web app lain.
- Kalau isi kalkulator diubah, NAIKKAN versi cache di `sw.js`
  ('suj-distribusi-v1' -> '-v2', dst.) supaya HP mengambil versi terbaru.
- Jangan menambah framework/bundler; pertahankan sebagai app statis sederhana.
