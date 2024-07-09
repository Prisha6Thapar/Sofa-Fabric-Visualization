// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import Model from './components/Model';

// const App = () => {
//   const [wall1Texture, setWall1Texture] = useState(null);
//   const [wall2Texture, setWall2Texture] = useState(null);
//   const [wall3Texture, setWall3Texture] = useState(null);

//   const handleWall1Upload = (event) => handleTextureUpload(event, setWall1Texture);
//   const handleWall2Upload = (event) => handleTextureUpload(event, setWall2Texture);
//   const handleWall3Upload = (event) => handleTextureUpload(event, setWall3Texture);

//   const handleTextureUpload = (event, setTexture) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log('Uploaded file:', file.name); // Log the file name
//       const reader = new FileReader();
//       reader.onload = () => setTexture(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       <input
//         type="file"
//         accept=".jpg,.jpeg,.png"
//         onChange={handleWall1Upload}
//         style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}
//       />
//       <input
//         type="file"
//         accept=".jpg,.jpeg,.png"
//         onChange={handleWall2Upload}
//         style={{ position: 'absolute', top: '10px', left: '120px', zIndex: 1 }}
//       />
//       <input
//         type="file"
//         accept=".jpg,.jpeg,.png"
//         onChange={handleWall3Upload}
//         style={{ position: 'absolute', top: '10px', left: '230px', zIndex: 1 }}
//       />
//       <Canvas>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Model url="/scene.gltf" scale={[3, 3, 3]} 
//           wall1Texture={wall1Texture} 
//           wall2Texture={wall2Texture} 
//           wall3Texture={wall3Texture} 
//         />
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };

// export default App;





// import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import Model from './components/Model';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';

// const textureFolder = '/textures/'; // Folder containing texture files

// const App = () => {
//   const [textures, setTextures] = useState([]);
//   const [selectedTexture, setSelectedTexture] = useState(null);

//   useEffect(() => {
//     // Load all textures from the folder
//     const loadTextures = async () => {
//       const textureFiles = ['texture1.jpg', 'texture2.jpg', 'texture3.jpg']; // Add your texture file names here
//       const loadedTextures = await Promise.all(
//         textureFiles.map(
//           (file) =>
//             new Promise((resolve, reject) => {
//               new TextureLoader().load(
//                 `${textureFolder}${file}`,
//                 resolve,
//                 undefined,
//                 reject
//               );
//             })
//         )
//       );
//       setTextures(loadedTextures);
//     };

//     loadTextures();
//   }, []);

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
//         {textures.map((texture, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedTexture(texture)}
//             style={{ margin: '0 5px' }}
//           >
//             Texture {index + 1}
//           </button>
//         ))}
//       </div>
//       <Canvas>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Model url="/scene.gltf" scale={[3, 3, 3]} texture={selectedTexture} />
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };
// export default App;













import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './components/Model';
import * as THREE from 'three';

const textureFolder = '/textures/'; // Folder containing texture files
const thumbnailFolder = '/textures/'; // Folder containing texture thumbnails

const App = () => {
  const [textureFiles, setTextureFiles] = useState([]);
  const [selectedTexture, setSelectedTexture] = useState(null);

  useEffect(() => {
    // Load texture file names
    const textures = [];
    for (let i = 1; i <= 36; i++) {
      textures.push(`texture${i}`);
    }
    setTextureFiles(textures);
  }, []);

  const handleTextureLoad = (file) => {
    const loader = new THREE.TextureLoader();
    let fileExtension = 'jpg';

    loader.load(
      `${textureFolder}${file}.${fileExtension}`,
      (texture) => {
        // Set texture filtering options for better quality
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;

        // Set wrapping mode
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        // Ensure the texture is loaded fully before applying
        texture.anisotropy = 16; // Enable anisotropic filtering

        // Set repeat properties to maintain the aspect ratio
        texture.repeat.set(5, 5); // Adjust these values as needed

        setSelectedTexture(texture);
      },
      undefined,
      (err) => console.error('Error loading texture:', err)
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1, display: 'flex', flexWrap: 'wrap' }}>
        {textureFiles.map((file, index) => (
          <img
            key={index}
            src={`${thumbnailFolder}${file}.jpg`} // Assume other textures are JPG thumbnails
            alt={`texture-${index}`}
            onClick={() => handleTextureLoad(file)}
            style={{
              width: '50px',
              height: '50px',
              margin: '5px',
              cursor: 'pointer',
              border: selectedTexture?.image?.src.includes(`${file}.`) ? '2px solid blue' : '1px solid black'
            }}
          />
        ))}
      </div>
      <Canvas>
        <ambientLight intensity={1.0} /> {/* Increased ambient light intensity */}
        <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Increased point light intensity */}
        <directionalLight position={[0, 10, 0]} intensity={1.0} /> {/* Added directional light */}
        <Model url="/scene.gltf" scale={[1, 1, 1]} selectedTexture={selectedTexture} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
