# FER202 - Practical Exam 02

## Cấu trúc

```
Test02/
├── database.json                 # Dữ liệu json-server (products, orders, carts)
├── README.md                     # File này
└── lab2/                         # React app (CRA)
    └── src/
        ├── index.js
        ├── App.js                # CartProvider + BrowserRouter + Routes
        ├── styles.css            # Custom CSS (navbar xanh, sidebar, table cart…)
        ├── CartProvider.jsx      # useContext quản lý cartCount
        └── components/
            ├── Menu.jsx          # `/` Navbar HOME (vàng) + MAKE UP PRODUCTS + 🛒 (X)
            ├── Home.jsx          # `/` sidebar Categories: ALL / BEAUTY / FRAGRANCES
            ├── Product.jsx       # `/make-up` Search by title + Sort Title/Price
            ├── Detail.jsx        # `/detail/:id` Add To Cart + Add Review
            ├── Cart.jsx          # `/cart` Bảng giỏ hàng + Quantity + Delete + Total
            └── Checkout.jsx      # `/checkout` Shipping Address + Confirm Checkout
```

## Cách chạy

### 1. Cài dependencies
```bash
cd lab2
npm install
```

### 2. Mở 2 terminal song song

**Terminal 1 — json-server (port 9999):**
```bash
cd Test02
npx json-server --watch database.json --port 9999
```

**Terminal 2 — React app (port 3000):**
```bash
cd Test02/lab2
npm start
```

Truy cập: http://localhost:3000

## Các route

| URL | Component | Mô tả |
| --- | --- | --- |
| `/` | Home | Sidebar `Categories: ALL / BEAUTY / FRAGRANCES`, lưới sản phẩm 3 cột với nút **Detail** màu xanh |
| `/make-up` | Product | Heading `PRODUCT LIST`, ô **Search by title…**, dropdown `-- Sort By --` (Title A→Z / Z→A, Price Low→High / High→Low) |
| `/detail/:id` | Detail | Nút **Add To Cart** (hiện banner `Added to cart!`), form **Add Review** (Your name + Comment + 1–5 Star), danh sách **Reviews** |
| `/cart` | Cart | Bảng `# / Product / Price / Quantity / Subtotal / Action(Delete)`, `Total`, nút **Checkout** xanh lá |
| `/checkout` | Checkout | Heading `Checkout`, ô `Shipping Address`, nút **Confirm Checkout** xanh dương → ghi `orders` + xoá `carts` |

## Ghi chú kỹ thuật

- `CartProvider.jsx` dùng `createContext` + `useContext` để chia sẻ `cartCount` toàn app — badge trên Navbar tự cập nhật.
- **Add To Cart**: nếu sản phẩm đã có trong giỏ → +1 số lượng (PUT), chưa có → POST mới với quantity = 1.
- **Add Review**: PUT `/products/:id` với mảng `reviews` được cập nhật (đúng yêu cầu “thêm vào bảng products”).
- **Confirm Checkout**: POST `/orders` rồi DELETE từng item trong `/carts`.
- Style được viết tay trong `src/styles.css` để khớp screenshots trong đề (navbar xanh teal, HOME màu vàng, sidebar trắng-xám, các nút Detail xanh dương).
