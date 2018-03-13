import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: ['labels', 'values', 'colors', 'unit'],
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: true
            },
            ticks: {
              callback: (value, index, values) => {
                return `${value}${this.unit}`
              }
            }
          }]
        },
        legend: {
          display: false
        },
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [{
        data: this.values,
        backgroundColor: this.colors
      }]
    }, this.options)
  }
}
