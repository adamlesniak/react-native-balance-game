import { StyleSheet } from 'react-native';
import BalloonScene from './app/game/scenes/BalloonScene/BalloonScene';

export default function App() {
  return (
    <BalloonScene />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});

