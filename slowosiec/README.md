## Quick start

Get:
[http://ws.clarin-pl.eu/public/wordnet-work.LATEST.sql.gz](http://ws.clarin-pl.eu/public/wordnet-work.LATEST.sql.gz) and copy it into `./mysql` directory

run:
```
docker-compose up
docker exec -i slowosiec-db mysql -uroot -ppassword wordnet_new < /your/path/to/mysql/wordnet-work.LATEST.sql
```