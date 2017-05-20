INSERT INTO Users
  (id
  ,name
  ,lastname
  ,tag)
VALUES (
  Abs(Random())
  ,@name
  ,@lastname
  ,@tag);
