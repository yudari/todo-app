# Aplikasi Todo List - Yudha Satria

Aplikasi Todo List ini memungkinkan pengguna untuk mengelola tugas-tugas mereka. Aplikasi ini dibangun menggunakan **ReactJS** untuk front-end, **ExpressJS** untuk back-end, dan **Sequelize** sebagai ORM untuk migrasi serta seeding database. Database yang digunakan adalah **PostgreSQL**.

## Panduan Pengguna (User Guide)

### 1. Konfigurasi Sistem

Berikut langkah-langkah sederhana untuk mengonfigurasi sistem aplikasi ini:
1. Pastikan untuk mengclone project ini dengan perintah:
   - Dengan Menggunakan Git :
   ```bash
   git clone https://github.com/yudari/todo-app.git
   cd todo-app
   ```
   - Atau mendownload langsung projectnya pada url https://github.com/yudari/todo-app dan pilih tombol download zip, extract dan buka direktory todo-app, kemudian jalankan perintah:
   ```bash
   cd todo-app
   ```
    setelah masuk kedalam direktori todo-app, anda sudah siap untuk mengikut langkah selanjutnya,
2. Pastikan PostgreSQL sudah terinstal di komputer Anda.
3. Instalasi dependensi untuk back-end dan front-end:
   - Untuk back-end:
      ```
      cd todo-app-backend
      npm install
      ```
   - Untuk front-end:
      ```
      cd todo-app-frontend
      npm install
      ```
4. Konfigurasi Database:
   - File konfigurasi database terletak di:
     ```
     /todo-app-backend/config/config.json
     ```
   - Sesuaikan pengaturan database sesuai dengan lingkungan lokal Anda:
     ```json
      {
        "development": {
          "username": "postgres",
          "password": "password_anda",
          "database": "todo_db",
          "host": "127.0.0.1",
          "dialect": "postgres"
        }
      }
     ```
5. Membuat Database:
   - Masuk ke PostgreSQL dan buat database todo_db:
     ```
     psql -U postgres
     CREATE DATABASE todo_db;
     ```
6. Migrasi Database:
   - Jalankan migrasi untuk membuat tabel di database:
     ```
     cd todo-app-backend
     npx sequelize db:migrate
     ```
7. Menjalankan Aplikasi:
   - Jalankan server back-end:
     ```
     npm run start
     ```
   - Jalankan server front-end:
     ```
     cd ../todo-app-frontend
     npm run dev
     ```
8. Dokumentasi API dengan Swagger:
   - Buka Swagger UI dibrowser dan untuk melihat spesifikasi API dengan url:
     ```
     [http://localhost:5000/api-docs](http://localhost:5000/api-docs/)
     ```

Aplikasi sekarang berjalan! Backend tersedia di `http://localhost:5000` dan frontend di `[http://localhost:3000](http://localhost:3000/)`.

## Fitur Sistem

Aplikasi Todo List ini memiliki fitur-fitur berikut:

1. **Menambah Tugas**: Masukkan deskripsi tugas dan klik "+" untuk menambahkan tugas baru.

2. **Menandai Tugas Selesai**: Klik checkbox di sebelah tugas untuk menandainya sebagai selesai.

3. **Mengedit Tugas**: Klik tombol "pensil" pada deskripsi tugas untuk mengeditnya.

4. **Menghapus Tugas**: Klik tombol "tong sampah / trash" di sebelah tugas untuk menghapusnya.
   
5. **Tampilan Responsif**: Antarmuka pengguna yang responsif dan mudah digunakan.

6. **API Documentation**: Dokumentasi API tersedia melalui Swagger UI di `http://localhost:5000/api-docs`.

Selamat menggunakan aplikasi Todo List!
