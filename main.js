// 1) Загружаем JSON с Google Ngram через CORS-прокси
async function loadNgram() {
    const ngramUrl = "https://books.google.com/ngrams/json?content=emotional+intelligence&year_start=1800&year_end=2019&corpus=26&smoothing=3";
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

// 2) Three.js сцена
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50; // отодвигаем камеру, чтобы все круги поместились

// Массив для хранения сфер
const spheres = [];

// 3) Загружаем данные и создаём круги
loadNgram().then(ngramData => {
    if (ngramData.length === 0) return;

    const values = ngramData[0].timeseries;

    // Нормализуем значения для масштаба (чтобы сферы не были слишком большими)
    const maxVal = Math.max(...values);
    const scaleFactor = 20 / maxVal; // подбираем коэффициент масштабирования

    values.forEach((val, i) => {
        const radius = val * scaleFactor;
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x0099ff, wireframe: false });
        const sphere = new THREE.Mesh(geometry, material);

        // Размещаем сферы по оси X, можно и по Y для интересного эффекта
        sphere.position.x = i - values.length / 2;
        sphere.position.y = 0;
        sphere.position.z = 0;

        scene.add(sphere);
        spheres.push(sphere);
    });

    console.log(`Создано ${spheres.length} сфер.`);
});

// 4) Анимация (например, лёгкое вращение всей сцены)
function animate() {
    requestAnimationFrame(animate);

    // вращаем сцену вокруг Y
    // scene.rotation.y += 0.002;

    renderer.render(scene, camera);
}
animate();
