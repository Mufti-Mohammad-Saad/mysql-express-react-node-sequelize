const path = require("path");

const express = require("express");
const multer = require("multer");

const router = express.Router();
const logicCostomer = require("./logics/costomers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage: storage});

router.use('/my-uploads', express.static(path.join(__dirname, 'my-uploads')));

router.get("/", (req, res, next) => {
  res.statusCode = 200;
  res.write("<p>Ok</p>");
});
router.get("/api/customers", logicCostomer.fetchCostomer);


router.post("/api/customers", upload.single("file"), logicCostomer.addCostomer);
router.get("/api/customers/:id", logicCostomer.fetchCostomerById);
router.put("/api/customers/:id", upload.single("file"), logicCostomer.updateCostomer);
router.delete("/api/customers/:id", upload.single("file"), logicCostomer.deleteCostomer);

module.exports = router;
