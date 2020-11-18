# **EMR**

### **Start**

```
git clone https://github.com/pokpack/ERD.git
cd ERD
npm install
```

___________
### **Ubuntu & MacOS**

```

HTTP_PORT=3001 P2P_PORT=6001 PEERS=ws://localhost:6002,ws://localhost:6003,ws://localhost:6004 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001,ws://localhost:6003,ws://localhost:6004 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002,ws://localhost:6004 SECRET_KEY=x]vf4yp0yf npm start
HTTP_PORT=3004 P2P_PORT=6004 PEERS=ws://localhost:6001,ws://localhost:6002,ws://localhost:6003 SECRET_KEY=x]vf4yp0yf npm start

curl -H "Content-type:application/json" -H "Authorization: Bearer x]vf4yp0yf" --data '{"data" : {"first_name": "firstname", "last_name" : "last_name"}}' http://localhost:3001/mineEMR

curl -H "Authorization: Bearer x]vf4yp0yf" http://localhost:3001/EMRs
curl -H "Authorization: Bearer x]vf4yp0yf" http://localhost:3001/EMRs/1

curl -H "Content-type:application/json" -H "Authorization: Bearer x]vf4yp0yf" --data '{"token" : "xxx"}' http://localhost:3001/newToken

```
___________
### **Window**

```

set HTTP_PORT=3001 && set P2P_PORT=6001 && set PEERS=ws://localhost:6002,ws://localhost:6003,ws://localhost:6004 && set SECRET_KEY=x]vf4yp0yf && npm start

set HTTP_PORT=3002 && set P2P_PORT=6002 && set PEERS=ws://localhost:6001,ws://localhost:6003,ws://localhost:6004 && set SECRET_KEY=x]vf4yp0yf && npm start

set HTTP_PORT=3003 && set P2P_PORT=6003 && set PEERS=ws://localhost:6001,ws://localhost:6002,ws://localhost:6004 && set SECRET_KEY=x]vf4yp0yf && npm start

set HTTP_PORT=3004 && set P2P_PORT=6004 && set PEERS=ws://localhost:6001,ws://localhost:6003,ws://localhost:6002 && set SECRET_KEY=x]vf4yp0yf && npm start


curl -H "Content-Type: application/json" -H "Authorization: Bearer x]vf4yp0yf" -X POST  http://localhost:3001/mineEMR -d "{\"data\":{\"user_id\": \"1\", \"fist_name\": \"fistname\", \"last_name\": \"lastname\"}}"

curl -H "Authorization: Bearer x]vf4yp0yf" GET http://localhost:3001/EMRs
curl -H "Authorization: Bearer x]vf4yp0yf" GET http://localhost:3001/EMRs/1

curl -H "Content-Type: application/json" -H "Authorization: Bearer x]vf4yp0yf" -X POST  http://localhost:3001/newToken -d "{\"data\": \"xxx\"}"

```

___________
### **Docker**


``` docker-compose up ```
