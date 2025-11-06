--------------------------------------MongoDB----------------------------------
0) What is DBMS  & DB ?
1) What is mongoDB?
2) Mongo Compass ?
3) Mongo Commands:- 

		show dbs                       :- show all database
		use myDatabase                 :- select database
		show collections               :- show collections
		db.users.drop()				   :- delete collection
		db.createCollection("users")   :- create a collection
		db.users.insertOne()		   :- inseart data in collection 
		db.users.insertMany()		   :- inseart many data 
	
--------------------------------------------------------------------------------------
		db.users.find()				   				:- fetch all data
		db.users.find().pretty()	   				:- Pretty format:
		db.users.find({ age: { $gt: 25 } })         :- find gratest data
		db.users.find({}, { name: 1, _id: 0 }) 		:- 
		db.users.find().sort({ age: -1 })			:- sorting  accending/decending
		db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })   	:- update
		db.users.updateMany({}, { $inc: { age: 1 } })					:- update many
		db.users.updateMany({}, { $inc: { age: 1 } })					:- Delete one
		db.users.deleteMany({ age: { $lt: 20 } })						:- delete many 





----------------------------------------------------------------------------------------


DB:-  SQL, NoSQL

DBMS:-   MySQl  && SQL 


