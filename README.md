# LIÊN HOA PINYIN

**HỌC ĐỂ THAY ĐỔI**

Bộ công cụ Pinyin của **Liên Hoa Global Education**.

## Web Pinyin

Phiên bản Web hiện có:
- Bộ gõ Pinyin trên trình duyệt.
- Gợi ý ứng viên chữ Hán theo Pinyin.
- Chọn ứng viên bằng chuột hoặc phím số 1–9.
- Nhập thanh điệu 1–4; hỗ trợ `v` thay cho `ü`.
- Chuyển Pinyin số sang Pinyin có dấu.
- Bàn phím Pinyin trên màn hình.
- Từ điển học nhanh với nhóm HSK 1–2 tích hợp sẵn.
- Tìm theo chữ Hán, Pinyin hoặc nghĩa tiếng Việt.
- Lưu từ, lịch sử sử dụng.
- Phát âm tiếng Trung bằng giọng đọc của thiết bị nếu trình duyệt hỗ trợ.
- PWA/offline cache để có thể cài lên màn hình điện thoại và dùng lại khi mất mạng sau lần tải đầu.

## GitHub Pages

Workflow triển khai nằm tại `.github/workflows/pages.yml`.

Trang Web:
https://khucminhhaibhu-creator.github.io/Lien-Hoa-Pin-Yin/

## Android / iOS

Thư mục `android/` là nền tảng Android IME; `ios/` là phần iOS keyboard. Đây là hai dự án native riêng và cần build/ký ứng dụng theo nền tảng.

## Lưu ý

Bản Web là bộ gõ/học tiếng Trung chạy phía trình duyệt. Dữ liệu từ điển tích hợp là dữ liệu học tập ban đầu, không phải toàn bộ kho từ HSK 1–6. Android IME vẫn là dự án native riêng, không tự biến Web thành bàn phím hệ thống.
