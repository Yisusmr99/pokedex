// chart.js

let chartInstance = null;

/**
 * Renderiza una gráfica horizontal con estilo profesional y tema tipo Pokédex.
 * @param {Object} pokemon - Objeto con las estadísticas del Pokémon (del JSON de la API).
 */
export function renderStatsChart(pokemon) {
  const ctx = document.getElementById('statsChart')?.getContext('2d');
  if (!ctx) return;

  const labels = pokemon.stats.map(s => s.stat.name.toUpperCase());
  const data = pokemon.stats.map(s => s.base_stat);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Nivel: ',
        data: data,
        backgroundColor: 'rgba(59, 76, 202, 0.85)', // Azul Pokémon
        borderColor: '#3B4CCA',
        borderWidth: 1,
        borderRadius: 12,
        barPercentage: 0.6,
        categoryPercentage: 0.7
      }]
    },
    options: {
      indexAxis: 'y', // Barras horizontales
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          max: 200,
          grid: {
            color: '#d6d6d6',
            lineWidth: 1
          },
          ticks: {
            color: '#333',
            stepSize: 20,
            font: {
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: 'Valor de estadística',
            color: '#444',
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#333',
            font: {
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#3B4CCA',
          titleColor: '#fff',
          bodyColor: '#fff',
          cornerRadius: 6
        },
        datalabels: {
          anchor: 'end',
          align: 'right',
          color: '#000',
          font: {
            weight: 'bold'
          }
        }
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      }
    },
    plugins: []
  });
}
