const express = require("express");
const router = express.Router();

const {
  createUserAgain,
  findUser,
  createAddress,
  addressPush,
  createUserAgainTwo,
  createUserAgainThree,
  addressDisconnect
} = require("../controllers/userAgain");

router.post("/createuseragain", createUserAgain);
router.get("/finduser", findUser);
router.post("/createaddress", createAddress);
router.put("/addresspush", addressPush);
router.post("/createusertwo", createUserAgainTwo);
router.post("/createuserthree", createUserAgainThree);
router.put("/addressdisconnect", addressDisconnect);

module.exports = router;
