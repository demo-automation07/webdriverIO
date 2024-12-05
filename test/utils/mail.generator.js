import nodemailer from 'nodemailer';
import { jsonReportDirectory } from '../../config/configuration.js';
import smtpTransport from 'nodemailer-smtp-transport';
import yaml from 'js-yaml';
import fs from 'fs';
const reportData = yaml.load(fs.readFileSync('./reportingConfig/reportconfig.yml', 'utf8'));



const data = fs.readFileSync(jsonReportDirectory + `/combined-result.json`);
const jsonData = JSON.parse(data);
0;
var totalTestCasePlanned = jsonData.suites.length;


var date = new Date();
const dateFormat =
  (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
  "/" +
  (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
  "/" +
  date.getFullYear();

var suiteMap = new Map();
for (var i = 0; i < jsonData.suites.length; i++) {
  var suiteName = jsonData.suites[i].name;
  var result = jsonData.suites[i].tests.map((value, ind) => value.state);
  const status = result.every((val) => {
    return (val === "passed");
  });

  if (status) {
    suiteMap.set(suiteName, "passed");
  } else {
    if (result.includes("failed")) {
      suiteMap.set(suiteName, "failed");
    } else if (result.includes("skipped")) {
      suiteMap.set(suiteName, "failed");
    } else {
      suiteMap.set(suiteName, "status unknown");
    }
  }

}

var totalTestCaseExecuted = jsonData.suites.length;
var totalTestCasePassed = 0;
var totalTestCaseFailed = 0;
var totalTestCaseSkipped = 0;
var totalTestCaseStatusUnknown = 0;

suiteMap.forEach(function (value, key) {
  if (value === "passed") {
    totalTestCasePassed += 1;
  } else if (value === "failed") {
    totalTestCaseFailed += 1;
  } else if (value === "skipped") {
    totalTestCaseSkipped += 1;
  } else {
    totalTestCaseStatusUnknown += 1;
  }
});



var tableHtml = `
<table style="border-collapse: collapse; width: 700px; margin: 20px auto; font-size: 14px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    <thead style="background-color: #4A90E2; color: white; font-weight: bold;">
      <tr>
        <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Test Name</th>
        <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Status</th>
      </tr>
    </thead>
    <tbody>
`;

suiteMap.forEach(function (value, key) {
  let statusTextColor = "#000"; // Default text color for unknown status

  // Setting text color based on test result status
  if (value === "passed") {
    statusTextColor = "#4CAF50"; // Green for passed
  } else if (value === "failed") {
    statusTextColor = "#F44336"; // Red for failed
  } else if (value === "skipped") {
    statusTextColor = "#FF9800"; // Orange for skipped
  }

  tableHtml += `
    <tr>
      <td style="padding: 10px; text-align: left; border: 1px solid #ddd;">${key}</td>
      <td style="padding: 10px; text-align: center; font-weight: bold; border: 1px solid #ddd; color: ${statusTextColor};">${value}</td>
    </tr>
  `;
});

tableHtml += `</tbody></table>`;

// Report Summary Table
var reportTable = `
<table style="border-collapse: collapse; width: 800px; margin: 20px auto; font-size: 14px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
    <thead style="background-color: #4A90E2; color: white; font-weight: bold;">
      <tr>
        <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Test Cases Planned</th>
        <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Test Cases Executed</th>
        <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Test Cases Passed</th>
        <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Test Cases Failed</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: #f4f4f4;">
        <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${totalTestCasePlanned}</td>
        <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${totalTestCaseExecuted}</td>
        <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${totalTestCasePassed}</td>
        <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${totalTestCaseFailed}</td>
      </tr>
    </tbody>
</table>`;



const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: reportData.mailReportFrom,
      pass: reportData.mailFromAuthentication,
    },
  })
);


const sendEmail = async () => {
  try {

    const mailOptions = {
      from: reportData.mailReportFrom,
      to: reportData.mailReportTo,
      subject: `UI Automation Report - ${dateFormat}`,
      text: `Hi Team,\n\n
             Please find the attachment of the automation Report.
             \n\n\n
             Regards,\n
             QA - Automation Team`,
     html: `<html>
      <head>
      </head>
      <body>
      <p>Hi Team,<br>
        Please find the attachment for web automation Report.
      </p>
        <h1 class="heading" style="text-transform: capitalize; text-align: center; text-transform: capitalize; color: #000080; text-decoration-line: underline;
        text-decoration-line: underline;
        font-family: math;"> Automation Report - ${dateFormat}</h1>
        <div style="margin-top: 20px;"> 
          <div>${reportTable}</div>
          <div style="margin-top: 30px;">${tableHtml}</div>
        </div>
        <div style="font-weight: bold; margin-top: 40px;">
        <p>Regards,<br>
           QA - Automation Team.</p>
        </div>
        </body>
        </html>
        `
        ,
        attachments: []
    };
     // Conditionally attach PDF and HTML based on YML configuration
  if (reportData.attachPdfReportWithmail === 'yes') {
    mailOptions.attachments.push({
      path: './report/json_report/report\json-report\final-report.pdf', // Path to your PDF file
      contentType: 'application/pdf',
    });
  }

  if (reportData.attachHtmlReportWithMail === 'yes') {
    mailOptions.attachments.push({
      path: './report/timeline_report/timeline-report.html', // Path to your HTML file
      contentType: 'text/html',
    });
  }

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }

};

sendEmail();