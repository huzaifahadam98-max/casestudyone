import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Bicycle() {
  const bodyRef = useRef<RapierRigidBody>(null);
  const [, get] = useKeyboardControls();

  const moveSpeed = 10;
  const turnSpeed = 2;

  useFrame((state) => {
    if (!bodyRef.current) return;
    const { forward, backward, left, right } = get();

    const linVel = bodyRef.current.linvel();
    const currentRotation = bodyRef.current.rotation();
    
    const rotation = new THREE.Quaternion(currentRotation.x, currentRotation.y, currentRotation.z, currentRotation.w);
    const frontVector = new THREE.Vector3(0, 0, -1);
    frontVector.applyQuaternion(rotation);

    let currentSpeed = 0;
    if (forward) currentSpeed = moveSpeed;
    if (backward) currentSpeed = -moveSpeed;

    if (forward || backward) {
      bodyRef.current.setLinvel({
        x: frontVector.x * currentSpeed,
        y: linVel.y,
        z: frontVector.z * currentSpeed
      }, true);
    } else {
      bodyRef.current.setLinvel({x: linVel.x * 0.95, y: linVel.y, z: linVel.z * 0.95}, true);
    }

    if (left) {
      bodyRef.current.setAngvel({x: 0, y: turnSpeed, z: 0}, true);
    } else if (right) {
      bodyRef.current.setAngvel({x: 0, y: -turnSpeed, z: 0}, true);
    } else {
      bodyRef.current.setAngvel({x: 0, y: 0, z: 0}, true);
    }

    const position = bodyRef.current.translation();
    const cameraPosition = new THREE.Vector3(position.x, position.y + 10, position.z + 15);
    state.camera.position.lerp(cameraPosition, 0.1);
    state.camera.lookAt(position.x, position.y, position.z);
  });

  return (
    <RigidBody ref={bodyRef} colliders="cuboid" mass={1} position={[0, 1, 0]} lockRotations={false} lockTranslations={false} enabledRotations={[false, true, false]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 1.5]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      <mesh position={[0, 0, -0.7]} rotation={[Math.PI / 2, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 1, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </RigidBody>
  );
}
