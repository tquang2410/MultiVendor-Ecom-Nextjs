## 1. Project Overview

Đây là một dự án học tập đang trong quá trình phát triển, xây dựng một trang web **Thương mại điện tử đa nhà cung cấp (Multi-vendor E-commerce)**.

Mục tiêu chính là học cách tích hợp một framework full-stack (Next.js) với một hệ thống CMS headless (Payload) để xử lý các chức năng phức tạp như sản phẩm, người dùng, giỏ hàng, và đơn hàng từ nhiều nhà bán khác nhau.

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

## 3. Coding style & Conventions

Vì đây là một dự án học tập, ưu tiên hàng đầu là tuân theo phong cách code và cấu trúc dự án của giảng viên trong khoá học.

Ngoài ra, các quy ước chung bao gồm:

1.  **Tuân thủ ESLint:** Sử dụng bộ quy tắc mặc định của `eslint-config-next` để đảm bảo code nhất quán.
2.  **ES Modules:** Luôn sử dụng cú pháp `import`/`export` (`"type": "module"` đã được thiết lập).
3.  **Ưu tiên `const`:** Sử dụng `const` thay cho `let` trừ khi biến đó cần được gán lại.
4.  **Quy ước đặt tên file:**
    * Components React: `PascalCase.tsx` (ví dụ: `ProductCard.tsx`)
    * Các file khác (utilities, server actions, config): `kebab-case.ts` (ví dụ: `get-user.ts`)
5.  **Imports:** Sắp xếp import theo thứ tự: thư viện bên ngoài (external), import nội bộ (internal/absolute), import tương đối (relative).
