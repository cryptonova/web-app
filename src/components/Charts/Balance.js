import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['labels', 'profits', 'value'],
  data () {
    return {
      options: {
        tooltips: {
          intersect: false,
          mode: 'index',
          callbacks: {
            label: function (tooltipItem, data) {
              const label = data.datasets[tooltipItem.datasetIndex].label
              const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return label + ': $' + window.amount(value)
            }
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            stacked: false,
            display: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Value (USD)',
          borderColor: '#125A63',
          backgroundColor: 'rgba(18, 90, 99, 0.2)',
          data: this.value
        },
        {
          label: 'Profits (USD)',
          borderColor: '#689619',
          backgroundColor: 'rgba(104, 150, 25, 0.2)',
          data: this.profits
        }
      ]
    }, this.options)
  }
}
