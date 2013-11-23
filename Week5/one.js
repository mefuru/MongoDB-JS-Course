db = db.getSiblingDB("blog");
db.posts.aggregate([
    { $project:
     {"comments" : "$comments"}
    },
    { $unwind: "$comments" },
    { $group: {_id : "$comments.author", sum : {$sum : 1}}},
    { $sort : {sum: 1} },
]);
