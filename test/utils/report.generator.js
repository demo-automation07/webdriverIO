import fs from 'fs';
import { format } from 'date-fns';

const dirName = './report/json_report';
import puppeteer from 'puppeteer'

import data from '../../report/json_report/combined-result.json' with { type: 'json' }

function testingTime(dateFormat) {
	const dateTimes = new Date(dateFormat);
	return format(dateTimes, 'dd/MMM/yyyy hh:mm:ss a');
}

function milliseconds(mseconds) {
	const hours = Math.floor(mseconds / 3600000);
	const minutes = Math.floor((mseconds % 3600000) / 60000);
	const seconds = Math.floor((mseconds % 60000) / 1000);

	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = seconds.toString().padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


var totalTestCasePlanned = data.suites.length;

function testSkipped() {
	var testfailed = 0;
	data.suites.forEach(f => {
		var passed = 0;
		f.tests.forEach(e => {
			if (e.state == "failed") {
				passed = 1;
			}
			if (e.state == "skipped") {
				passed = 2;
			}
		})
		if (passed == 2) {
			testfailed++;
		}
	})
	return testfailed;
}

function testFailed() {
	var testfailed = 0;
	data.suites.forEach(f => {
		var passed = 0;
		f.tests.forEach(e => {
			if (e.state == "failed") {
				passed = 1;
			}
		})
		if (passed == 1) {
			testfailed++;
		}
	})
	return testfailed;
}

var failed = testFailed();
var skipped = testSkipped();
var passed = ((data.suites.length) - failed) - skipped;
var total = data.suites.length;

var browser_Name = [];
data.capabilities.forEach(b => {
	browser_Name.push(b.browserName);
})

var platformName = [];
data.capabilities.forEach(b => {
	platformName.push(b.platformName);
})

function teastingEnvironment(arr) {
	var obj = {};
	var maxNum, maxVal;
	for (var value of arr) {
		obj[value] = ++obj[value] || 1;
		if (maxVal === undefined || obj[value] > maxVal) {
			maxNum = value;
			maxVal = obj[value];
		}
	}
	return maxNum;
}

var browsername = teastingEnvironment(browser_Name);
var platform = teastingEnvironment(platformName);
var browserVersion = testingVersion(browsername);

function testingVersion(browsername) {
	var value = data.capabilities.filter(b => b.browserName == browsername);
	return value[0].browserVersion;
}

let html = `
<html>
<head>
  <style>
  body{
    font-family: sans-serif;
  }
  h2{
    text-align:center;
    color:#003c71;
  }
  table, td, th {  
    border: 1px solid #575958;
  } 
  table{
    border-collapse: collapse;
    margin-bottom:70px;
  }
  th, td {
    padding: 15px;
  }
  th, .result{
    text-transform: capitalize;
    color:white;
  }
  th {
    background-color: #003c71 !important;
  }
  canvas {
    height: 250px !important;
    width: 250px !important;
  }
  .resultSummary{
    display: flex;
    justify-content:  space-between;
  }
  .summaryTable{
    text-align:center;
    margin-top:10%;
  } 
  .browserVersion{
    display: flex;
    justify-content: space-between;
    margin: 5% 0%;
  }
  caption{
    padding-bottom:10px;
  }
  .summaryTable th {
    width:25%;
  }
  .browser-detail{
    text-transform: capitalize;
  }
  .browser-detail2{
    text-transform: lowercase;
  }
  .browser-detail b{
    color:#003c71;
  }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://unpkg.com/chart.js-plugin-labels-dv/dist/chartjs-plugin-labels.min.js"></script>
</head>
<body>
<div id="automationReport">
<div>
<h2>UI Automation Report - ${format(new Date(), 'dd/MM/yyyy')}</h2>
<div class="browserVersion">
<span class="browser-detail"><b>Browser</b> : ${browsername} <span class="browser-detail2">(version:${browserVersion})</span></span> <span class="browser-detail"><b>PlatformName</b> : ${platform}</span>
</div>
<div class="resultSummary">
<div>
<div>
<p><b>Start</b>- ${testingTime(`${data.start}`)}</p>
<p><b>End</b>- ${testingTime(`${data.end}`)}</p>
</div>
<table  class="summaryTable">
<caption><b>Summary For Test Cases</b></caption>
<tr><th>Planned</th><th>Executed</th><th>Passed</th><th>Failed</th></tr>
<tr><td>${totalTestCasePlanned}</td><td>${total}</td><td>${passed}</td><td>${failed}</td></tr>
</table>
</div>
<canvas id="myChart"></canvas>
</div>
</div>
<div>`
const suites = data.suites;

suites.forEach(element => {
	html += `<p><b>Name</b> : ${element.name}</p>`
	html += `<p><b>Duration</b> : ${milliseconds(`${element.duration}`)}</p>`
	html += `<table style="width:100%"><tr><th style="background-color:#85c6ff;">steps</th><th>duration</th><th>result</th></tr>`

	const test = element.tests;
	test.forEach(testStep => {
		if (testStep.state == "passed") {
			html += `<tr><td>${testStep.name}</td><td>${milliseconds(`${testStep.duration}`)}</td><td class="result" style="color:#03C04A;">${testStep.state}</td>`
		} else if (testStep.state == "failed") {
			html += `<tr><td>${testStep.name}</td><td>${milliseconds(`${testStep.duration}`)}</td><td class="result" style="color:#D70040;">${testStep.state}</td>`
			html += `<tr><td colspan="3"><b>Reason - </b>${testStep.error.message}</td></tr>`
		} else {
			html += `<tr><td>${testStep.name}</td><td>${milliseconds(`${testStep.duration}`)}</td><td class="result" style="color:#facb4b;">${testStep.state}</td>`
		}

	});
	html += `</table>`
});
html += `</div></div>

<script>
var xValues = ["Passed","Failed"];
var yValues = [${passed},${failed}];
var barColors = [
  "#77DD77",
  "#FF6961",
];

new Chart("myChart" , {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            borderColor: barColors,
			borderWidth: 0,
            data: yValues 
        }]
    },
     options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            font: {
                                size: 16
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw;
                            }
                        }
                    }
                },
                cutout: '70%', // Creating a hole in the middle of the doughnut
            }
        });
</script>
</body></html>`;

fs.writeFile(dirName + `/final-report.html`, html, 'utf8', (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('HTML file created successfully');
});

var filepath = process.cwd()+`/report/json_report/final-report.html`;


filepath = (filepath.replace('\\test\\utils','')).replaceAll('\\','/'); // to run in local environment
function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
 }
(async () => {

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`file://${filepath}`, {
		waitUntil: 'networkidle0'
	});
	await delay(4000);
	await page.pdf({
		path: `${dirName}/final-report.pdf`,
		format: 'A4',
		margin: {
			top: '50px',
			right: '50px',
			bottom: '50px',
			left: '50px'
		},
		printBackground: true
	});

	await browser.close();

	console.log('PDF file created successfully');
})();