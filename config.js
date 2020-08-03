var pg_config = {};

switch (process.env.NODE_ENV) {
    case "development":
        mongo_config = {
            db: "mldb",
            host: "mongodb://localhost:27017/",
            collection : "sales"
        };
        break;

    case "uat":
        mongo_config = {
            db: "mldb",
            host: "mongodb://localhost:27017/",
            collection : "sales"
        };
        break;

    case "production":
        mongo_config = {
            db: "mldb",
            host: "mongodb://localhost:27017/",
            collection : "sales"
        };
        break;

    default:
        mongo_config = {
            db: "mldb",
            host: "mongodb://localhost:27017/",
            collection : "sales"
        };
        break;
}

var config = {
    mongo_config
};

module.exports = config;
