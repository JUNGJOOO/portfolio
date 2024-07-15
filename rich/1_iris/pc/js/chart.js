// chart radar
Chart.scaleService.updateScaleDefaults('radar', {
    ticks: {
        min: 0
    }
});
  
var data = {
    labels: ["사망 20,110", "암 5,000", "뇌 3,000", "심장 3,000", "실손 입원(5천)/통원(30)"],
    datasets: [{
        label: false,
        fill: true,
        backgroundColor: "rgba(126, 126, 126, 0.4)",
        borderColor: "rgb(192,192,192)",
        borderWidth: 1,
        pointRadius: 0,
        data: [3000, 18000, 7000, 15000, 13000]
    }]
};

var options = {
    responsive: true,
    tooltips: false,
    /* scale: https://www.chartjs.org/docs/latest/axes/radial/linear.html#axis-range-settings */
    scale: {
        angleLines: {
            display: true
        },
        pointLabels:{
        /* https://www.chartjs.org/docs/latest/axes/radial/linear.html#point-label-options */
            fontSize: 12,
            fontColor: '#FF934B',
            fontStyle: 'light',
            callback: function(value, index, values) {
                return value;
            }
        },
        ticks: {
            /* https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration */
            /* suggestedMax and suggestedMin settings only change the data values that are used to scale the axis */
            suggestedMin: 0,
            suggestedMax: 8000,
            stepSize: 8000, /* 25 - 50 - 75 - 100 */
            maxTicksLimit: 11, /* Or use maximum number of ticks and gridlines to show */
            display: false, // remove label text only,
        }
    },
    legend: {
        /* https://www.chartjs.org/docs/latest/configuration/legend.html */
        display: false,
    },
};
var myChart = new Chart(document.getElementById("chart"), {
    type: 'radar',
    data: data,
    options: options
});

// chart bar
(function( $ ) {
    "use strict";
    $(function() {
        function animated_contents() {
            $(".chart_bar > div ").each(function (i) {
                var $this  = $(this),
                    skills = $this.data('width');
                $this.css({'width' : skills + '%'});
            });
        }
        if(jQuery().appear) {
            $('.chart_bar').appear().on('appear', function() {
                animated_contents();
            });
        } else {
            animated_contents();
        }
    });
}(jQuery));