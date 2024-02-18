"use strict"; // Enforces strict mode

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));

/**
 * Middleware to parse JSON bodies.
 * @type {import('express').RequestHandler}
 */
app.use(express.json());

/**
 * Middleware to parse URL-encoded bodies.
 * @type {import('express').RequestHandler}
 */
app.use(express.urlencoded({ extended: false }));

/**
 * Middleware to parse cookies.
 * @type {import('express').RequestHandler}
 */
app.use(cookieParser());

/**
 * Middleware to serve static files.
 * @type {Function}
 */
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

/**
 * Catch 404 and forward to error handler.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
app.use(function (req, res, next) {
	next(createError(404));
});

app.use(
	/**
	 * Error handler.
	 * @param {Error} err
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next
	 */
	function (err, req, res, next) {
		// Set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get("env") === "development" ? err : {};

		// Render the error page
		res.status(500);
		res.render("error");
	},
);

module.exports = app;
