import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['labels', 'prices'],
  data () {
    return {
      collection: {
        labels: this.labels,
        datasets: [
          {
            label: 'Price (USD)',
            borderColor: '#125A63',
            // backgroundColor: '#125A63',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            // backgroundColor: 'rgba(18, 90, 99, 0.25)',
            data: this.prices,
            radius: 0
          }
        ]
      },
      options: {
        tooltips: {
          intersect: false
        },
        // layout: {
        //   padding: {
        //     left: 0,
        //     right: 10,
        //     top: 0,
        //     bottom: 0
        //   }
        // },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
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
    this.renderChart(this.collection, this.options)
  }
}
