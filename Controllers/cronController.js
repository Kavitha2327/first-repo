// const cron = require("node-cron");

// let counter = 0; // persists while server is running

// const startCronJobs = () => {
//   cron.schedule("* * * * *", () => {
//     counter++;

//     console.log("Cron is running...");
//     console.log("Current counter value:", counter);
//     console.log("---------------------------");
//   });
// };

const cron = require("node-cron");
const nodemailer = require("nodemailer");

const startCronJobs = () => {
  // ⏰ Every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("Cron running at:", new Date());

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS, // Gmail App Password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: "gowthaminellipudi19@gmail.com",
        subject: "Cron Email",
        text: "This email is sent every 5 minutes using a cron job.",
      };

      // await transporter.sendMail(mailOptions);

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Cron email error:", error.message);
    }
  });
};

module.exports = { startCronJobs };

// module.exports = { startCronJobs };
