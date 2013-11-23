db = db.getSiblingDB("zips");
db.record.aggregate([
    { $limit: 5 }
]);
