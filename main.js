// 1) Загружаем JSON с Google Ngram через CORS-прокси
async function loadNgram() {
    const ngramUrl = "https://books.google.com/ngrams/json?content=emotional+intelligence&year_start=1800&year_end=2019&corpus=26&smoothing=3";

    // Используем allorigins.win как прокси
    const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(ngramUrl);

    const response = await fetch(proxyUrl);
    const data = await response.json();

    // --- ОТЛАДКА ---
    console.log("Полные данные Ngram:", data);
    if (data.length === 0) {
        console.warn("Данные не найдены!");
        return [];
    }
    console.log("Количество записей:", data.length);
    console.log("Пример первой записи:", data[0]);
    console.log("Длина timeseries:", data[0].timeseries.length);
    console.log("Первые 10 значений timeseries:", data[0].timeseries.slice(0, 10));
    console.log("Годы:", data[0].timeseries.map((_, i) => i + 1800).slice(0, 10)); // пример первых лет

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
    if (ngramData.length === 0) return;

    const values = ngramData[0].timeseries; // массив значений

    // --- ОТЛАДКА ---
    console.log("Используемый массив timeseries:", values);

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    console.log("Среднее значение timeseries:", avg);

    // Пример визуализации: масштабируем куб по оси Y
    cube.scale.set(1, avg * 100, 1);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();






// // 1) Загружаем JSON с Google Ngram
// async function loadNgram() {
//     const url = "https://books.google.com/ngrams/json?content=emotional+intelligence&year_start=1800&year_end=2019&corpus=26&smoothing=3";
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("Ngram data:", data);
//     return data;
// }

// // 2) Пример создания сцены Three.js
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// document.body.appendChild(renderer.domElement);

// renderer.setSize(window.innerWidth, window.innerHeight);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x0099ff });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 3;

// // 3) Загружаем данные и используем их в визуализации
// loadNgram().then(ngramData => {
//     // например, изменяем размер куба в зависимости от данных
//     const values = ngramData[0].timeseries; // массив значений
//     const avg = values.reduce((a, b) => a + b, 0) / values.length;

//     cube.scale.set(1, avg * 100, 1); // пример визуализации
// });

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();
