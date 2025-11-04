# Nền tảng Thương mại điện tử Đa nhà cung cấp

Đây là một dự án học tập đang trong quá trình phát triển, xây dựng một trang web **Thương mại điện tử đa nhà cung cấp (Multi-vendor E-commerce)** bằng cách sử dụng Next.js, Payload CMS, và tRPC.

Mục tiêu chính là học cách tích hợp một framework full-stack (Next.js) với một hệ thống CMS headless (Payload) và API typesafe (tRPC) để xử lý các chức năng phức tạp như sản phẩm, người dùng, giỏ hàng, và đơn hàng từ nhiều nhà bán khác nhau.

## 2. Techstack

Dự án này sử dụng một bộ công nghệ hiện đại dựa trên TypeScript:

### ⚙️ Framework & Core
* **Next.js:** v15 (Framework React full-stack)
* **React:** v19 (Thư viện UI)
* **TypeScript:** v5 (Ngôn ngữ)

### 🗃️ Backend & CMS
* **Payload CMS:** v3 (Headless CMS)
* **Database:** MongoDB (Sử dụng qua `@payloadcms/db-mongodb`)

### 📡 API & Data Fetching
* **tRPC:** v11 (Để xây dựng và sử dụng API typesafe)
* **TanStack Query:** v5 (Quản lý state của server, caching, data fetching)
* **GraphQL:** Dùng để truy vấn dữ liệu từ Payload.

### 🎨 Styling & UI
* **Tailwind CSS:** v4 (Utility-first CSS framework)
* **shadcn/ui:** (Sử dụng ngầm, dựa trên sự kết hợp của `radix-ui`, `lucide-react`, `clsx`, và `tailwind-merge`)
* **next-themes:** Quản lý Dark/Light mode.
* **sonner:** Thư viện thông báo (toast).

### 📝 Forms & Validation
* **React Hook Form:** v7 (Quản lý trạng thái form)
* **Zod:** v3 (Xác thực (validate) schema và kiểu dữ liệu)

### 🔧 Linting & Tooling
* **ESLint:** v9 (Bộ linting tiêu chuẩn của Next.js)
* **Type Generation:** Sử dụng `payload generate:types` để đồng bộ kiểu dữ liệu từ CMS.

## Cấu trúc thư mục

Dưới đây là mô tả về các thư mục chính trong dự án:

- **`src/app`**: Thư mục chính của Next.js App Router.
  - **`(app)`**: Nhóm route cho giao diện người dùng chính.
    - **`(home)`**: Chứa các trang public (trang chủ, giới thiệu, liên hệ,...).
    - **`api/trpc/[trpc]`**: Endpoint cho tRPC API.
  - **`(payload)`**: Nhóm route cho Payload CMS, chứa trang admin và các API liên quan.
- **`src/collections`**: Định nghĩa các "collection" của Payload CMS (tương tự như model hoặc schema cho database). Ví dụ: `Users`, `Products`, `Categories`.
- **`src/components`**: Chứa các component React có thể tái sử dụng.
  - **`ui`**: Các component được tạo bởi `shadcn/ui`.
- **`src/hooks`**: Chứa các React hook tùy chỉnh.
- **`src/lib`**: Chứa các hàm tiện ích chung.
- **`src/modules`**: Phân chia logic nghiệp vụ thành các module nhỏ. Ví dụ, logic liên quan đến "category" được đặt trong `src/modules/category`.
- **`src/trpc`**: Cấu hình và khởi tạo tRPC, bao gồm client, server, và router chính.
- **`public`**: Chứa các tài sản tĩnh như hình ảnh, font chữ.

## Bắt đầu

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau:

1.  **Clone a repository:**
    ```bash
    git clone <repository-url>
    cd multivendor-ecommerce
    ```

2.  **Cài đặt dependencies:**
    (Dự án này sử dụng `bun`, nhưng bạn cũng có thể dùng `npm` hoặc `yarn`)
    ```bash
    bun install
    ```

3.  **Thiết lập biến môi trường:**
    Tạo một file `.env` ở gốc dự án và cấu hình các biến cần thiết, ví dụ như chuỗi kết nối MongoDB và secret của Payload.

4.  **Chạy development server:**
    ```bash
    bun dev
    ```
    Mở [http://localhost:3000](http://localhost:3000) để xem trang web.

## Các script có sẵn

- `bun dev`: Chạy server development.
- `bun build`: Build ứng dụng cho production.
- `bun start`: Chạy server production sau khi build.
- `bun lint`: Chạy ESLint để kiểm tra lỗi code.
- `bun generate:types`: Tạo file type definition từ schema của Payload.
- `bun db:fresh`: Xóa và tạo lại database (cẩn thận khi sử dụng).
- `bun db:seed`: Chạy script để thêm dữ liệu mẫu vào database.