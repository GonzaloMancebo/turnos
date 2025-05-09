import api from "../api";

export const obtenerTurnosPorClase = async (claseId) => {
	try {
		const response = await api.get(`/api/turnos/${claseId}`);

		if (response.status !== 200) {
			throw new Error("Respuesta inesperada del servidor");
		}

		return response.data;
	} catch (_err) {
		throw new Error("No se pudo obtener el turno");
	}
};
