### dump(backup) to ./dump 
mongodump -d sir
mongodump -d sirMemo -c memos

### restore
mongorestore -d sir -c memos ./dump/sirMemo/memos.bson