const mongoose = require("mongoose");
exports.connectionDB = (app) => {
  const PORT = process.env.PORT || 5000;
  mongoose
    .connect("mongodb://127.0.0.1:27017/itiDay2")
    .then(() => {
      console.log("Connect with DB");
      app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(`Error From DB ${err}`);
    });
};
