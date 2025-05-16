import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  name: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: width * 0.045,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.08,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  avatarOption: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    margin: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
closeButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: 'red',
  borderRadius: 8,
  marginBottom: '10%',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: '5%',
  width: width * 0.5,
},

saveButton: {
  backgroundColor: '#4caf50',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
  alignSelf: 'center',  
  width: width * 0.5,
},

saveButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},

  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },

  changePasswordButton: {
  marginTop: 20,
  paddingVertical: 10,
  paddingHorizontal: 15,
  backgroundColor: '#2196F3',
  borderRadius: 8,
  alignSelf: 'center',
},
changePasswordText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

modalPasswordContainer: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalPasswordContent: {
  marginHorizontal: 30,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  elevation: 5,
},

input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginVertical: 10,
  fontSize: 16,
},



});

export default styles;
