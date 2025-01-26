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

  initJobs() {
    this.dailyRating();
    this.dailyBLog();
    this.daily6HourInstagramOpen();
    this.daily3HourInstagramOpen();
  }

  dailyRating() {
    cron.schedule("30 1 * * *", () => {
      NotificationManager.sendNotificationWithData({
        title: "❤️ Review Insta Expert ❤️",
        body: "If we met or exceeded your expectations, it would mean a lot if you left us a review!",
        data: {
          key_: "url",
          in_app: false,
          value_:
            "https://apps.apple.com/app/instantsave-reels-post-story/id1565383004",
        },
      });
    });
  }

  dailyBLog() {
    cron.schedule("0 11 * * *", () => {
      NotificationManager.sendNotificationWithData({
        title: "Instagram Tips & Resources",
        body: "Unlock Instagram potential with tips & resources: from scheduling tools to creative apps. Elevate your IG presence!",
        data: {
          key_: "url",
          in_app: true,
          value_: "https://later.com/blog/category/instagram/",
        },
      });
    });
  }

  daily6HourInstagramOpen() {
    cron.schedule("0 */7 * * *", () => {
      NotificationManager.sendNotificationWithData({
        title: "10+ People Viewed Your Profile.",
        body: "Download With Just One Click.",
        data: {
          key_: "url",
          in_app: true,
          value_: "https://www.instagram.com",
        },
      });
    });
  }

  daily3HourInstagramOpen() {
    cron.schedule("0 */12 * * *", () => {
      this.notificationExplore();
    });
  }

  notificationExplore() {
    NotificationManager.sendNotificationWithData({
      title: "We are not connected...",
      body: "Just One Click.",
      data: {
        key_: "iap",
        in_app: true,
        value_: "",
      },
    });
  }
}

module.exports = new CronJobManager();
