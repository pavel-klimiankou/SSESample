var http = require("http");
var sys = require("sys");
var fs = require("fs");

http.createServer(function(req, res) {
	var notFound = function (res) {
			res.writeHead(404);
			res.end();
		},
		handleSSE = function (res) {
			var timerId,
				scheduleEvent = function () {
					timerId = setTimeout(function () {
						try {
							emitRandomEvent(res);
							scheduleEvent();
						} catch (e) {
							console.log("ERR: " + e.message);
						}
					}, 1000);
				};

			res.writeHead(200, {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive"
			});

			res.on("close", function () {
				clearTimeout(timerId);
			});

			scheduleEvent();
		},
		emitRandomEvent = function (res) {
			var includeId = Math.random() < 0.4,
				multiline = Math.random() < 0.2,
				namedEvent = Math.random() < 0.3,
				data = (new Date()).toISOString();

			if (includeId) {
				res.write("id: " + data + "\n");
			}

			if (namedEvent) {
				res.write("event: myEvent\n");
			}

			res.write("data: " + data + "\n");

			if (multiline) {
				res.write("data: \t\t" + data + "\n\n");
			} else {
				res.write("\n");
			}
		},
		handleStatic = function (res, fileName) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(fs.readFileSync(fileName));
			res.end();
		},
		acceptHeader = req.headers.accept.toLowerCase(),
		url = req.url.toLowerCase();

	if (url === "/stream" && acceptHeader === "text/event-stream") {
		handleSSE(res);
	} else if (url === "/index.html" || url === "/") {
		handleStatic(res, "index.html");
	} else {
		notFound(res);
	}

}).listen(8080);
