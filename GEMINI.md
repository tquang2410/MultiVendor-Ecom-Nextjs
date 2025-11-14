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

## 5. Code Rollback and Cleanup

*   **Action:** Performed a `git reset --hard HEAD` to revert the working directory to the last stable commit (`88283c6`).
*   **Reason:** To resolve a series of cascading build errors that arose from dependency conflicts and incomplete tRPC refactoring.
*   **Impact:** All uncommitted work was discarded. This includes the implementation of the `logIn` procedure, the UI for the sign-in and sign-up forms, and all subsequent tRPC refactoring attempts. The project's dependencies were also reverted to their last committed state.

---

### Feature: Sign-In Page (`authentication` branch)

*   **File Modified:** `src/app/(app)/sign-in/page.tsx`
*   **Change:** Simplified the layout to a single, centered card form, removing the two-column design. This provides a more focused UI for logging in. The form logic remains a simple `console.log` for testing.

### Feature: Sign-Up Page (`authentication` branch)

*   **File Modified:** `src/app/(app)/sign-up/page.tsx`
*   **Change:** Implemented a new two-column layout for the sign-up page. The left column contains the centered form card, and the right column (visible on medium screens and up) displays a decorative area with skeleton placeholders. The skeletons were updated to use `bg-background` and `border` classes for better theme adaptability.

### Feature: tRPC and Sign-Up Logic (`authentication` branch)

*   **File Modified:** `src/trpc/init.ts`
    *   **Change:** Simplified the `baseProcedure` middleware to its most basic form (`t.procedure`). The previous middleware was redundant and potentially inefficient, calling `getPayload` a second time.
*   **File Modified:** `src/trpc/client.tsx`
    *   **Change:** Reverted the tRPC client setup to use `createTRPCContext` for `TRPCProvider` and `useTRPC`, and `createTRPCClient` for the client instance. This was a user-requested change to revert to a previous working state.
*   **File Created:** `src/trpc/react.tsx`
    *   **Change:** Re-created this file after it was deleted, to export the `trpc` object using `createTRPCReact`. This was part of restoring the preferred tRPC client setup.
*   **File Modified:** `src/trpc/query-client.ts`
    *   **Change:** Configured `superjson` for `dehydrate` and `hydrate` options in the `QueryClient`. This ensures proper serialization/deserialization for TanStack Query's caching mechanism.

### Feature: Authentication (`sign-up` and `sign-in` pages, continued)

*   **File Modified:** `src/modules/auth/server/procedures.ts`
    *   **Change:** Added a `session` query procedure to the `authRouter` to check user login status.
    *   **Change:** Refined error handling in the `createAccount` mutation to specifically detect Payload `ValidationError` for duplicate fields (checking `error.message.includes('The following field is invalid')`) and throw a `TRPCError` with `CONFLICT` code.
*   **File Modified:** `src/app/(app)/sign-up/page.tsx`
    *   **Change:** Updated tRPC import and usage to align with the restored `trpc` object from `@/trpc/react`.
    *   **Change:** Modified the `onError` handler to provide more specific toast messages based on tRPC error codes (`CONFLICT`, `BAD_REQUEST`, or generic fallback).
    *   **Change:** Removed all `console.log` statements from the frontend component for cleaner user experience.
*   **File Modified:** `src/app/(app)/sign-in/page.tsx`
    *   **Change:** Updated tRPC import and usage to align with the restored `trpc` object from `@/trpc/react`.
*   **File Modified:** `src/app/(app)/(home)/page.tsx`
    *   **Change:** Updated tRPC import and usage to align with the restored `trpc` object from `@/trpc/react`.
    *   **Change:** Modified to use `trpc.auth.session.useQuery()` to fetch and display user session data.

### Feature: Categories Display

*   **File Modified:** `src/app/(app)/(home)/search-filters/index.tsx`
    *   **Change:** Updated tRPC import and usage to align with the restored `trpc` object from `@/trpc/react`.
    *   **Change:** Corrected the destructuring of `useSuspenseQuery` from `const { data } = ...` to `const data = ...` as `useSuspenseQuery` returns the data directly.
*   **File Modified:** `src/app/(app)/(home)/search-filters/categories-sidebar.tsx`
    *   **Change:** Updated tRPC import and usage to align with the restored `trpc` object from `@/trpc/react`.

### Feature: UI/UX Enhancements

*   **File Modified:** `src/app/(app)/layout.tsx`
    *   **Change:** Added the `<Toaster richColors />` component from `sonner` to the root layout to enable visual toast notifications.

### Dependency Management

*   **Action:** Installed `sonner` using `npm i sonner --legacy-peer-deps` to resolve peer dependency conflicts with `date-fns` and `react-day-picker`.
*   **Action:** Reinstalled `@trpc/react-query` using `npm i @trpc/react-query --legacy-peer-deps` after it was inadvertently removed during previous `npm` operations.

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
