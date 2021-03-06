module.exports = function (socket) {
    socket.on('send:comment', function () {
        socket.broadcast.emit('send:comment');
    });
    socket.on('send:commentNews', function () {
        socket.broadcast.emit('send:commentNews');
    });
    socket.on("updateCollectionsStore", function () {
        socket.broadcast.emit("updateCollectionsStore");
    });
    socket.on("getCredentials", function () {
        socket.broadcast.emit("getCredentials");
    });
    socket.on("updateNewsStore", function() {
        socket.broadcast.emit("updateNewsStore");
    });
    socket.on("onLike", function (data) {
        socket.broadcast.emit("onLike", data);
    });
    socket.on("onUnlike", function (data) {
        socket.broadcast.emit("onUnlike", data);
    })
};