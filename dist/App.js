"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const mongo_1 = __importDefault(require("./config/mongo"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // Permitir ambos orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'], // Asegúrate de permitir el header 'Authorization' si lo usas
    credentials: true, // Si necesitas enviar cookies o cabeceras de autenticación
};
app.use((0, cors_1.default)(corsOptions)); // Usa el middleware CORS con las opciones configuradas
const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("e42"));
const port = process.env.PORT || 3000;
app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api", index_1.default);
app.listen(port, () => {
    console.log(`Listo: http://localhost:${port}`);
});
(0, mongo_1.default)().then(() => {
    console.log(`Conectado a la base de datos ${ENGINE_DB} en ${NODE_ENV}`);
});
exports.default = app;
