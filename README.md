# YouTube Auto Continue - Edge Extension

Extension tự động bấm nút **"Có / Tiếp tục xem"** (*Yes / Continue watching*) khi YouTube hiển thị thông báo tạm dừng video do không có tương tác trong một khoảng thời gian dài.

Nhờ đó, video có thể tiếp tục phát mà không cần thao tác thủ công.

## 🚀 Hướng dẫn cài đặt trên Microsoft Edge

### 1. Mở trang quản lý Extension

Mở Microsoft Edge và truy cập:

```text
edge://extensions
```

### 2. Bật Developer mode

* Tìm **Developer mode (Chế độ dành cho nhà phát triển)**.
* Bật công tắc sang **ON**.

### 3. Tải Extension

* Nhấn **Load unpacked (Tải phần mở rộng đã giải nén)**.
* Chọn thư mục project:

```text
C:\Users\Hung\OneDrive\Desktop\auto_continue_ytb
```

* Nhấn **Select Folder**.

> Nếu bạn clone project từ GitHub sang một thư mục khác, hãy chọn thư mục chứa trực tiếp file `manifest.json`.

### 4. Kiểm tra Extension

Sau khi cài đặt, **YouTube Auto Continue** sẽ xuất hiện trong danh sách Extension.

Mở YouTube và mở **Developer Tools (F12) → Console**.

Nếu Extension được tải thành công, Console sẽ hiển thị:

```text
[YT Auto Continue] Started
```

Khi YouTube hiển thị popup yêu cầu xác nhận tiếp tục xem, Extension sẽ tự động phát hiện và nhấn nút tương ứng.

## 📁 Cấu trúc thư mục

```text
auto_continue_ytb/
├── manifest.json
├── content.js
├── icons/
└── README.md
```

## ✨ Tính năng

* **Hỗ trợ tiếng Việt và tiếng Anh**

  * Tiếng Việt: `"Video đã tạm dừng"`, `"Có"`, `"Tiếp tục xem"`
  * Tiếng Anh: `"Video paused"`, `"Yes"`, `"Continue watching"`

* **Tương thích với giao diện YouTube hiện tại**

  * Hỗ trợ các cấu trúc DOM của YouTube như `yt-button-shape` và `yt-confirm-dialog-renderer`.

* **Tối ưu hiệu năng**

  * Sử dụng cơ chế giới hạn tần suất xử lý (*throttle*).
  * Giảm việc xử lý DOM không cần thiết.

* **Tự động tiếp tục phát**

  * Sau khi xác nhận popup, Extension kiểm tra trạng thái video.
  * Nếu video chưa tự động phát lại, Extension sẽ gọi `video.play()`.

## 🛠️ Công nghệ

* JavaScript
* Microsoft Edge / Chromium Extensions
* Manifest V3
* YouTube DOM API

## 🔄 Cập nhật Extension

Sau khi chỉnh sửa code:

1. Mở:

```text
edge://extensions
```

2. Tìm **YouTube Auto Continue**.
3. Nhấn nút **Reload (↻)**.
4. Tải lại tab YouTube.

## ⚠️ Lưu ý

Extension chỉ tự động xử lý thông báo **"Continue watching"** của YouTube.

Extension không bỏ qua quảng cáo, không thay đổi nội dung video và không can thiệp vào tài khoản YouTube.
