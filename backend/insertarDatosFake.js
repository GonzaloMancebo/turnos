import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import Turno from './models/turno/turnoModel.js';
import { Clase } from './models/clase/claseModel.js'; // Ajustá path si es necesario

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const insertarTurnosFalsos = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con la base de datos exitosa');

    const clases = await Clase.findAll({ where: { activo: true } });

    for (const clase of clases) {
      const cantidadTurnos = faker.number.int({ min: 2, max: 5 });

      for (let i = 0; i < cantidadTurnos; i++) {
        // Generar una fecha aleatoria entre el 10 y el 17 de mayo
        const fecha = faker.date.between({
          from: new Date('2025-05-10'),
          to: new Date('2025-05-17'),
        });

        // Generar una hora aleatoria ese mismo día entre las 7:00 y 18:00
        const horaInicio = faker.date.between({
          from: new Date(`${fecha.toISOString().split('T')[0]}T07:00:00Z`),
          to: new Date(`${fecha.toISOString().split('T')[0]}T18:00:00Z`),
        });

        const horaFin = new Date(horaInicio.getTime() + 60 * 60 * 1000); // +1h

        await Turno.create({
          clase_id: clase.id,
          fecha: fecha.toISOString().split('T')[0], // yyyy-mm-dd
          hora_inicio: horaInicio.toTimeString().slice(0, 8),
          hora_fin: horaFin.toTimeString().slice(0, 8),
          activo: true,
          createdAt: new Date(),
        });
      }
    }

    console.log('✅ Turnos falsos generados exitosamente');
  } catch (error) {
    console.error('❌ Error al insertar turnos falsos:', error);
  } finally {
    await sequelize.close();
  }
};


insertarTurnosFalsos();
