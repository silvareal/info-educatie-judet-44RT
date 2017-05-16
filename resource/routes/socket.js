module.exports = function (socket) {
    socket.on('send:comment', function (data) {
        socket.broadcast.emit('send:comment', {
            collectionId: data.collectionId,
            comment: data.comment,
            userName: data.userName,
            firstName: data.firstName,
            userId: data.userId,
        });
    });
};