const exprees = require("express");
const router = exprees.Router();

const {
  createMany,
  getPersons,
  createPerson,
  findOne,
  findFirst,
  updatePerson,
  connectPreference,
  createPreference
} = require("../controllers/person");

router.get("/getpersons", getPersons);
router.post("/createperson", createPerson);
router.post("/createmany", createMany);
router.get("/findone", findOne);
router.get("/findfirst", findFirst);
// router.put("/updateperson", updatePerson);
router.post("/createpreference", createPreference);
router.put("/connectpreference", connectPreference);
module.exports = router;
