import { Pie } from 'vue-chartjs'

require('chart.piecelabel.js')

export default {
  extends: Pie,
  props: ['labels', 'values', 'colors'],
  data () {
    return {
      options: {
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            display: false
          }],
          xAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        },
        pieceLabel: {
          mode: 'label', // 'label', 'value' or 'percentage'
          fontColor: '#222',
          fontStyle: 'bold',
          position: 'outside' // 'default', 'border' and 'outside'
          // showZero: true,
          // arc: true,
          // overlap: true,
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
