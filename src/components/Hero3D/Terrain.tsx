import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';

export default function Terrain() {
  return (
    <group>
      {/* Ground Plane */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[100, 1, 100]} />
          <meshStandardMaterial color="#84cc16" /> {/* Muddy green */}
        </mesh>
      </RigidBody>
      
      {/* A simple low-poly tree 1 */}
      <RigidBody type="fixed" colliders="cuboid" position={[5, 1, -10]}>
         <mesh position={[0, 0, 0]} castShadow>
           <cylinderGeometry args={[0.2, 0.4, 2]} />
           <meshStandardMaterial color="#78350f" />
         </mesh>
         <mesh position={[0, 1.5, 0]} castShadow>
           <dodecahedronGeometry args={[1.5]} />
           <meshStandardMaterial color="#22c55e" />
         </mesh>
      </RigidBody>

      {/* A simple low-poly tree 2 */}
      <RigidBody type="fixed" colliders="cuboid" position={[-8, 1, -5]}>
         <mesh position={[0, 0, 0]} castShadow>
           <cylinderGeometry args={[0.2, 0.4, 2]} />
           <meshStandardMaterial color="#78350f" />
         </mesh>
         <mesh position={[0, 1.5, 0]} castShadow>
           <dodecahedronGeometry args={[1.5]} />
           <meshStandardMaterial color="#22c55e" />
         </mesh>
      </RigidBody>

      {/* Signpost */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, 1, -15]}>
        <mesh position={[0,0,0]} castShadow><boxGeometry args={[0.2, 2, 0.2]} /><meshStandardMaterial color="#78350f" /></mesh>
        <mesh position={[0, 1, 0]} castShadow><boxGeometry args={[4, 1, 0.2]} /><meshStandardMaterial color="#e5e5e5" /></mesh>
        <Text position={[0, 1, 0.11]} fontSize={0.4} color="#000" anchorX="center" anchorY="middle">
          Blog Directory
        </Text>
      </RigidBody>
    </group>
  );
}
