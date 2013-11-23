var db = db.getSiblingDB("zips");
db.record.aggregate([
    {$project: 
     {
	 first_char: {$substr : ["$city",0,1]},
         pop: "$pop"
         
     }	 
    },
    {$match:
     { first_char: {$lt: "A"}},
    },
    {$group:
     {_id: "hi", pop: {$sum: "$pop"}}
    }    
])
