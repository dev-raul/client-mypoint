import Toast from "react-native-tiny-toast";
export const Error = (msg: string) =>
  Toast.show(msg, {
    position: Toast.position.BOTTOM,
    containerStyle: {
      backgroundColor: "#F44336",
      borderRadius: 15,
      padding: "5px 10px",
    },
    textStyle: {
      color: "#fff",
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

export const Success = (msg: string) =>
  Toast.show(msg, {
    position: Toast.position.BOTTOM,
    containerStyle: {
      backgroundColor: "#03DAC5",
      borderRadius: 15,
      padding: "5px 10px",
    },
    textStyle: {
      color: "#fff",
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

export const Warning = (msg: string) =>
  Toast.show(msg, {
    position: Toast.position.BOTTOM,
    containerStyle: {
      backgroundColor: "#FFEB3B",
      borderRadius: 15,
      padding: "5px 10px",
    },
    textStyle: {
      color: "#fff",
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });
