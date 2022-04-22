# football.json FORK

Generate all unique clubs:
```
node clubs.js
```

Insert into fh db:
```
PGUSER=dbuser \
PGHOST=database.server.com \
PGPASSWORD=secretpassword \
PGDATABASE=mydb \
PGPORT=3211 \
node insert_into_fh.js
```
