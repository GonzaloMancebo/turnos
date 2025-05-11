import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import turnoRoutes from './routes/turnoRoutes.js';
import clasesRoutes from './routes/claseRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import   './models/associations.js';


dotenv.config();

const app = express();

// CORS para frontend en React
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false, 
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Rutas
app.use('/auth', authRoutes);
app.use('/api', turnoRoutes);
app.use('/api', clasesRoutes);
app.use('/api', reservaRoutes);






// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
