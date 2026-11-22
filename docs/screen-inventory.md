# KAIROS Screen Inventory (38 Layar Lengkap)

Dokumen ini mendata seluruh 38 layar aplikasi KAIROS hasil rekonstruksi lengkap:

| No | Kategori | Nama Layar | File / Route | Komponen Utama |
|---|---|---|---|---|
| 01 | Onboarding & Auth | Splash Screen | `app/splash/page.tsx` | Logo KAIROS, tagline, animasi pulse loading |
| 02 | Onboarding & Auth | Welcome Onboarding | `app/onboarding/page.tsx` | Slide carousel sambutan, tombol lewati, pagination |
| 03 | Onboarding & Auth | Feature Introduction | `app/onboarding/page.tsx` | Slide 3 pilar: Smart Priority, Hub, Portfolio |
| 04 | Onboarding & Auth | Goal Selection | `app/onboarding/goals/page.tsx` | Multi-select kartu target akademik & karier |
| 05 | Onboarding & Auth | Login | `app/login/page.tsx` | Form email, password toggle, validasi, submit |
| 06 | Onboarding & Auth | Register | `app/register/page.tsx` | Input Nama, NIM, Prodi, Semester, Password |
| 07 | Onboarding & Auth | Forgot Password | `app/forgot-password/page.tsx` | Input email reset, status sukses terkirim |
| 08 | Core Dashboard | Home Dashboard | `app/dashboard/page.tsx` | Hero greeting, mini stats, priority tasks, active courses |
| 09 | Smart Priority | Smart Priority List | `app/priority/page.tsx` | Search, filter (Semua, Belum, Proses, Selesai), sorting |
| 10 | Smart Priority | Task Detail | `app/tasks/[id]/page.tsx` | Info bobot nilai, estimasi jam, checklist selesai, hapus |
| 11 | Smart Priority | Add Task | `app/tasks/new/page.tsx` | Input judul, mata kuliah, deadline, bobot, tags |
| 12 | Smart Priority | Edit Task | `app/tasks/[id]/edit/page.tsx` | Form edit lengkap nilai tugas yang sudah ada |
| 13 | Kalender & Agenda | Calendar | `app/calendar/page.tsx` | Kalender bulanan, penanda tanggal, filter tipe event |
| 14 | Kalender & Agenda | Event Detail | `app/events/[id]/page.tsx` | Detail jam, lokasi, tipe agenda (Kuliah/Ujian/Deadline) |
| 15 | Centralized Hub | Information Hub | `app/information/page.tsx` | Search bar, kategori filter, list info terkurasi, bookmark |
| 16 | Centralized Hub | Information Detail | `app/information/[id]/page.tsx` | Isi pengumuman lengkap, sumber, tanggal, link eksternal |
| 17 | Centralized Hub | Search Information | `app/information/search/page.tsx` | Fitur pencarian kata kunci mendalam dan tag populer |
| 18 | Centralized Hub | Category Filter | `app/information/category/page.tsx` | Filter per rumpun (Akademik, Beasiswa, Magang, Lomba) |
| 19 | Career Hub | Career Opportunities | `app/career/page.tsx` | Filter magang/full-time, badge remote, estimasi gaji |
| 20 | Career Hub | Career Detail | `app/career/[id]/page.tsx` | Persyaratan kualifikasi posisi, benefit, tombol apply |
| 21 | Progress Tracker | Progress Tracker | `app/progress` | Rata-rata kemajuan belajar, ringkasan sertifikat |
| 22 | Progress Tracker | Course Progress | `app/courses/page.tsx` | Daftar kursus aktif, progress bar, modul selesai |
| 23 | Progress Tracker | Course Detail | `app/courses/[id]/page.tsx` | Slider pembaruan persentase belajar, silabus modul |
| 24 | Progress Tracker | Certificate List | `app/certificates/page.tsx` | Galeri sertifikat kompetensi terverifikasi |
| 25 | Progress Tracker | Certificate Detail | `app/certificates/[id]/page.tsx` | ID kredensial, verifikasi tautan, daftar skill terkait |
| 26 | Portfolio Builder | Portfolio Builder | `app/portfolio/page.tsx` | Form bio, editor keahlian teknis, form tambah proyek |
| 27 | Portfolio Builder | Portfolio Preview | `app/portfolio/preview/page.tsx` | Tampilan publik portofolio terformat, siap print/PDF |
| 28 | User & Account | Profile | `app/profile/page.tsx` | Data diri mahasiswa, IPK, navigasi menu setelan |
| 29 | User & Account | Edit Profile | `app/profile/edit/page.tsx` | Pengubahan nama lengkap, NIM, prodi, kontak WhatsApp |
| 30 | User & Account | Account Settings | `app/settings/page.tsx` | Form ganti password, bahasa sistem, integrasi kalender |
| 31 | User & Account | Notification Settings | `app/settings/notifications/page.tsx` | Sakelar alert H-1/H-3 deadline, info baru, evaluasi |
| 32 | User & Account | Privacy Settings | `app/settings/privacy/page.tsx` | Visibilitas publik portofolio, download backup JSON |
| 33 | User & Account | Help Center | `app/help/page.tsx` | FAQ interaktif accordion dan email dukungan |
| 34 | User & Account | About KAIROS | `app/about/page.tsx` | Profil produk, 3 pilar, tim Kelompok 11 D4 TI UNAIR |
| 35 | Utility & Alerts | Notification Center | `app/notifications/page.tsx` | Alert belum dibaca, tombol tandai semua dibaca |
| 36 | Utility & Alerts | Add Certificate | `app/certificates/new/page.tsx` | Form input sertifikasi baru lengkap dengan kategori & skill |
| 37 | Confirmation | Task Complete Confirmation | `app/tasks/[id]` | Dialog modal interaktif konfirmasi penyelesaian tugas |
| 38 | Confirmation | Logout Confirmation | `app/logout/page.tsx` | Konfirmasi keluar dengan opsi tetap di halaman |
