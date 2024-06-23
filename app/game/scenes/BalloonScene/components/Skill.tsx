
import { View, Dimensions, DimensionValue, Text, TouchableWithoutFeedback } from "react-native";
import LottieView from "lottie-react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.085);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

const Skill = (props: {
    title: string,
    size: number[],
    x: DimensionValue,
    y: DimensionValue,
    imageUri: string,
    imageOffset: {
        x: DimensionValue,
        y: DimensionValue
    }
    onPress: (title: string) => void
}) => {
    const width = props.size[0];
    const height = props.size[1];

    const skillPressed = () => props.onPress(props.title);

    return (
        <TouchableWithoutFeedback onPress={() => skillPressed()}>
            <View
                style={{
                    position: "absolute",
                    left: props.x,
                    top: props.y,
                    width,
                    height,
                    borderRadius: 100,
                    backgroundColor: "#65788D",
                    borderWidth: 1,
                    borderColor: '#4A3535',
                    zIndex: 10,
                    opacity: 0.5
                }}>
                <LottieView
                    source={{ uri: props.imageUri }}
                    style={{ width: "100%", height: "100%", marginTop: props.imageOffset.x, marginLeft: props.imageOffset.y }}
                    autoPlay
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Skill;