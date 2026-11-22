# KAIROS Quality Assurance & Testing Report

## Ringkasan Pengujian
Pengujian menyeluruh telah dilakukan mencakup validasi tipe data TypeScript, persistensi LocalStorage, kelengkapan rute 38 layar, dan adaptabilitas Desktop-First / Mobile Responsive.

---

## 1. Verifikasi Skenario Utama

| Skenario | Langkah Pengujian | Hasil | Keterangan |
|---|---|---|---|
| **Skenario 1** | Splash (`/splash`) → Onboarding (`/onboarding`) → Goals (`/onboarding/goals`) → Login (`/login`) → Dashboard (`/dashboard`) | **PASS** | Transisi mulus, form login terisi kredensial demo default, redirect bekerja normal |
| **Skenario 2** | Dashboard → Smart Priority (`/priority`) → Task Detail (`/tasks/task-1`) → Edit Task → Selesaikan Tugas | **PASS** | State status tugas berubah menjadi `completed`, indikator progres & kartu prioritas otomatis terupdate |
| **Skenario 3** | Dashboard → Calendar (`/calendar`) → Pilih tanggal agenda → Event Detail (`/events/event-1`) | **PASS** | Filter event harian merespons klik tanggal kalender |
| **Skenario 4** | Dashboard → Information Hub (`/information`) → Search (`/information/search`) → Info Detail | **PASS** | Query pencarian teks & tag responsif seketika |
| **Skenario 5** | Information Hub → Career Opportunities (`/career`) → Career Detail (`/career/career-1`) → Lamar | **PASS** | Tombol lamar memberikan umpan balik status "Lamaran Terkirim" |
| **Skenario 6** | Dashboard → Progress Tracker (`/progress`) → Courses (`/courses`) → Course Detail | **PASS** | Slider persentase progres kursus tersimpan ke state |
| **Skenario 7** | Progress Tracker → Certificate List (`/certificates`) → Add Certificate (`/certificates/new`) | **PASS** | Sertifikat baru berhasil tersimpan dan langsung muncul di galeri serta portofolio |
| **Skenario 8** | Progress Tracker → Portfolio Builder (`/portfolio`) → Preview (`/portfolio/preview`) | **PASS** | Bio, skills, dan karya tampil dalam dokumen terverifikasi siap cetak |
| **Skenario 9** | Dashboard → Profile (`/profile`) → Edit Profile (`/profile/edit`) → Settings (`/settings`) | **PASS** | Perubahan nama/kontak mahasiswa tersimpan di LocalStorage |
| **Skenario 10** | Profile → Notifikasi (`/notifications`) → Bantuan (`/help`) → Tentang (`/about`) → Logout (`/logout`) | **PASS** | Dialog konfirmasi keluar berfungsi dan dapat kembali ke halaman login |

---

## 2. Pengujian Tampilan Responsif (Breakpoints)

- **Desktop (1440 × 900 px & 1366 × 768 px)**:
  - Sidebar di sisi kiri persisten (lebar 256px), warna gradien Midnight Navy.
  - Area konten luas, memanfaatkan tata letak grid multi-kolom yang seimbang tanpa elemen meregang berlebihan.
  - Tampilan card proporsional dan nyaman untuk workstation desktop/laptop.

- **Tablet (768 × 1024 px)**:
  - Tata letak beralih ke grid 2 kolom rapi.
  - Tidak ada teks yang terpotong atau tumpang tindih.

- **Mobile (390 × 844 px)**:
  - Sidebar otomatis disembunyikan.
  - Bottom navigation 5 tab (Beranda, Prioritas, Informasi, Progres, Profil) aktif di sisi bawah layar dengan padding area aman (`pb-safe`).
  - Tidak ada *horizontal overflow* (scroll horizontal tidak disengaja).

---

## 3. Persistensi Data Lokal (LocalStorage)
- Kunci penyimpanan: `kairos-app-data`.
- Akses terlindungi di dalam `useEffect` dan client component untuk mencegah *hydration mismatch* pada Next.js App Router.
- Saat pertama kali dibuka tanpa data lokal, dataset default mahasiswa (Anhaz, D4 Teknik Informatika, UNAIR semester 5) otomatis disematkan sebagai *fallback data*.
