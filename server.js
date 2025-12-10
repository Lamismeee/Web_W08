import express from 'express';
import session from 'express-session';
import authRouter from './routers/auth.r.js';
const app = express();
const port = process.env.PORT || 3000;

import { create } from 'express-handlebars';

// Configure Handlebars with Helpers
const hbs = create({
    extname: '.hbs',
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main',
    helpers: {
        // Helper so sánh bằng
        ifEquals: function (a, b, options) {
            return a === b ? options.fn(this) : options.inverse(this);
        },
        // Helper lặp n lần để vẽ danh sách trang
        pages: function (n, options) {
            let accum = '';
            for (let i = 1; i <= n; ++i) {
                options.data.index = i;
                options.data.first = i === 1;
                options.data.last = i === n;
                accum += options.fn(i);
            }
            return accum;
        },
        // Helper cộng hai số (dùng cho nút Prev/Next)
        sum: (a, b) => a + b
    },
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

// Middleware xử lý JSON cho AJAX request
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key_an_toan_cua_ban',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true nếu dùng HTTPS
}));

// Middleware để truyền thông tin user từ session vào view (handlebars)
app.use((req, res, next) => {
    res.locals.user = req.session.user; // Biến {{user}} sẽ có sẵn ở mọi file .hbs
    next();
});

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/imgs', express.static(path.join(__dirname, '/assets/imgs')));

import homeRouter from './routers/home.r.js';
import categoryRouter from './routers/category.r.js';
import productRouter from './routers/product.r.js';

app.use('/', homeRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/', homeRouter);

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));