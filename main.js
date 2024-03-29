import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 }); // we can create our own material with webgl
const tours = new THREE.Mesh(geometry, material);

scene.add(tours);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z,);
    scene.add(star);
}

Array(200).fill().forEach(addStar)

// avatar
const avatarTexture = new THREE.TextureLoader().load('./assets/img/img.jpeg');

const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: avatarTexture })
)

scene.add(avatar);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    avatar.rotation.x += 0.01;
    avatar.rotation.y += 0.01;

    // camera.position.z = t * -0.001;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera


function animate() {
    requestAnimationFrame(animate);

    tours.rotation.x += 0.01;
    tours.rotation.y += 0.01;
    tours.rotation.z += 0.01;


    renderer.render(scene, camera);
}

animate();