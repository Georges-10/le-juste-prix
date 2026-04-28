import { Modal, View } from "react-native";
export default function ModalEndGame({ visible, onClose, children }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
