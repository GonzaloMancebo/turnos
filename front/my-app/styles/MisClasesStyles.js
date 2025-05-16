import { StyleSheet, Dimensions } from 'react-native';

// Obtener el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, 
    paddingVertical: 20,    
    backgroundColor: '#f4f4f9', 
    
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  
  fechaTitulo: {
    fontSize: 22,
    fontWeight: '600',  
    marginBottom: 12,  
    color: '#3b3b3b', 
    borderBottomWidth: 2,
    borderColor: '#ddd',  
    paddingBottom: 8,   
        marginLeft: "5%"

  },
  
  slotItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    width: screenWidth * 0.9, 
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },  
    shadowOpacity: 0.15, 
    shadowRadius: 8,     
    elevation: 5,        
  },

  filaClase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,   // Más margen vertical para separar los elementos
  },

  horaTexto: {
    fontSize: 18,
    fontWeight: '500',   
    color: '#333',       
  },


  cancelarBtn: {
    backgroundColor: '#e53935',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,             
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,              
  },

  cancelarBtnTexto: {
    color: '#fff',
    fontWeight: '600',   
    fontSize: 16,        
  },

  sinReservasContainer: {
  position: 'absolute',  // para que quede centrado encima del contenido
  top: '50%',
  left: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  zIndex: 10,
},

sinReservasTexto: {
  fontSize: 18,
  color: '#666',
  textAlign: 'center',
},


});

export default styles;
