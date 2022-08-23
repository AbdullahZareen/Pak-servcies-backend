import mongoose from "mongoose";
import myapp from "./app.js";

// port
const PORT = process.env.PORT || 8000;
const connection_string =
  "mongodb+srv://admin:1234@school-ms-1.qptit.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    myapp.listen(PORT, () => {
      console.log(`server is running on ${PORT} at ${new Date()}`);
    })
  )
  .catch((error) => console.log(error.message));
