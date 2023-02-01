import { app } from "./app";

app.listen(process.env.PORT || 8000, () => {
  console.log("Server on port 8000 \nhttp://localhost:8000 ");
});
