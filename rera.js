var dataArray = require('./Data/RERA/gujarat.json')
dataArray = dataArray['data']

const uniqueMobileNumbers = [...new Set(dataArray.map(item => item.pr_mobile_no))];

// Extract unique emails
const uniqueEmails = [...new Set(dataArray.map(item => item.pmtr_email_id))];

console.log("Unique Mobile Numbers:", uniqueMobileNumbers.length);
console.log("Unique Emails:", uniqueEmails.length);