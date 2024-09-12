# Todo List Application

Aplikasi Todo List ini memungkinkan pengguna untuk mengelola tugas-tugas mereka. Aplikasi ini dibangun menggunakan **ReactJS** untuk front-end, **ExpressJS** untuk back-end, dan **Sequelize** sebagai ORM untuk migrasi serta seeding database. Database yang digunakan adalah **PostgreSQL**.

## Panduan Konfigurasi Sistem

Ikuti langkah-langkah berikut untuk mengkonfigurasi dan menjalankan sistem:

### 1. Konfigurasi Database

1. Pastikan PostgreSQL sudah terinstal di komputer Anda.
2. Instalasi dependensi untuk back-end dan front-end:
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
3. Konfigurasi Database:
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
4. Membuat Database:
   - Masuk ke PostgreSQL dan buat database todo_db:
     ```
     psql -U postgres
     CREATE DATABASE todo_db;
     ``` 
6. Edit informasi koneksi database:
   ```javascript
   const pool = new Pool({
     user: 'your_username',
     host: 'localhost',
     database: 'todo_db',
     password: 'your_password',
     port: 5432,
   });
   ```
   Ganti `your_username` dan `your_password` dengan kredensial PostgreSQL Anda.

### 2. Membuat Database dan Menjalankan Migrasi

1. Buka terminal dan masuk ke PostgreSQL:
   ```
   psql -U your_username -d postgres
   ```
2. Buat database baru:
   ```sql
   CREATE DATABASE todo_db;
   ```
3. Hubungkan ke database baru:
   ```
   \c todo_db
   ```
4. Jalankan script migrasi:
   ```
   \i backend/migrations/001_create_tasks_table.sql
   ```

### 3. Menginstal Dependensi

1. Buka terminal di folder `backend`:
   ```
   cd backend
   npm install
   ```
2. Buka terminal baru di folder `frontend`:
   ```
   cd frontend
   npm install
   ```

### 4. Menjalankan Aplikasi

1. Di terminal `backend`, jalankan:
   ```
   node server.js
   ```
2. Di terminal `frontend`, jalankan:
   ```
   npm start
   ```

Aplikasi sekarang berjalan! Backend tersedia di `http://localhost:3001` dan frontend di `http://localhost:3000`.

## Fitur Sistem

Aplikasi Todo List ini memiliki fitur-fitur berikut:

1. **Menambah Tugas**: Masukkan deskripsi tugas dan klik "Add" untuk menambahkan tugas baru.

2. **Menandai Tugas Selesai**: Klik checkbox di sebelah tugas untuk menandainya sebagai selesai.

3. **Mengedit Tugas**: Klik pada deskripsi tugas untuk mengeditnya.

4. **Menghapus Tugas**: Klik tombol "Delete" di sebelah tugas untuk menghapusnya.

5. **Mengatur Ulang Tugas**: Gunakan fitur drag-and-drop untuk mengubah urutan tugas.

6. **Tampilan Responsif**: Antarmuka pengguna yang responsif dan mudah digunakan.

7. **API Documentation**: Dokumentasi API tersedia melalui Swagger UI di `http://localhost:3001/api-docs`.

Selamat menggunakan aplikasi Todo List!
