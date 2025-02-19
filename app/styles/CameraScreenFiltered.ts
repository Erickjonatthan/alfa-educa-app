import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#FBDBFFFF",
    },
    cameraContainer: {
        width: 400,
        height: 200,
        position: "relative",
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, // Cobrir toda a área da câmera
        flexDirection: 'row', // Alinha as letras lado a lado
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Fundo semi-transparente
    },
    letter: {
        fontSize:100,
        color: "#000000BD",
        fontWeight: "bold",
        marginHorizontal: 5, // Aumenta o espaçamento entre cada letra
    },
    smallLetter: {
        fontSize: 70,
        color: "#000000BD",
        fontWeight: "bold",
        marginHorizontal: 5, // Aumenta o espaçamento entre cada letra
    },
    button: {
        backgroundColor: '#FFAA00FF',
        padding: 20,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        width: 200,
    },
    text: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    },
    message: {
        fontSize: 18,
        textAlign: "center",
        margin: 20,
    },
});