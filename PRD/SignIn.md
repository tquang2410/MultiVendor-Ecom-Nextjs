# PRD: Tính năng Đăng nhập (Sign In)

| ID | Feature | Owner | Status |
| :--- | :--- | :--- | :--- |
| `AUTH-02` | Sign In (Authentication) | [Điền tên bạn vào đây] | Ready for Dev |

## 1. Tổng quan (Overview)

Cho phép người dùng đã có tài khoản (với role: "customer") đăng nhập vào hệ thống để truy cập các tính năng cá nhân (ví dụ: giỏ hàng, lịch sử đơn hàng, và sau này là trang quản lý của người bán).

## 2. Luồng người dùng (User Flow)

1.  Người dùng (chưa đăng nhập) truy cập vào trang `/sign-in`.
2.  Người dùng nhập **Email** và **Password** vào form.
3.  Người dùng nhấn nút "Đăng nhập".
4.  Hệ thống xác thực thông tin.
    * **Luồng Thành công (Success):** Nếu thông tin chính xác, người dùng được chuyển hướng về trang chủ (`/`) và Navbar cập nhật trạng thái "đã đăng nhập".
    * **Luồng Thất bại (Error):** Nếu thông tin sai, hệ thống hiển thị một thông báo lỗi (toast) và giữ người dùng ở lại trang `/sign-in` để thử lại.

## 3. Yêu cầu & Tiêu chí nghiệm thu (Acceptance Criteria - ACs)

Đây là các tiêu chí bắt buộc phải hoàn thành để tính năng được coi là "Done".

### 3.1. UI & Form

File chịu trách nhiệm: `src/app/(app)/sign-in/page.tsx`

* **AC-1.1:** Form phải có 2 trường (inputs) rõ ràng:
    * `Email` (với `type="email"`)
    * `Password` (với `type="password"`)
* **AC-1.2:** Phải có 1 nút "Đăng nhập" (với `type="submit"`).
* **AC-1.3:** Phải có 1 đường link điều hướng đến trang Đăng ký (`/sign-up`) với nội dung tương tự: "Chưa có tài khoản? Đăng ký ngay".

### 3.2. Validation (Client-side)

Sử dụng `zod` và `react-hook-form`.

* **AC-2.1 (Email):**
    * Bắt buộc (`Required`).
    * Phải có định dạng email hợp lệ (ví dụ: `name@domain.com`).
* **AC-2.2 (Password):**
    * Bắt buộc (`Required`).

### 3.3. API & Xử lý trạng thái (State Handling)

* **AC-3.1 (API Call):** Khi form hợp lệ và được submit, client phải gọi tRPC mutation `trpc.auth.logIn.useMutation`.
* **AC-3.2 (Loading State):** Trong khi mutation đang chạy (`isPending`):
    * Nút "Đăng nhập" phải bị vô hiệu hóa (`disabled`).
    * Nút "Đăng nhập" phải hiển thị một icon spinner (loading) bên trong.
* **AC-3.3 (Success State):** Khi mutation thành công (`onSuccess`):
    * Hiển thị thông báo (toast) thành công: "Đăng nhập thành công!"
    * Tự động chuyển hướng (redirect) người dùng về trang chủ (`/`).
* **AC-3.4 (Error State):** Khi mutation thất bại (`onError`), (ví dụ: tRPC trả về lỗi `UNAUTHORIZED`):
    * Hiển thị thông báo (toast) lỗi bằng `sonner`: "Email hoặc mật khẩu không chính xác."
    * Nút "Đăng nhập" phải được kích hoạt lại (enabled = true) để người dùng thử lại.

## 4. Ghi chú Kỹ thuật (Technical Notes)

* **Backend (tRPC):** Đã có sẵn procedure `logIn` trong `src/modules/auth/server/procedures.ts`.
* **Frontend (Form):** Sử dụng `react-hook-form` kết hợp với `@hookform/resolvers/zod` để validate.
* **UI Components:** Tận dụng các component đã có từ `shadcn/ui`:
    * `src/components/ui/input.tsx`
    * `src/components/ui/button.tsx`
    * `src/components/ui/label.tsx`
* **Notifications:** Sử dụng `sonner` (đã setup trong `src/components/ui/sonner.tsx`) để hiển thị toast.