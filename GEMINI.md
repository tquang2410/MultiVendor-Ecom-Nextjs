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

## 4. Code Changes Summary

### Feature: Authentication (`authentication` branch)

*   **File Modified:** `src/modules/auth/server/procedures.ts`
*   **Change:**
    *   Updated the `createAccount` tRPC procedure.
    *   Replaced `ctx.db.create` with the full Payload client (`await getPayload({ config: configPromise })`). This is to ensure Payload's built-in password hashing and user creation logic is triggered correctly.
    *   Corrected the import for `configPromise` to be a default import (`import configPromise from '@payload-config'`).
    *   Explicitly set `role: 'customer'` when creating a new user.
*   **File Modified:** `src/trpc/routers/_app.ts`
*   **Change:**
    *   Imported `authRouter` from `@/modules/auth/server/procedures`.
    *   Registered the `authRouter` within the main `appRouter`. This exposes the authentication-related endpoints (like `createAccount`) to the client application.

### Feature: Products (`authentication` branch)

*   **File Created:** `src/collections/Products.ts`
*   **Change:**
    *   Defined and exported a new Payload `CollectionConfig` for `products`.
    *   The collection includes fields for `name`, `description`, `price`, `vendor`, `category`, `images`, and `status`.
    *   Configured relationships to the `users`, `categories`, and `media` collections.
*   **File Modified:** `src/payload.config.ts`
*   **Change:**
    *   Imported the new `Products` collection.
    *   Registered it in the `collections` array of the main Payload config, making it available to the CMS and APIs.
*   **File Created:** `src/modules/products/server/procedures.ts`
*   **Change:**
    *   Created a new `productsRouter` for tRPC.
    *   Added a `getMany` query to fetch multiple products from the database using Payload's Local API (`ctx.db.find`).
    *   Set `depth: 1` to populate related fields like `vendor` and `images`.
*   **File Modified:** `src/trpc/routers/_app.ts`
*   **Change:**
    *   Imported the new `productsRouter`.
    *   Registered it within the main `appRouter` to expose the product-related endpoints to the client.