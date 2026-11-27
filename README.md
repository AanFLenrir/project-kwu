# KAIROS — Right Priority. Right Moment.

### Platform Manajemen Prioritas, Informasi, dan Portofolio Karier Mahasiswa IT

KAIROS (berasal dari bahasa Yunani: *Kairos*, yang berarti "saat yang tepat") merupakan platform manajemen terpusat yang dirancang untuk membantu mahasiswa Teknologi Informasi dalam mengelola prioritas akademik, memperoleh informasi, memantau perkembangan pembelajaran, serta membangun portofolio profesional.

KAIROS dikembangkan sebagai **Desktop-First Responsive Website** menggunakan Next.js dengan mengadaptasi sistem desain dan 38 layar dari prototype Google Stitch.

---

## Identitas Pengguna Demo

| Informasi | Keterangan |
|---|---|
| Nama | Anhaz |
| NIM | 5220321001 |
| Program Studi | D4 Teknik Informatika |
| Universitas | Universitas Airlangga |
| Semester | 5 |
| Kelompok | 11 |

---

## Tiga Pilar Utama

### 1. Smart Priority Dashboard

Membantu mahasiswa menentukan prioritas pekerjaan melalui rekomendasi tugas harian berdasarkan:

- Bobot nilai tugas.
- Estimasi durasi pengerjaan.
- Tingkat urgensi.
- Kedekatan tenggat waktu.
- Status penyelesaian tugas.

### 2. Centralized Information Hub

Memusatkan berbagai informasi akademik dan peluang pengembangan karier dalam satu platform, meliputi:

- Pengumuman akademik.
- Jadwal praktikum.
- Informasi beasiswa.
- Lomba dan kompetisi.
- Peluang magang.
- Informasi sertifikasi.

### 3. Automated Progress Tracker & Portfolio Builder

Membantu mahasiswa memantau perkembangan pembelajaran dan menyusun portofolio profesional melalui:

- Pemantauan progres kursus.
- Pengelolaan sertifikat.
- Dokumentasi pencapaian.
- Pengelolaan keahlian.
- Penyusunan portofolio.
- Pratinjau portofolio profesional.

### 4. Fitur Model Bisnis, Paket Langganan & Simulator Keuangan (BEP)

Implementasi langsung dari riset validasi bisnis dan analisis titik impas (**Halaman 12 Laporan UTS Kewirausahaan Bidang TI - Gambar 6 & Tabel 17**):

- **Paket Langganan Mahasiswa (B2C) Berbagai Durasi Bulan**:
  * **Paket Gratis (Freemium)**: Rp0 (pintu adopsi awal mahasiswa).
  * **Paket Pro 1 Bulan**: Rp20.000 / bulan.
  * **Paket Pro 3 Bulan**: Rp54.000 / 3 bulan (Rp18.000/bln, Hemat 10% - persiapan UTS/UAS).
  * **Paket Semester Aktif (6 Bulan)**: Rp99.000 / semester (Rp16.500/bln, Hemat 18% - Rekomendasi Mahasiswa).
  * **Paket Pro Tahunan (12 Bulan)**: Rp180.000 / tahun (Rp15.000/bln, Hemat 25%).
- **Lisensi Kampus Institusi & Kemitraan (B2B2C - Model Bisnis Terpilih)**:
  * **Lisensi Program Studi (D4/S1 TI)**: Rp5.000.000 / tahun (kuota hingga 500 mahasiswa, setara Rp10.000/akun/tahun).
  * **Lisensi Fakultas Vokasi/Teknik**: Rp12.000.000 / tahun (hingga 1.500 akun mahasiswa).
  * **Kemitraan Perusahaan & HRD (Talent Pool Access)**: Rp15.000.000 / tahun.
- **Simulator Interaktif Titik Impas (Break-Even Point)**:
  * Slider dinamis jumlah kampus (1 s.d. 30 kampus) dan mahasiswa langganan (50 s.d. 600 akun).
  * Perhitungan instan: Pendapatan Total vs Biaya Tetap (Rp60 Juta) vs Biaya Variabel, Margin Kontribusi, dan Laba Bersih terhadap titik impas (BEP 15 Kampus = Rp75 Juta).
  * Perbandingan komparatif alasan B2B2C dipilih dibanding B2C.
- **Checkout Interaktif & Riwayat Tagihan**:
  * Simulasi pembayaran via QRIS, Virtual Account BCA/Mandiri/BRI, dan kartu debit/kredit online.
  * Penyimpanan riwayat faktur (*invoice history*) di LocalStorage.

---

## Teknologi yang Digunakan

| Teknologi | Keterangan |
|---|---|
| Next.js 16 | Framework dengan App Router |
| React 19 | Library antarmuka pengguna |
| TypeScript | Bahasa pemrograman |
| Tailwind CSS v4 | Styling dan desain responsif |
| Lucide React | Ikon antarmuka |
| React Context API | Pengelolaan state |
| Browser LocalStorage | Persistensi data lokal |
| pnpm | Package manager |

