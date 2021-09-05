import "./style.css"

import * as THREE from "three";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { SphereGeometry } from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"), 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const material = new THREE.MeshStandardMaterial({color: 0xFF6347})

//scene.add(torus)


const pointLight = new THREE.PointLight(0x404040)
pointLight.position.set(5,5,5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper) 


const controls = new OrbitControls(camera, renderer.domElement)

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)



const spaceTexture = new THREE.TextureLoader().load("/space.jpg")
scene.background = spaceTexture;

const normalTexture = new THREE.TextureLoader().load("/normal.jpg")

const lineMat = new THREE.LineBasicMaterial({
	color: 0x00ff00
});

//https://astrokramkiste.de/planeten-tabelle
var mercuryOrb = 5.8
var venusOrb = 10.8
var earthOrb = 15
var marsOrb = 22.8
var jupiterOrb = 77.8
var saturnOrb = 147.2
var uranusOrb = 287.2
var neptunOrb = 449.5


const jupiterTexture = new THREE.TextureLoader().load("/2k_jupiter.jpg")
const marsTexture = new THREE.TextureLoader().load("/2k_mars.jpg")
const mercuryTexture = new THREE.TextureLoader().load("/2k_mercury.jpg")
const uranusTexture = new THREE.TextureLoader().load("/2k_uranus.jpg")
const venusTexture = new THREE.TextureLoader().load("/2k_venus_surface.jpg")
const earthTexture = new THREE.TextureLoader().load("/2k_earth_daymap.jpg")
const saturnTexture = new THREE.TextureLoader().load("/2k_saturn.jpg")
const neptunTexture = new THREE.TextureLoader().load("/2k_neptune.jpg")


function generatePlanet(texture, planetRad, orbitRad){
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetRad, 32, 32),
    new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normalTexture
    })
  )

  scene.add(planet)

  var points = []

  for(let i = 0; i <= 360; i++){
    //points.push(Math.sin(i*(Math.PI/180))*radius, Math.cos(i*(Math.PI/180))*radius, 0);
    points.push(new THREE.Vector3(Math.sin(i*(Math.PI/180))*orbitRad,  0, Math.cos(i*(Math.PI/180))*orbitRad))
  }

  const lineGeo = new THREE.BufferGeometry().setFromPoints( points );

  const line = new THREE.Line(lineGeo, lineMat)

  scene.add(line)

  return planet;

}

var jupiter = generatePlanet(jupiterTexture, 13.8, jupiterOrb)
var mars = generatePlanet(marsTexture, 0.6, marsOrb)
var mercury = generatePlanet(mercuryTexture, 0.4, mercuryOrb)
var uranus = generatePlanet(uranusTexture, 5.05, uranusOrb)
var venus = generatePlanet(venusTexture, 1.2, venusOrb)
var earth = generatePlanet(earthTexture, 1.2, earthOrb)
var saturn = generatePlanet(saturnTexture, 11.4, saturnOrb)
var neptune = generatePlanet(neptunTexture, 4.9, neptunOrb)


function animate(){
  var time = new Date() * 0.00025;
  requestAnimationFrame(animate);

  jupiter.rotation.y += 0.025;
  jupiter.position.x = -Math.cos(time) * jupiterOrb
  jupiter.position.z = -Math.sin(time) * jupiterOrb

  mars.rotation.y += 0.025;
  mars.position.x = -Math.cos(time) * marsOrb
  mars.position.z = -Math.sin(time) * marsOrb

  mercury.rotation.y += 0.025;
  mercury.position.x = -Math.cos(time) * mercuryOrb
  mercury.position.z = -Math.sin(time) * mercuryOrb
  
  uranus.rotation.y += 0.025;
  uranus.position.x = -Math.cos(time) * uranusOrb
  uranus.position.z = -Math.sin(time) * uranusOrb
  
  venus.rotation.y += 0.025;
  venus.position.x = -Math.cos(time) * venusOrb
  venus.position.z = -Math.sin(time) * venusOrb
  
  earth.rotation.y += 0.025;
  earth.position.x = -Math.cos(time) * earthOrb
  earth.position.z = -Math.sin(time) * earthOrb

  saturn.rotation.y += 0.025;
  saturn.position.x = -Math.cos(time) * saturnOrb
  saturn.position.z = -Math.sin(time) * saturnOrb

  neptune.rotation.y += 0.025;
  neptune.position.x = -Math.cos(time) * neptunOrb
  neptune.position.z = -Math.sin(time) * neptunOrb

  controls.update();


  renderer.render(scene, camera)  ;
}

animate()