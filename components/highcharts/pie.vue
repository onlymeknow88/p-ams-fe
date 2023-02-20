<template>
  <div>
    <div v-if="$fetchState.pending" class="card-body">
      <div class="skeleton">
        <div class="skeleton-title"></div>
        <div class="skeleton-chart">
          <div class="skeleton-charts"></div>
        </div>
        <div class="skeleton-description">
          <div class="row">
            <div class="skeleton-item">
              <div class="skeleton-icon"></div>
              <div class="skeleton-text"></div>
            </div>
          </div>
          <div class="row">
            <div class="skeleton-item">
              <div class="skeleton-icon"></div>
              <div class="skeleton-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-body">
      <div class="card-title d-flex justify-content-between">
        <h6 class="fw-bold">Assets by Status</h6>
      </div>
      <highchart :options="chartOptions" id="my-chart"/>
      <div class="col-lg-12 description">
        <div class="row">
          <div class="item-description" v-for="c in countSeries.total">
            <img
              class="mr-6"
              :src="'/assets/icon/' + c.icon +'.png'"
              alt="status"
              width="12"
              height="12"
            />
            <p class="text-black mr-2">{{ c.name}}</p>
            <span class="form-text">({{ c.total }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  async fetch() {
    const response = await this.$axios.$get('dashboard/chart-status')
    this.countSeries = response.result
  },
  data() {
    return {
      caption: '',
      title: '',
      subtitle: '',
      points: [],
      seriesColor: '',
      animationDuration: 1000,
      chartType: 'pie',
      colorInputIsSupported: null,
      chartTypes: [],
      durations: [0, 500, 1000, 2000],
      seriesName: 'Status',
      yAxis: '',
      watchers: ['options.title', 'options.series'],
      colors: [
        'Red',
        'Green',
        'Blue',
        'Pink',
        'Orange',
        'Brown',
        'Black',
        'Purple',
      ],
      lastPointClicked: {
        timestamp: '',
        x: '',
        y: '',
      },
      sexy: false,
      countSeries: '',
    }
  },
  computed: {
    chartOptions() {
      const ctx = this
      return {
        caption: {
          text: this.caption,
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        chart: {
          backgroundColor: this.sexy
            ? {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, this.seriesColor],
                  [0.5, '#ffffff'],
                  [1, this.seriesColor],
                ],
              }
            : '#ffffff',
          className: 'my-chart',
          type: this.chartType.toLowerCase(),
          height: 275,
        },
        plotOptions: {
          pie: {
            size: '70%',
            dataLabels: {
              enabled: false,
            },
            showInLegend: false,
          },
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>',
        },
        title: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text:
            `${this.title} ` +
            (this.lastPointClicked.timestamp !== ''
              ? `(Point clicked: ${this.lastPointClicked.timestamp})`
              : ''),
        },
        subtitle: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text: `${this.subtitle}`,
        },
        legend: {
          itemStyle: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        colors: ['#1438AE', '#E3930F', '#007256'],
        series: [
          {
            name: 'Asset',
            colorByPoint: true,
            innerSize: '65%',
            data: this.countSeries.data,
          },
        ],
      }
    },
  },
}
</script>

