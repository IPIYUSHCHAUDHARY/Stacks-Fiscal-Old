// Score Bar

const scoreBar = document.querySelectorAll('.score-bar');

for (let item of scoreBar) {
    let elem = item.getAttribute('aria-valuemax')
    let filled = item.getAttribute('aria-valuenow')
    for (let i = 0; i < elem; i++) {
        let score = document.createElement('span')
        score.classList = 'scoreVal';
        item.append(score);
    }

    const scoreElem = item.querySelectorAll('.scoreVal');

    for (let i = 0; i < filled; i++) {
        scoreElem[i].classList.add('filled')
    }
}

// HighChart

const target_tds = Array.from(document.querySelectorAll('td[data-targetcol]'));
const value_tds = Array.from(document.querySelectorAll('td[data-valuecol]'));


for (let i = 0; i < target_tds.length; i += 1) {
    let barD = (target_tds[i].dataset.targetcol).split(';');
    let barData = [Number(barD[0])];
    let barColor = ['#00346a'];
    let barSec = false;
    if (barD[1] != null) {
        barSec = true;
    }

    createChart(target_tds[i], barData, barColor, barSec);

}

for (let i = 0; i < value_tds.length; i += 1) {
    let barD = (value_tds[i].dataset.valuecol).split(';');
    let barData = [Number(barD[0])];
    let barColor = ['#3DBCF1'];
    let barSec = false;
    if (barD[1] != null) {
        barSec = true;
    }

    createChart(value_tds[i], barData, barColor, barSec);

}

function createChart(elem, barData, barColor, barSec) {
    let max = '';
    if (barSec) {
        max = 1000
    } else {
        max = 100
    }

    $(elem).highcharts({
        chart: {
            type: 'bar',
            backgroundColor: null,
            height: 18,
            margin: [0, 0, 0, 0],
            borderWidth: 0,
            style: {
                overflow: 'visible'
            },
            skipClone: true,
        },
        colors: barColor,
        series: [{
            data: barData
        }],
        title: false,
        xAxis: {
            visible: false
        },
        yAxis: {
            min: 0,
            max: max,
            visible: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    style: {
                        // color: '#555555',
                        textOutline: 'transparent',
                        fontSize: '14px',
                        fontWeight: '700',
                        fontFamily: 'Rajdhani'
                    },
                    formatter: function() {
                        if (barSec) {
                            return this.y + ' SEC';
                        } else {
                            return this.y + '%';

                        }
                    }
                },
                className: 'filledBar'
            },
            series: {
                borderWidth: 0,
                enableMouseTracking: false,
                animation: false
            }
        },
        tooltip: false,
        legend: false,
        credits: false
    });
}