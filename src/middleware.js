import res from "express/lib/response";
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  // 이것을 짧게
  // if(req.session.loggedIn){
  //   res.locals.loggedIn = true;
  // }
  res.locals.loggedIn = Boolean(req.session.loggedIn); // 트루인지 폴스인지 확인해라
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {}; // || 은 or
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 300000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 10000000,
  },
});
