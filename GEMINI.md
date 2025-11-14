## 1. Project Overview

Đây là một dự án học tập đang trong quá trình phát triển, xây dựng một trang web **Thương mại điện tử đa nhà cung cấp (Multi-vendor E-commerce)**.

Mục tiêu chính là học cách tích hợp một framework full-stack (Next.js) với một hệ thống CMS headless (Payload) để xử lý các chức năng phức tạp như sản phẩm, người dùng, giỏ hàng, và đơn hàng từ nhiều nhà bán khác nhau.
Giao diện sẽ luôn có responsive để cả người dùng máy tính và mobile đều dễ dàng sử dụng.
## Agent Instructions & Conventions

This section contains specific instructions for the Gemini CLI agent to follow during development.

1.  **Log All Code Changes:** After every code modification, a summary must be appended to the `## Code Changes Summary` section of this file. The summary should detail:
    *   The feature being worked on (e.g., `### Feature: Authentication`).
    *   The file(s) modified or created.
    *   A brief, clear description of the change.

2.  **Git Commit Message Format:** All commit messages must be:
    *   Written in English.
    *   Concise and direct.
    *   Follow the Conventional Commits style (e.g., `feat: <description>`, `fix: <description>`, `refactor: <description>`).

3.  **Limit Modifications to Working Code:** When updating features, restrict changes to code that is already functioning perfectly. This helps maintain stability and prevents the reintroduction of bugs.
4. Bạn đã có kinh nghiệm làm leader rồi, nên nếu fix bug thì sẽ không lặp đi lặp lại một cách cũ, bạn sẽ luôn thay đổi tư duy để project hoạt động tốt dù cách fix bug khiến mục tiêu của task chưa hoàn hảo như kì vọng ban đầu.
5. Khi thực hiện một tính năng, phải luôn vào folder PRD và đọc file markdown tương ứng. Nếu trong quá trình hoàn thành tính năng mà có chút thay đổi so với mục tiêu ban đầu của file PRD thì hãy update vào file markdown tương ứng đó.
---

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

*   **File Modified:** `src/app/(app)/sign-in/page.tsx`
*   **Change:**
    *   Hoàn thiện flow Đăng nhập (PRD `AUTH-02`).
    *   Thêm `type="email"` vào Input Email (Fix `AC-1.1`).
    *   Thêm `Spinner` vào nút "Log In" khi `isPending` (Fix `AC-3.2`).
    *   Cập nhật `onError` để xử lý lỗi `UNAUTHORIZED` và hiển thị thông báo "Email hoặc mật khẩu không chính xác." (Fix `AC-3.4`).

*   **File Modified:** `src/app/(app)/sign-up/page.tsx`
*   **Change:**
    *   Thêm trường `confirmPassword` vào form.
    *   Sử dụng Zod `.refine()` để validate `password === confirmPassword`.
    *   Thêm `Spinner` vào nút "Create Account" khi `isPending`.
    *   Cập nhật `onError` để xử lý lỗi `CONFLICT` (trùng email/username) và hiển thị thông báo chuẩn hóa.
    *   Thêm `type="email"` vào Input Email.
### Feature: Featured Products (HOME-01)

*   **File Modified:** `src/modules/products/server/procedures.ts`
    *   **Change:** Created a new tRPC query procedure `getNewest` (renamed from `getFeatured` for clarity) to fetch 8 newest products from the `products` collection, sorted by `createdAt` and with `depth: 1` for images. This fulfills AC-1.1 to AC-1.5 of the PRD.
*   **File Modified:** `src/trpc/routers/_app.ts`
    *   **Change:** Confirmed (and re-overwrote) that `productsRouter` is correctly imported and registered in the main `appRouter`, making the new `getNewest` procedure available.
