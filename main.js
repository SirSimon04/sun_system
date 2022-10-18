import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereGeometry } from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(300);
camera.position.setY(300);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0x404040);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

//const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(gridHelper)

//asdf
const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;

const normalTexture = new THREE.TextureLoader().load("/normal.jpg");

const lineMat = new THREE.LineBasicMaterial({
  color: 0x00ff00,
});

var sunRad = 34.8171;
//696.342
//https://astrokramkiste.de/planeten-tabelle
var mercuryOrb = 5.8 + sunRad;
var venusOrb = 10.8 + sunRad;
var earthOrb = 15 + sunRad;
var marsOrb = 22.8 + sunRad;
var jupiterOrb = 77.8 + sunRad;
var saturnOrb = 147.2 + sunRad;
var uranusOrb = 287.2 + sunRad;
var neptunOrb = 449.5 + sunRad;

const jupiterTexture = new THREE.TextureLoader().load("/2k_jupiter.jpg");
const marsTexture = new THREE.TextureLoader().load("/2k_mars.jpg");
const mercuryTexture = new THREE.TextureLoader().load("/2k_mercury.jpg");
const uranusTexture = new THREE.TextureLoader().load("/2k_uranus.jpg");
const venusTexture = new THREE.TextureLoader().load("/2k_venus_surface.jpg");
const earthTexture = new THREE.TextureLoader().load("/2k_earth_daymap.jpg");
const saturnTexture = new THREE.TextureLoader().load("/2k_saturn.jpg");
const neptunTexture = new THREE.TextureLoader().load("/2k_neptune.jpg");
const sunTexture = new THREE.TextureLoader().load("/sun_texture.jpg");

var orbits = [];

function generatePlanet(texture, planetRad, orbitRad) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetRad, 32, 32),
    new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normalTexture,
    })
  );

  scene.add(planet);

  var points = [];

  for (let i = 0; i <= 360; i++) {
    //points.push(Math.sin(i*(Math.PI/180))*radius, Math.cos(i*(Math.PI/180))*radius, 0);
    points.push(
      new THREE.Vector3(
        Math.sin(i * (Math.PI / 180)) * orbitRad,
        0,
        Math.cos(i * (Math.PI / 180)) * orbitRad
      )
    );
  }

  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(lineGeo, lineMat);

  // scene.add(line)
  orbits.push(line);

  return planet;
}

var jupiter = generatePlanet(jupiterTexture, 13.8, jupiterOrb);
var mars = generatePlanet(marsTexture, 0.6, marsOrb);
var mercury = generatePlanet(mercuryTexture, 0.4, mercuryOrb);
var uranus = generatePlanet(uranusTexture, 5.05, uranusOrb);
var venus = generatePlanet(venusTexture, 1.2, venusOrb);
var earth = generatePlanet(earthTexture, 1.2, earthOrb);
var saturn = generatePlanet(saturnTexture, 11.4, saturnOrb);
var neptune = generatePlanet(neptunTexture, 4.9, neptunOrb);

function addOrbits() {
  for (let i of orbits) {
    scene.add(i);
  }
}
addOrbits();

function removeOrbits() {
  for (let i of orbits) {
    scene.remove(i);
  }
}

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(sunRad, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);
scene.add(sun);

function animate() {
  var time = new Date() * 0.0006;
  requestAnimationFrame(animate);

  //eine Erdumrundung dauert eine Minute, andere Zeiten sind daran angepasst
  mercury.rotation.y += 0.025;
  mercury.position.x = -Math.cos(time * 4.15) * mercuryOrb;
  mercury.position.z = -Math.sin(time * 4.15) * mercuryOrb;

  venus.rotation.y += 0.025;
  venus.position.x = -Math.cos(time * 1.62) * venusOrb;
  venus.position.z = -Math.sin(time * 1.62) * venusOrb;

  earth.rotation.y += 0.025;
  earth.position.x = -Math.cos(time) * earthOrb;
  earth.position.z = -Math.sin(time) * earthOrb;

  mars.rotation.y += 0.025;
  mars.position.x = -Math.cos(time * 0.53) * marsOrb;
  mars.position.z = -Math.sin(time * 0.53) * marsOrb;

  jupiter.rotation.y += 0.025;
  jupiter.position.x = -Math.cos(time * 0.0843) * jupiterOrb;
  jupiter.position.z = -Math.sin(time * 0.0843) * jupiterOrb;

  saturn.rotation.y += 0.025;
  saturn.position.x = -Math.cos(time * 0.03395) * saturnOrb;
  saturn.position.z = -Math.sin(time * 0.03395) * saturnOrb;

  uranus.rotation.y += 0.025;
  uranus.position.x = -Math.cos(time * 0.0119) * uranusOrb;
  uranus.position.z = -Math.sin(time * 0.0119) * uranusOrb;

  neptune.rotation.y += 0.025;
  neptune.position.x = -Math.cos(time * 0.006068) * neptunOrb;
  neptune.position.z = -Math.sin(time * 0.006068) * neptunOrb;

  controls.update();

  renderer.render(scene, camera);
}

animate();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

document.getElementById("orbits").onclick = function () {
  var checkbox = document.getElementById("orbits");
  console.log("orbits pressed");
  if (checkbox.checked == true) {
    addOrbits();
  } else {
    removeOrbits();
  }
};
