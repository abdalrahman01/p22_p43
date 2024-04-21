import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const ModelViewer = () => {

  
  const mount = useRef(null);
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const model = useRef(null);
  const controls = useRef(null);

  

  useEffect(() => {
    scene.current = new THREE.Scene();

    camera.current = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.current.position.z = 2;

    renderer.current = new THREE.WebGLRenderer({alpha: true, antialias: true });
    renderer.current.setSize(mount.current.offsetWidth, mount.current.offsetHeight);
    mount.current.appendChild(renderer.current.domElement);

    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
    controls.current.enableRotate = true;
    controls.current.enableZoom = true;
    controls.current.enablePan = true;


  

    const loader = new GLTFLoader();
      loader.load('/models/cup_dish.glb', (gltf) => {
        model.current = gltf.scene;

      // Traverse through the model to apply the texture
  model.current.traverse((child) => {
    if (child.isMesh) {
      // Load the texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('/models/textures.jpg', (texture) => {
        // Apply the texture to the material
        child.material.map = texture;
        child.material.needsUpdate = true;
      });
    }
  });

      
        scene.current.add(model.current);
      }, undefined, (error) => {
        console.error('Error loading GLTF model', error);
      });


    const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.shadow=true;
    scene.current.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.current.render(scene.current, camera.current);
    };

    animate();

    return () => {
      // Clean up Three.js scene
      mount.current.removeChild(renderer.current.domElement);
    };
  }, []);
  
  return (
    <div
      ref={mount}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
    </div>
  );
};

export default ModelViewer;
