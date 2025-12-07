# IOTA Tangle Game - Dự Đoán Số May Mắn 🎲

Chào mừng đến với dự án **Blockchain Game đơn giản sử dụng IOTA Tangle**. Đây là một ứng dụng web mô phỏng (Simulation DApp) cho phép người chơi tham gia trò chơi dự đoán số, trong đó mọi kết quả và lịch sử giao dịch được thiết kế để lưu trữ minh bạch trên mạng lưới IOTA Tangle.

![IOTA Game Banner](https://via.placeholder.com/1200x400/09090b/d946ef?text=IOTA+Tangle+Game+Cyberpunk+UI)

## 📖 Giới thiệu

Dự án này minh họa cách một trò chơi phi tập trung hoạt động mà không cần máy chủ trung gian truyền thống. Thay vì lưu điểm số vào Database (SQL/Mongo), chúng ta "ghi" kết quả lên **IOTA Tangle** - một sổ cái phân tán (Distributed Ledger) không mất phí giao dịch (feeless).

Giao diện được thiết kế theo phong cách **Cyberpunk Neon** hiện đại, mang lại cảm giác công nghệ tương lai.

## ✨ Tính năng nổi bật

1.  **Mô phỏng Ví Crypto (IOTA Wallet):**
    *   Người dùng có thể kết nối ví ảo.
    *   Hiển thị địa chỉ ví và số dư (MIOTA).
2.  **Cơ chế Game Smart Contract:**
    *   Người chơi chọn một số từ 1 đến 100.
    *   Hệ thống sinh ngẫu nhiên kết quả.
    *   **Luật thắng:** Nếu số thực tế nằm trong khoảng **±5** so với số dự đoán -> Thắng (Nhân đôi tiền cược).
3.  **Lịch sử minh bạch (Tangle History):**
    *   Mọi lượt chơi đều sinh ra một `Message ID` (giả lập) đại diện cho bản ghi trên Tangle.
    *   Hiển thị danh sách thắng/thua công khai.
4.  **AI Commentary (Tích hợp Google Gemini):**
    *   Sử dụng AI để đưa ra các bình luận hài hước, châm biếm hoặc chúc mừng dựa trên kết quả trận đấu theo thời gian thực.
5.  **Giao diện Tương tác (UI/UX):**
    *   Hiệu ứng Neon/Glow đẹp mắt.
    *   Responsive (tương thích mobile/desktop).
    *   Thông báo trạng thái trực quan.

## 🛠 Công nghệ sử dụng

*   **Frontend:** React (v19), TypeScript.
*   **Styling:** Tailwind CSS (Theme tùy chỉnh: Zinc & IOTA Neon).
*   **AI Integration:** Google GenAI SDK (Gemini 2.5 Flash).
*   **Icons:** Lucide React.
*   **Mô phỏng Blockchain:** `iotaService.ts` (Giả lập độ trễ mạng và xác thực giao dịch).

## 🚀 Cài đặt và Chạy dự án

### Yêu cầu
*   Node.js (phiên bản 18 trở lên).
*   Một API Key từ Google AI Studio (cho tính năng bình luận AI).

### Các bước thực hiện

1.  **Clone dự án:**
    ```bash
    git clone https://github.com/anhtuanpc/pizza_box.git
    cd pizza_box
    ```

2.  **Cài đặt thư viện:**
    ```bash
    npm install
    ```

3.  **Cấu hình API Key:**
    *   Tạo file `.env` hoặc thiết lập biến môi trường:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Chạy dự án:**
    ```bash
    npm start
    ```
    Truy cập trình duyệt tại `http://localhost:3000` (hoặc cổng tương ứng).

## 📂 Cấu trúc thư mục

```text
/
├── index.html              # Entry point, cấu hình Tailwind
├── index.tsx               # React root
├── App.tsx                 # Giao diện chính và logic game
├── types.ts                # Định nghĩa kiểu dữ liệu (TypeScript Interfaces)
├── services/
│   ├── iotaService.ts      # Giả lập logic Blockchain & Smart Contract
│   └── geminiService.ts    # Kết nối Google Gemini AI
├── components/
│   ├── WalletButton.tsx    # Nút kết nối ví và hiển thị số dư
│   └── HistoryList.tsx     # Bảng hiển thị lịch sử đấu
└── metadata.json           # Thông tin dự án
```

## 🧠 Cơ chế hoạt động (Logic Game)

Mặc dù đây là bản demo giao diện (Frontend), logic "Smart Contract" được mô phỏng như sau trong `iotaService.ts`:

1.  **Đặt cược:** Kiểm tra số dư ví người dùng.
2.  **Random Number Generation (RNG):** Máy tính tạo số ngẫu nhiên (1-100).
3.  **So khớp:**
    *   `|Số_Người_Chọn - Số_Kết_Quả| <= 5` => **THẮNG**.
    *   Ngược lại => **THUA**.
4.  **Ghi Tangle:** Tạo một mã hash giả lập (ví dụ: `0x1a2b...`) và đẩy vào mảng lịch sử kèm timestamp.
5.  **AI phản hồi:** Gửi kết quả sang Gemini để lấy câu bình luận tiếng Việt.

## 🔮 Hướng phát triển (Roadmap)

*   [ ] Tích hợp **IOTA SDK** thật để ghi dữ liệu lên mạng IOTA Testnet/Shimmer.
*   [ ] Viết Smart Contract thực tế bằng ngôn ngữ **Rust** (cho mạng IOTA SC).
*   [ ] Thêm tính năng Multiplayer (Nhiều người chơi cùng lúc).
*   [ ] Phát hành Token thưởng riêng cho game.

---
*Dự án được tạo bởi [Khuất Thu Huyền] - Demo khả năng tích hợp Web3 và AI.*
