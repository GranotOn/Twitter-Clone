function chainError(err) {
    return Promise.reject(err);
};

module.exports = chainError;