import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";
//default export 이므로 이름을 바꾸어 사용해도 된다. - 다른 export는 나중에 하시고

const app = express(); // 항상 express 가 실행된 후 코드를 만들어 주어야 한다.//
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); //익스프레스가 폼의 value를 이해할 수 있게 하고

app.use(
  // express 는 이세션을 메모리에 저장하므로 재시작하면 사라짐 - 세션 미들웨어
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// app.get("/add-one", (req,res, next) => {
//     req.session.potato += 1; // 세션마다 숫자를 계산해보고
//     return res.send(`${req.session.id}\n${req.session.potato}`);
// });

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
