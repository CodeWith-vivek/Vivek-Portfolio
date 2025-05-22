import { Canvas } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { ContactBoy } from "./ContactBoy";

const ContactExperience = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={2} />
      <directionalLight position={[-5, 5, 5]} intensity={5} color={"#1C34FF"} />
      <group rotation={[0, -0.4, 0]}>
        <Text3D  position={[-3,-3,-2]} curveSegments={32} bevelEnabled bevelSize={0.04} bevelThickness={0.1} height={0.4} lineHeight={0.5} letterSpacing={-0.06} size={1.2} font={"/fonts/Inter_Bold.json"}>
          {`Hello`}
          <meshNormalMaterial />
          <ContactBoy scale={2.3} position={[3.2,0,1]} />
        </Text3D>

      </group>
    </Canvas>
  );
};

export default ContactExperience;
