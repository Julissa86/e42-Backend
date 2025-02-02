import "dotenv/config";
import express from "express";
import cors from "cors";
import openApiConfiguration from "./docs/swagger"; 
import swaggerUi from "swagger-ui-express";
import dbConnect from "./config/mongo"
import routes from "./routes/index"

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],  // Permitir ambos orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'], // Asegúrate de permitir el header 'Authorization' si lo usas
  credentials: true,  // Si necesitas enviar cookies o cabeceras de autenticación
};

app.use(cors(corsOptions));  // Usa el middleware CORS con las opciones configuradas


const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());
app.use(express.static("e42"));

const port = process.env.PORT || 3000;

app.use( '/documentation',
  swaggerUi.serve, 
  swaggerUi.setup(openApiConfiguration) );

app.use("/api", routes)

app.listen(port, () => {
  console.log(`Listo: http://localhost:${port}`);
});
dbConnect().then (() => {
  console.log(`Conectado a la base de datos ${ENGINE_DB} en ${NODE_ENV}`);
  
});

export default app;