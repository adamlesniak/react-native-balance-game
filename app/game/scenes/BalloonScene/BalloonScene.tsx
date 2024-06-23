import Matter from "matter-js";
import { useEffect, useState } from 'react';
import { GameEngine, TouchEvent } from "react-native-game-engine";
import { StatusBar, StyleSheet, Dimensions, View, Image, Text } from 'react-native';

import Balloon from './components/Balloon';
import Box from "./components/Box";
import Pointer from "./components/Pointer";
import Background from "./components/Background";
import SkillPicker from "./components/SkillPicker";

const Physics = (entities: any, { time }: { time: { delta: number } }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

interface BalloonSceneEntities {
  physics: {
    engine: Matter.Engine,
    world: Matter.World,
  },
  floor: {
    body: Matter.Body,
    size: number[],
    color: string,
    renderer: typeof Box
  },
  level: {
    body: Matter.Body,
    size: number[],
    color: string,
    renderer: typeof Box
  },
  balloon: {
    body: Matter.Body,
    size: number[],
    color: string,
    renderer: typeof Balloon
  },
  pointer: {
    body: Matter.Body,
    size: number[],
    color: string,
    renderer: typeof Pointer
  }
}

const UserInput = (entities: BalloonSceneEntities, { touches, screen }: {
  touches: TouchEvent[],
  screen: {
    width: number;
    height: number;
  }
}) => {
  if (touches.length > 0) {
    touches.forEach(touch => {

      // Control the balloon
      const balloon = entities['balloon'].body;
      const userLocation = { x: touch.event.pageX, y: touch.event.pageY };

      const pointer = entities['pointer'].body;

      if (pointer) {
        if (touch.event.pageX && touch.event.pageY) {
          pointer.render.opacity = 0;
          pointer.position = { x: touch.event.pageX, y: touch.event.pageY }
        }
      }

      const diff = {
        x: balloon.position.x - userLocation.x,
        y: balloon.position.y - userLocation.y
      }

      const [move, radius] = [0.005, 200];

      if (Math.abs(diff.x) <= radius && Math.abs(diff.y) <= radius) {
        const next = {
          x: balloon.position.x,
          y: balloon.position.y,
        }

        if (diff.x <= 0) {
          next.x = balloon.position.x - Math.abs(diff.x) * move;
        }

        if (diff.y <= 0) {
          next.y = balloon.position.y - Math.abs(diff.y) * move;
        }

        if (diff.x >= 0) {
          next.x = balloon.position.x + Math.abs(diff.x) * move;
        }

        if (diff.y >= 0) {
          next.y = balloon.position.y + Math.abs(diff.y) * move;
        }

        balloon.position = {
          x: next.x,
          y: next.y
        }
      }
    });
  }

  return entities;
}

const BalloonScene = () => {
  const engine = Matter.Engine.create();
  const { width, height } = Dimensions.get("screen");

  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const { world } = engine;

  const [skill, setSkill] = useState('earth');

  useEffect(() => {
    for (const body of engine.world.bodies) {
      if (body.label.startsWith('pointer')) {
        body.label = `pointer_${skill}`
      }
    }
  }, [skill]);

  // Refactor onto classes.
  // const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
  const initialBalloon = Matter.Bodies.circle(width / 2, height / 2, 10, { frictionAir: 0.5 });
  const initialPointer = Matter.Bodies.circle(width / 2, height / 2, 10, {
    isStatic: true, isSensor: true, label: 'pointer'
  });

  Matter.World.add(world, [initialBalloon, initialPointer]);

  return (
    <View style={styles.container}>
      <Background skill={skill} />
      <GameEngine
        style={styles.gameEngine}
        systems={[Physics, UserInput]} // Array of Systems
        entities={{
          physics: { engine, world },
          balloon: { body: initialBalloon, size: [boxSize, boxSize], color: "red", renderer: Balloon },
          pointer: { body: initialPointer, label: 'pointer', size: [boxSize, boxSize], renderer: Pointer }
        }}
      >
        <SkillPicker onSkillPick={setSkill} />
        <StatusBar hidden={true} />
      </GameEngine>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000'
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  },
  gameEngine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
});

export default BalloonScene;
