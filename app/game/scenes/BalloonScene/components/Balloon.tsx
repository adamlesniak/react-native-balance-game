import { StyleSheet, View, Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.085);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

const Balloon = (props: {
  size: number[],
  body: {
    position: {
      x: number,
      y: number
    }
  },
  color: string
}) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 100,
        backgroundColor: props.color || "pink",
        borderWidth: 2,
        borderColor: 'black'
      }} />
  );
}

export default Balloon;