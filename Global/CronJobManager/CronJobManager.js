const NotificationManager = require("../NotificationManager/NotificationManager");
var cron = require("node-cron");

class CronJobManager {
  constructor() {
    console.log("Starting Cron Job Manager");
    this.jobs = [];
    // this.initJobs();
  }

  schedule(cronExpression, callback) {
    const job = cron.schedule(cronExpression, callback);
    this.jobs.push({ cronExpression, job });
  }

  listJobs() {
    return this.jobs.map((job) => job.cronExpression);
  }

  cancelAllJobs() {
    this.jobs.forEach((job) => job.job.stop());
    this.jobs = [];
  }

  initJobs() {}
}

module.exports = new CronJobManager();