---

## Struktur Routing dan 38 Layar

| No. | Nama Layar | Route |
|---|---|---|
| 01 | Splash Screen | `/splash` |
| 02 | Welcome Onboarding | `/onboarding` |
| 03 | Feature Introduction | `/onboarding` |
| 04 | Goal Selection | `/onboarding/goals` |
| 05 | Login | `/login` |
| 06 | Register | `/register` |
| 07 | Forgot Password | `/forgot-password` |
| 08 | Home Dashboard | `/dashboard` |
| 09 | Smart Priority | `/priority` |
| 10 | Task Detail | `/tasks/[id]` |
| 11 | Add Task | `/tasks/new` |
| 12 | Edit Task | `/tasks/[id]/edit` |
| 13 | Calendar | `/calendar` |
| 14 | Event Detail | `/events/[id]` |
| 15 | Information Hub | `/information` |
| 16 | Information Detail | `/information/[id]` |
| 17 | Search Information | `/information/search` |
| 18 | Category Filter | `/information/category` |
| 19 | Career Opportunities | `/career` |
| 20 | Career Detail | `/career/[id]` |
| 21 | Progress Tracker | `/progress` |
| 22 | Course Progress | `/courses` |
| 23 | Course Detail | `/courses/[id]` |
| 24 | Certificate List | `/certificates` |
| 25 | Certificate Detail | `/certificates/[id]` |
| 26 | Portfolio Builder | `/portfolio` |
| 27 | Portfolio Preview | `/portfolio/preview` |
| 28 | Profile | `/profile` |
| 29 | Edit Profile | `/profile/edit` |
| 30 | Account Settings | `/settings` |
| 31 | Notification Settings | `/settings/notifications` |
| 32 | Privacy Settings | `/settings/privacy` |
| 33 | Help Center | `/help` |
| 34 | About KAIROS | `/about` |
| 35 | Notification Center | `/notifications` |
| 36 | Add Certificate | `/certificates/new` |
| 37 | Task Completion Confirmation | `/tasks/[id]` |
| 38 | Logout Confirmation | `/logout` |
| +  | Paket Langganan & Model Bisnis Keuangan (BEP) | `/pricing` |

**Catatan:** Layar konfirmasi penyelesaian tugas menggunakan dialog pada halaman detail tugas. Implementasinya mengikuti struktur route yang tersedia.

---

## Struktur Navigasi

KAIROS memiliki lima navigasi utama:

1. Beranda
2. Prioritas
3. Informasi
4. Progres
5. Profil

Pada tampilan desktop, navigasi disesuaikan dengan layout sidebar. Pada perangkat mobile, navigasi menyesuaikan ukuran layar.

---

## Design System

KAIROS menggunakan identitas visual Midnight Navy dan Indigo dengan aksen Champagne Gold.

| Nama Warna | Hexadecimal |
|---|---|
| Midnight Navy | `#171747` |
| Deep Navy | `#211B70` |
| Royal Indigo | `#302A91` |
| Soft Indigo | `#EAE9FA` |
| Champagne Gold | `#D9B65D` |
| Warm Gold | `#E8C76A` |
| White | `#FFFFFF` |
| Light Background | `#F7F7FC` |

**Tipografi:**

- Plus Jakarta Sans
- Inter
- Spline Sans Mono

---

## Cara Menjalankan Secara Lokal

### 1. Clone Repository

```bash
git clone URL_REPOSITORY_KAMU
```

### 2. Masuk ke Direktori Proyek

```bash
cd project-kwu
```

Sesuaikan nama direktori dengan nama repository yang digunakan.

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Jalankan Development Server

```bash
pnpm dev
```

### 5. Buka Website

Akses melalui browser:

```text
http://localhost:3000
```

---

## Persyaratan Sistem

Sebelum menjalankan proyek, pastikan perangkat telah memiliki:

- Node.js yang kompatibel dengan Next.js 16.
- pnpm.
- Git.
- Browser modern.
- Koneksi internet untuk instalasi dependencies.

---

## Informasi Implementasi

- KAIROS dikembangkan sebagai website responsif dengan pendekatan Desktop-First.
- Data demonstrasi dikelola menggunakan React Context API dan LocalStorage.
- Data yang tersimpan di LocalStorage bersifat lokal pada browser pengguna.
- Informasi dan aktivitas demonstrasi menggunakan data simulasi.
- Integrasi layanan eksternal tidak diklaim aktif apabila belum diimplementasikan.

---

## Prototype dan Referensi Desain

**Google Stitch — KAIROS Prototype**

https://stitch.google.com/preview/10384689805061886963?node-id=11068581708632939376&raw=1

---

## Pengembang

**KAIROS — Kelompok 11**

Program Studi D4 Teknik Informatika  
Fakultas Vokasi  
Universitas Airlangga

---

*Right Priority. Right Moment.*

gimana