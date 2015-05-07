# SSESample
Simple Server-Sent Events application. 

## Contents
* **app.js** node.js server that emits random Server-Sent events (with or without ID, single/multiline, named/generic event)
* **index.html** Simplest possible SSE subscriber. Subscribes to `/events` stream and echoes everything it gets into dev console

## Start
`node app.js`

## Notes
* listens 8080 port
* SSE's last event ID parameter is not implemented
* Tested only in Chrome

