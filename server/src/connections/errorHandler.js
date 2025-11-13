const errorHandler = (err, req, res, next) => {
  console.log(err);
  console.log(
    `\x1b[31m${err.statusCode}\x1b[0m`,
    `\x1b[31m${err.message}\x1b[0m`,
    `\x1b[31m${err.stack}\x1b[0m`
  );
  res
    .status(err.statusCode)
    .json({ success: false, message: err.message, status: err.statusCode });
};
export default errorHandler;

// import chalk from "chalk";

// export const errorHandler = (err, req, res, next) => {
//   const defaultErr = {
//     log: "Express error handler caught unknown middleware error",
//     status: 500,
//     message: { err: "An error occurred" },
//   };
//   const errorObj = Object.assign(defaultErr, err);
//   console.log(chalk.bold.red(errorObj.log));
//   return res.status(errorObj.status).json(errorObj.message);
// };

// export default errorHandler;
