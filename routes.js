var router = require("express").Router({ mergeParams: true });

router.use("/example", require("./controller/example.controller"));
router.use("/api*", require("./controller/api.controller"));
module.exports = router;

