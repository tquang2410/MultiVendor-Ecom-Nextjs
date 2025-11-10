
-----

# Nền tảng E-commerce Đa nhà cung cấp (Multi-Vendor E-commerce Platform)

Dự án này là nền tảng cốt lõi cho một hệ thống thương mại điện tử đa nhà cung cấp, được xây dựng trên kiến trúc full-stack TypeScript hiện đại. Hệ thống tích hợp Next.js App Router (React 19) với Payload CMS v3 co-located (chung một server) để đạt được hiệu suất tối đa và đảm bảo an toàn kiểu dữ liệu (typesafety) end-to-end.

## 🚀 Tổng quan Kiến trúc

Kiến trúc của dự án này được thiết kế để tối ưu hóa tốc độ phát triển và hiệu suất ứng dụng.

1.  **Monorepo Co-located:** Frontend (Next.js App) và Backend (Payload CMS) được đặt chung trong một ứng dụng Next.js.

    * **Frontend:** Nằm trong `src/app/(app)`.
    * **Backend (CMS):** Nằm trong `src/app/(payload)`.
    * **Lợi ích:** Giảm độ trễ API xuống gần như bằng 0, vì tRPC resolver có thể gọi thẳng vào Local API của Payload mà không cần qua network request.

2.  **API Layer (tRPC):**

    * Chúng ta **không** sử dụng GraphQL hay REST API mặc định của Payload cho frontend.
    * Thay vào đó, một lớp API typesafe được xây dựng bằng **tRPC v11** (`src/trpc/`).
    * Các procedure của tRPC (ví dụ: `getMany` trong `categoriesRouter`) gọi trực tiếp vào `ctx.db.find` (Payload Local API), đảm bảo 100% typesafety từ database schema (`payload-types.ts`) đến React component.

3.  **Data Fetching (RSC & TanStack Query):**

    * Dự án tận dụng React Server Components (RSC) để fetch dữ liệu ban đầu.
    * Trong Server Component (ví dụ: `src/app/(app)/(home)/layout.tsx`), chúng ta dùng `queryClient.prefetchQuery` để nạp trước dữ liệu.
    * Dữ liệu này được truyền cho Client Component thông qua `HydrationBoundary`.
    * Client Component (ví dụ: `SearchFilters`) sử dụng `useSuspenseQuery` của TanStack Query để đọc dữ liệu đã được hydrate mà không gây ra request mới phía client.

4.  **Database Schema (Payload):**

    * **Collections:** `Users`, `Media`, `Categories`.
    * **Categories:** Sử dụng cấu trúc cây (tree structure) với quan hệ tự tham chiếu (`parent`) và `join` (`subcategories`) để populate dữ liệu hiệu quả.

## 🛠 Tech Stack

Danh sách các công nghệ cốt lõi được sử dụng trong dự án.

| Hạng mục | Công nghệ | Phiên bản |
| :--- | :--- | :--- |
| **Framework** | Next.js | v15.2.4 |
| **Library (UI)** | React | v19.0.0 |
| **CMS & DB** | Payload CMS | v3.61.1 |
| | MongoDB (Adapter) | v3.61.1 |
| **API Layer** | tRPC (Client, Server) | v11.0.3 |
| **Data Fetching** | TanStack Query (React Query) | v5.72.1 |
| **Styling** | Tailwind CSS | v4 |
| **UI Components** | shadcn/ui (Radix + Lucide) | - |
| **Forms** | React Hook Form | v7.55.0 |
| **Schema/Validation**| Zod | v3.24.2 |
| **Language** | TypeScript | v5 |
| **Package Manager**| Bun | (Xem `bun.lock`) |

## 🏁 Bắt đầu (Getting Started)

### Yêu cầu

* [Bun](https://bun.sh/) (hoặc Node.js v20+ và npm/yarn)
* MongoDB (Local hoặc Atlas)

### Cài đặt

1.  **Clone repository:**

    ```bash
    git clone <repository-url>
    cd multivendor-ecommerce
    ```

2.  **Cài đặt dependencies:**

    ```bash
    bun install
    ```

3.  **Thiết lập Biến môi trường:**
    Tạo một file `.env` ở thư mục gốc. Tối thiểu, bạn cần cung cấp:

    ```env
    PAYLOAD_SECRET=YOUR_COMPLEX_SECRET_KEY
    DATABASE_URI=mongodb://127.0.0.1:27017/multivendor-ecom
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Chạy Development Server:**

    ```bash
    bun dev
    ```

    * Frontend sẽ chạy tại: `http://localhost:3000`
    * Payload Admin sẽ chạy tại: `http://localhost:3000/admin`

## 📦 Các Scripts quan trọng

Danh sách các lệnh được định nghĩa trong `package.json`:

* `bun dev`: Khởi động server Next.js (bao gồm cả Payload) ở chế độ development.
* `bun build`: Build ứng dụng cho production.
* `bun start`: Chạy server production.
* `bun lint`: Chạy ESLint để kiểm tra lỗi và quy tắc code.
* `bun generate:types`: **(Rất quan trọng)** Tự động tạo file `src/payload-types.ts` từ schema collections của bạn. Luôn chạy lệnh này sau khi thay đổi `src/collections/`.
* `bun db:seed`: Chạy script `src/seed.ts` để nạp dữ liệu mẫu (categories) vào database.

-----

*Tài liệu này được tạo tự động và nên được cập nhật khi có thay đổi lớn về kiến trúc.*