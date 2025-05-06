import { StyleSheet } from "react-native";
import Colors from "../app/constants/Colors";
import ScreenDimensions from "../app/constants/ScreenDimensions";

const { ScreenWidth, ScreenHeight } = ScreenDimensions;

export default StyleSheet.create({
	container: {
		height: ScreenHeight,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.background,
	},
	input: {
		height: 50,
		width: "80%",
		backgroundColor: Colors.white,
		borderRadius: 8,
		paddingHorizontal: 16,
		marginTop: 16,
		fontSize: 16,
		color: Colors.text,

	},
	loginButton: {
		height: 48,
		width: "80%",
		backgroundColor: Colors.primary,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 24,
		elevation: 4,
	},
	loginButtonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: "bold",
        
	},
	signupStyle: {
		marginTop: 20,
		alignItems: "center",
	},
	signupTextStyle: {
		color: Colors.secondary,
		fontSize: 14,
        width: "80%",

	},
	dividerStyle: {
		height: 1,
		width: ScreenWidth * 0.8,
		backgroundColor: "#ccc",
		marginTop: 24,
		alignSelf: "center",
		borderRadius: 8,
	},
	logoImageStyle: {
		width: 200,
		height: 200,
		resizeMode: "contain",
		marginBottom: 24,
	},
});
