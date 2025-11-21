// 1) Загружаем JSON с Google Ngram
async function loadNgram() {
    const url = "https://books.google.com/ngrams/json?content=emotional+intelligence&year_start=1800&year_end=2019&corpus=26&smoothing=3";
    const response = await fetch(url);
    const data = await response.json();
    console.log("Ngram data:", data);
    return data;
}

// 2) Пример создания сцены Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0099ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

// 3) Загружаем данные и используем их в визуализации
loadNgram().then(ngramData => {
    // например, изменяем размер куба в зависимости от данных
    const values = ngramData[0].timeseries; // массив значений
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    cube.scale.set(1, avg * 100, 1); // пример визуализации
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
