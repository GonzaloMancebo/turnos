// contexts/ReservaContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { obtenerReservasPorUsuario } from '../services/reservas/reservaService';
import { useUser } from './UserContext';

interface TurnoReservado {
  id: number;
  cuposDisponibles: number;
  usuario_ya_reservo?: boolean;
}

interface ReservaContextType {
  reservas: TurnoReservado[];
  reservarTurno: (turnoId: number) => void;
  actualizarCupos: (turnoId: number, nuevosCupos: number) => void;
  estaReservado: (turnoId: number) => boolean;
  eliminarReserva: (turnoId: number) => void;

}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);

export const ReservaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { id, token } = useUser();
  const [reservas, setReservas] = useState<TurnoReservado[]>([]);

 useEffect(() => {
  if (!id || !token) {
    return;
  }

  const cargarReservas = async () => {
  try {
    const data = await obtenerReservasPorUsuario(id, token);

    // Transformar para ajustar a TurnoReservado[]
    const reservasFormateadas = data.map((reserva: any) => ({
      id: reserva.turno_id,
      cuposDisponibles: reserva.turno.cupo_maximo,  // o calculado si tienes
      usuario_ya_reservo: true,
    }));

    setReservas(reservasFormateadas);
  } catch (error) {
    console.error('[ReservaContext] Error cargando reservas:', error);
  }
};


  cargarReservas();
}, [id, token]);


 const reservarTurno = (turnoId: number) => {
  setReservas((prev) => {
    if (prev.find((r) => r.id === turnoId)) {
      return prev;
    }
    const nuevasReservas = [...prev, { id: turnoId, cuposDisponibles: 0, usuario_ya_reservo: true }];
    return nuevasReservas;
  });
};

const actualizarCupos = (turnoId: number, nuevosCupos: number) => {
  setReservas((prev) => {
    const actualizadas = prev.map((r) =>
      r.id === turnoId ? { ...r, cuposDisponibles: nuevosCupos } : r
    );
    return actualizadas;
  });
};



  const estaReservado = (turnoId: number) => {
    return reservas.some((r) => r.id === turnoId && r.usuario_ya_reservo);
  };

 const eliminarReserva = (turnoId: number) => {
  console.log("[ReservaContext] Eliminando reserva turnoId:", turnoId);
  setReservas((prev) => {
    const nuevoEstado = prev.filter((r) => r.id !== turnoId);
    console.log("[ReservaContext] Nuevo estado reservas:", nuevoEstado);
    return nuevoEstado;
  });
};



  return (
    <ReservaContext.Provider value={{ reservas, reservarTurno, actualizarCupos, estaReservado, eliminarReserva }}>
      {children}
    </ReservaContext.Provider>
  );
};

export const useReserva = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error("useReserva debe ser usado dentro de un ReservaProvider");
  }
  return context;
};
