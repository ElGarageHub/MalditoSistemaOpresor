SELECT
  U.id userId
  ,DATE(C.time) day
  ,COUNT(*) checks
FROM
  Checks C
  INNER JOIN Users U
    ON C.userId = U.id
GROUP BY
  DATE(C.time)
  ,U.id
