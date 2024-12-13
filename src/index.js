import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoute.js";
import emailRoutes from "./routes/emailRoute.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    try {
      res.send('Hello World!');
    } catch (error) {
      console.log(error)
    }
});

app.use('/auth', authRoutes);
app.use('/email', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
