var express = require("express");
// const userData = require("../data").default;
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");
const multer = require("multer");
const { user, userImage } = require("../Models/dbModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const postData = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    console.log(req.body);
    const data = await user.create({
      Name: userName,
      Password: password,
      Email: email,
    });

    // const workbook = new ExcelJS.Workbook();
    // const sheet = workbook.addWorksheet("user");

    // sheet.columns = [
    //   { header: "Name", key: "Name", width: 20 },
    //   { header: "Email", key: "Email", width: 60 },
    //   // { header: "Password", key: "Password", width: 20 },
    // ];
    // sheet.addRow(["Name", "Email"]);
    // sheet.addRow([data.Name, data.Email]);

    // const filepath = "./userData.xlsx";
    // await workbook.xlsx.writeFile(filepath);

    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "n130141@rguktn.ac.in",
    //     pass: "hhhp hoqi efxu senh",
    //   },
    // });

    // let mail = {
    //   from: '"Kavitha" <n130141@rguktn.ac.in>',
    //   to: email,
    //   subject: "Sign up",
    //   html: `
    //   <h3>Hello ${data.Name},</h3>
    //   <p>You have successfully created your account.</p>
    //   <br/>
    //   <p>Thank you,<br/>Kavitha</p>
    //   `,
    //   attachments: [
    //     {
    //       filename: "userData.xlsx",
    //       path: filepath,
    //     },
    //   ],
    // };

    // await transporter.sendMail(mail);
    console.log("data sent");
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const Login = await user.findOne({ Name: userName, Password: password });
    if (!Login) {
      return res.status(401).send("Invalid Credentials");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mail = {
      from: `"Kavitha" <${process.env.EMAIL}>`,
      to: Login.Email,
      subject: "Login Alert",
      html: `<h3>Hello ${Login.Name}</h3>
             <p>You logged in successfully.</p>`,
    };

    // Respond immediately
    res.status(200).json({ message: "Login successful" });

    // Fire-and-forget mail
    transporter
      .sendMail(mail)
      .then(() => console.log("Login mail sent"))
      .catch((err) => console.error("Mail error:", err));
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

const forget = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const updatedUser = await user.findOneAndUpdate(
      { Name: userName },
      { Password: password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(401).send("Invalid Username");
    }
    return res.status(201).send("Password updated successfully");
  } catch (err) {
    return res.status(401).send(err);
  }
};

const users = async (req, res) => {
  try {
    const { email } = req.body;

    const userData = await user.find();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("one");

    sheet.addRow(["Name", "Email", "ID"]);

    userData.forEach((u) => {
      sheet.addRow([u.Name, u.Email, u._id]);
    });

    const filepath = "./user.xlsx";
    await workbook.xlsx.writeFile(filepath);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "n130141@rguktn.ac.in",
        pass: "hhhp hoqi efxu senh",
      },
    });
    let mail = {
      from: `"kavitha" <n130141@rguktn.ac.in>`,
      to: email,
      subject: "data",
      attachments: [
        {
          filename: "user.xlsx",
          path: filepath,
        },
      ],
    };
    await transporter.sendMail(mail);
    return res.status(201).send("excel sent");
  } catch (err) {
    res.status(400).send(err);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("profile");

const uploadData = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) return res.status(500).send(err.message);
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      const filepath = req.file.path.replace(/\\/g, "/");
      const data = await userImage.create({
        Name: req.body.name,
        Profile: filepath,
      });
      console.log(data.Profile);

      res
        .status(201)
        .send({ message: "Uploaded", name: data.Name, profile: data.Profile });

      // let transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "n130141@rguktn.ac.in",
      //     pass: "hhhp hoqi efxu senh",
      //   },
      // });

      // let mail = {
      //   from: `"kavitha" <n130141@rguktn.ac.in>`,
      //   to: "chery15171@proton.me",
      //   subject: "File",
      //   html: `<h2>hello ${data.Name}</h2><img src="cid:profileImage" style="width:250px; border-radius:10px;" />`,
      //   attachments: [
      //     {
      //       filename: data.Name,
      //       path: data.Profile,
      //       cid: "profileImage",
      //     },
      //   ],
      // };
      // await transporter.sendMail(mail);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
};

const deleteData = async (req, res) => {
  try {
    const { userName } = req.body;
    const data = await user.findOneAndDelete({ Name: userName });
    console.log("user: ", req.body.username);
    if (!data) {
      console.log("user not found");
      return res.status(401).send("user not found");
    }
    return res.status(201).send("deleted successfully");
  } catch (err) {
    console.log(err);
  }
};

exports.postData = postData;
exports.login = login;
exports.forget = forget;
exports.users = users;
exports.uploadData = uploadData;
exports.deleteData = deleteData;
