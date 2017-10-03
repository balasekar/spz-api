let db = null;

module.exports = {
    setDB: (database) => {
        db = database;
    },
    getDB: () => db
};
