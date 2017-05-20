CREATE TABLE Users (
  id INTEGER NOT NULL
  ,name TEXT
  ,lastname TEXT
  ,tag VARBINARY(8000)
  ,PRIMARY KEY(id)
);

CREATE TABLE Checks (
  id INTEGER NOT NULL
  ,userId INTEGER
  ,time TEXT
  ,inout INTEGER
  ,FOREIGN KEY(userId) REFERENCES Users(id)
);
