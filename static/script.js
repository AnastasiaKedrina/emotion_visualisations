let chart;

async function loadTerm() {
    const term = document.getElementById("input").value;

    const res = await fetch(`/term?term=${term}`);
    const json = await res.json();

    if (json.error) {
        alert(json.error);
        return;
    }

    const years = json.data.map(d => d.year);
    const counts = json.data.map(d => d.count);

    if (chart) chart.destroy();

    const ctx = document.getElementById("chart");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: years,
            datasets: [{
                label: term,
                data: counts
            }]
        }
    });
}
