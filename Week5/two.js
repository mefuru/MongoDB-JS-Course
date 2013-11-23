var db = db.getSiblingDB("zips");
db.record.aggregate([
    { $match:
      {$or:
      [{ state: "CA"},
       { state: "NY"}]
      }
    },
    { $group:
      {  _id :
         {'state': "$state",
          'city': "$city"},
         pop: {"$sum" : "$pop"}
      }
    },
    { $match:
      { pop : { $gt : 25000}}
    },
    { $group:
      {_id : "$city", pop: {$avg : "$pop"}}
    },
    // { $sort : {pop : -1}},
    // { $limit: 5}
]);
