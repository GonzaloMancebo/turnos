import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F4F7F5',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#4E8D7C',
    textAlign: 'center',
  },
  calendario: {
    borderRadius: 12,
    elevation: 3,
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F4F7F5',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4E8D7C',
  },
  claseCard: {
    backgroundColor: '#E5F4EB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  claseNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#355E4B',
  },
  claseInfo: {
    color: '#5C7C6B',
  },
  botonCerrar: {
    backgroundColor: '#A8D5BA',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBotonCerrar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  turnoCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 2,
    borderRadius: 10,
    elevation: 2,
  },
 
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disponibles: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
});
