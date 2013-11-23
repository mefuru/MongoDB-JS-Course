var db = db.getSiblingDB("school");
db.grades.aggregate([
    { $unwind: '$scores'},
    { $match:
      {$or:
       [{ 'scores.type': "exam"}, // have to use quotes
          {'scores.type': "homework"}]
      }
    },
    { $group:
      { _id :
        {'student_id': "$student_id",
         'class_id': "$class_id"},
        avg: {$avg: "$scores.score"}
      }
    },
    { $group:
      { _id :
        {'class_id': "$_id.class_id"},
        avg: {$avg: "$avg"}
      }
    },
    {$sort: {avg:-1}}
    // {$limit:1}
]);
