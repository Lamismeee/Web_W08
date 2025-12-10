
# BTTH_Tuan08 — Ứng dụng Web (Express + Handlebars + PostgreSQL)

Phiên bản chi tiết của README này mô tả cách cài đặt, cấu hình và chạy project có sẵn trong thư mục.

## Mô tả dự án
- Ứng dụng mẫu dùng `Express` + `express-handlebars` để hiển thị trang sản phẩm, danh mục và xác thực đơn giản.
- Sử dụng `Knex` + `pg` kết nối tới PostgreSQL để quản lý migrations và seeds.

## Tính năng chính
- Hiển thị danh sách sản phẩm và chi tiết sản phẩm
- Phân trang (pagination) và tìm kiếm cơ bản
- Quản lý phiên người dùng đơn giản với `express-session`
- Migrations và seeding dữ liệu mẫu

## Yêu cầu (Prerequisites)
- Node.js (>=16 khuyến nghị)
- PostgreSQL (hoặc một DB PostgreSQL sẵn có)
- `npm` hoặc `pnpm`/`yarn` để cài package

## Biến môi trường (Environment Variables)
Tạo file `.env` ở gốc dự án (nếu muốn). Các biến sau được sử dụng:
Ví dụ file `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

> Lưu ý: `knexfile.js` đã import `dotenv/config`, nên khi bạn khởi động app hoặc chạy lệnh `npx knex`, các biến trong `.env` sẽ được đọc.

## Cài đặt và chạy nhanh (PowerShell)

Mở PowerShell ở thư mục dự án và chạy:

```powershell
npm install
# Tạo database (nếu cần) -- thực hiện trong PostgreSQL hoặc dùng công cụ GUI
# Chạy migration và seed
npx knex migrate:latest --knexfile knexfile.js
npx knex seed:run --knexfile knexfile.js
# Chạy ứng dụng
npm run dev  # hoặc `npm start` để chạy production
```

Script có sẵn trong `package.json`:

- `npm start` — chạy `node server.js`
- `npm run dev` — chạy `nodemon server.js` (dev)
- `npm run db:migrate` — alias cho `npx knex migrate:latest`
- `npm run db:seed` — alias cho `npx knex seed:run`

## Docker (nếu muốn)
Trong repository có `Dockerfile`. Một cách nhanh để build image và chạy local (ví dụ bạn muốn dùng container):

```powershell
# Build image
docker build -t btth-tuan08:latest .
# Run container (kết nối DB ngoài hoặc qua network)
docker run -p 3000:3000 --env-file .env btth-tuan08:latest
```

## Cấu trúc thư mục chính

- `assets/` : hình ảnh tĩnh (`assets/imgs`)
- `controllers/` : các controller xử lý logic (ví dụ `product.c.js`, `auth.c.js`)
- `models/` : truy vấn DB, wrapper (ví dụ `product.m.js`, `user.m.js`, `db.js`)
- `routers/` : định nghĩa route (ví dụ `product.r.js`, `auth.r.js`)
- `db/migrations/` : file migration (ví dụ `000_init.js`, `001_add_users.js`)
- `db/seeds/` : seed dữ liệu mẫu
- `views/` : template `handlebars` (layouts, partials, views cho product, auth...)
- `server.js` : entrypoint của app
- `knexfile.js` : cấu hình Knex (đọc biến môi trường)

## Các route chính (tóm tắt)

- `/` : trang chủ (products list)
- `/products` : danh sách sản phẩm / phân trang / AJAX
- `/products/:id` : chi tiết sản phẩm
- `/categories` : danh mục sản phẩm
- `/auth/login`, `/auth/register` : xác thực người dùng

Xem chi tiết implement trong thư mục `routers/` và `controllers/`.

## Migrations & Seeds

- Migrations nằm ở `db/migrations/`. Để chạy:

```powershell
npm run db:migrate
```

- Seeds nằm ở `db/seeds/`. Để chạy:

```powershell
npm run db:seed
```

Nếu bạn thay đổi cấu hình DB (ví dụ `.env`), hãy đảm bảo database đã tồn tại và thông tin kết nối chính xác.

