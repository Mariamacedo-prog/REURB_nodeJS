import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./src/routes";
import path from "path";

dotenv.config();

// Configurar o aplicativo Express
const app = express();
app.use(express.json());

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.DATABASE, {  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function() {
  console.log('Conectado ao MongoDB');
});


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use("/", apiRoutes);


app.listen(process.env.PORTA || 3000, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});