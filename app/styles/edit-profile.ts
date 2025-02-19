import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#280F2BFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: "#fff",
    },
    fieldContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
    },
    fieldValue: {
        fontSize: 16,
        flex: 1,
        color: "#fff",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        flex: 1,
        paddingHorizontal: 10,
        color: "#fff",
    },
    editButton: {
        color: "#007BFF",
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#FFAA00FF",
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 5,
        width: "50%",
        alignSelf: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: "red",
        marginTop: 20,
        alignItems: "center",
    },
});