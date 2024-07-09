// import React, { useRef, useEffect, useState } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';

// const Model = ({ url, scale = [1, 1, 1], wall1Texture, wall2Texture, wall3Texture }) => {
//   const gltf = useLoader(GLTFLoader, url);
//   const modelRef = useRef();
//   const [texture1, setTexture1] = useState(null);
//   const [texture2, setTexture2] = useState(null);
//   const [texture3, setTexture3] = useState(null);

//   useEffect(() => {
//     loadTexture(wall1Texture, setTexture1);
//     loadTexture(wall2Texture, setTexture2);
//     loadTexture(wall3Texture, setTexture3);
//   }, [wall1Texture, wall2Texture, wall3Texture]);

//   const loadTexture = (textureUrl, setTexture) => {
//     if (textureUrl) {
//       new TextureLoader().load(
//         textureUrl,
//         (loadedTexture) => setTexture(loadedTexture),
//         undefined,
//         (err) => console.error('Error loading texture:', err)
//       );
//     }
//   };

//   return (
//     <group ref={modelRef} scale={scale}>
//       <primitive object={gltf.scene} />
//       {texture1 && (
//         <mesh position={[115, 50, -60]} rotation={[11.72, 11, 18]}>
//           <planeGeometry args={[90, 90]} />
//           <meshBasicMaterial map={texture1} />
//         </mesh>
//       )}
//       {texture2 && (
//         <mesh position={[50.3, 48, -113]} rotation={[69.13, 50.3, 50.25]}>
//           <planeGeometry args={[90, 90]} />
//           <meshBasicMaterial map={texture2} />
//         </mesh>
//       )}
//       {texture3 && (
//         <mesh position={[51, 49, -3]} rotation={[0, -3.15, 0]}>
//           <planeGeometry args={[90, 90]} />
//           <meshBasicMaterial map={texture3} />
//         </mesh>
//       )}
//     </group>
//   );
// };

// export default Model;




import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ url, scale = [1, 1, 1], selectedTexture }) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  useEffect(() => {
    if (gltf && modelRef.current) {
      const model = modelRef.current;

      // Traverse through the model hierarchy and apply textures
      model.traverse((child) => {
        if (child.isMesh) {
          if (child.name.includes('VELVET') && selectedTexture) {
            child.material.map = selectedTexture;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [gltf, selectedTexture]);

  return (
    <group ref={modelRef} scale={scale}>
      {gltf && <primitive object={gltf.scene} />}
    </group>
  );
};

export default Model;
