import { View, Dimensions, Image, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState, useRef } from "react";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const BODY_DIAMETER = Math.trunc(Math.max(WIDTH, HEIGHT) * 0.085);
const BORDER_WIDTH = Math.trunc(BODY_DIAMETER * 0.1);

const Pointer = (props: {
  body: {
    position: {
      x: number,
      y: number
    },
    label: string;
  },
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const opacityStyle = { opacity: opacityAnimation };

  const [, skill] = props.body.label.split('_');

  const animateShowElement = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true
    }).start();
  }

  const animateHideElement = () => {
    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true
    }).start();
  }

  useEffect(() => {
    if (props.body?.position.x !== position.x || props.body?.position.y !== position.y) {
      setPosition({
        x: props.body.position.x - width / 2,
        y: props.body.position.y - height / 2
      })
    }
  }, [props.body?.position])

  const width = 200;
  const height = 200;

  return (
    <View
      style={{
        position: "absolute",
        width,
        height,
        left: position.x,
        top: position.y,
      }}>
      <TouchableWithoutFeedback hitSlop={300} onPressIn={() => animateShowElement()} onPressOut={() => animateHideElement()}>
        <Animated.View style={opacityStyle}>
          {skill === 'fire' && <LottieView
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/pointer-fire-animation.json' }}
            style={{ width: "100%", height: "100%", marginTop: -50 }}
            autoPlay
            loop
          />}
          {skill === 'earth' && <LottieView
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/earths.json' }}
            style={{ width: "100%", height: "100%", marginTop: -50 }}
            autoPlay
            loop
          />}
          {skill === 'wind' && <LottieView
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/wind.json' }}
            style={{ width: "100%", height: "100%", marginTop: -50 }}
            autoPlay
            loop
          />}
          {skill === 'water' && <LottieView
            source={{ uri: 'https://storage.googleapis.com/static-assets-lesniak/master-of-balance/water.json' }}
            style={{ width: "100%", height: "100%", marginTop: -50 }}
            autoPlay
            loop
          />}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View >
  );
}

export default Pointer;