INSERT INTO Checks (
  id
  ,userId
  ,time
  ,inout)
VALUES (
  Abs(Random())
  ,(
    SELECT
      id
    FROM
      Users
    WHERE
      tag = @tag
    LIMIT
      1)
  ,Datetime('now')
  ,(
    SELECT
      (Count(*) + 1) % 2
    FROM
      Checks
    WHERE
      userId = (
        SELECT
          id
        FROM
          Users
        WHERE
          tag = @tag
        LIMIT
          1)
      AND time >= Date('now')
      AND time < Date('now', '+1 day')));
