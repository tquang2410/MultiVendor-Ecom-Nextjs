# PRD: Khối Sản phẩm Nổi bật (Featured Products)

| ID | Feature | Owner | Status |
| :--- | :--- | :--- | :--- |
| `HOME-01` | Featured Products Section | [Điền tên bạn vào đây] | Grooming |

## 1. Tổng quan (Overview)

Hiển thị một khối "Sản phẩm Nổi bật" trên trang chủ (`/`) để giới thiệu các sản phẩm tốt nhất hoặc mới nhất, nhằm tăng tương tác và doanh số.

Thiết kế dựa trên slide UI-mockup được cung cấp.

## 2. Luồng Kỹ thuật (Technical Flow)

1.  Người dùng truy cập trang chủ.
2.  `page.tsx` (Server Component) render, nó chứa một component con (ví dụ: `FeaturedProducts`) được bọc trong `<Suspense>`.
3.  `Suspense` hiển thị `fallback` (gồm các `Skeleton` card).
4.  Component `FeaturedProducts` (RSC) `await` gọi tRPC procedure `products.getFeatured`.
5.  tRPC procedure gọi Payload Local API (`ctx.db.find`) để lấy 8 sản phẩm.
6.  Khi data về, `FeaturedProducts` render danh sách sản phẩm, thay thế cho `Skeleton`.

## 3. Yêu cầu & Tiêu chí nghiệm thu (Acceptance Criteria - ACs)

### 3.1. Backend (tRPC)

File chịu trách nhiệm: `src/modules/products/server/procedures.ts`

* **AC-1.1:** Phải tạo một tRPC `query` procedure mới tên là `getFeatured` (hoặc `getNewestProducts`) bên trong `productsRouter`.
* **AC-1.2:** Procedure phải sử dụng `ctx.db.find` trên collection `products`.
* **AC-1.3:** Query phải có `limit: 8`.
* **AC-1.4:** Query phải có `sort: '-createdAt'` (sắp xếp mới nhất trước) – *Lưu ý: Chúng ta dùng cái này thay cho "highest-rated" vì collection `Products` chưa có trường `rating`*.
* **AC-1.5:** Query phải có `depth: 1` để populate (lấy) được data của `images`.

### 3.2. Frontend (React Server Component)

File chịu trách nhiệm: `src/app/(app)/(home)/page.tsx` và component con mới.

* **AC-2.1:** Phải tạo một component `async` (RSC) mới, ví dụ: `src/app/(app)/(home)/_components/featured-products.tsx`.
* **AC-2.2:** Component này phải gọi `await trpc.products.getFeatured.query()`.
* **AC-2.3:** Component phải render UI (dùng `Card`) khớp với slide (grid 4 cột, hoặc 1 hàng ngang có thể scroll/dùng carousel).
* **AC-2.4:** Trong `page.tsx`, component `FeaturedProducts` mới phải được bọc trong `<Suspense>`.
* **AC-2.5:** `fallback` của `Suspense` phải là 8 component `Skeleton` có hình dạng giống product card.