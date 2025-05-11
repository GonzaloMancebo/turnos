import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const Clase = sequelize.define(
	"Clase",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		nivel: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		activo: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 1,
		},
		dia_semana: {
			type: DataTypes.ENUM("lunes", "martes", "miércoles", "jueves", "viernes"),
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

export default Clase;
