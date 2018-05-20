var db = new Mongo().getDB("playground");

db.employees.insert({name:{first:'John', last: 'Doe'}, age:44});

db.employees.find().pretty();