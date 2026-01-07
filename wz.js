let c  = console.log
let j = `{  
    "john": {  
      "username": "John",  
      "location": "London",  
      "online": true,  
      "followers": 987  
    },  
    "jesse": {  
      "username": "Jesse",  
      "location": "Washington",  
      "online": false,  
      "followers": 432  
    },  
    "drew": {  
      "username": "Drew",  
      "location": "Paris",  
      "online": false,  
      "followers": 321  
    },  
    "jamie": {  
      "username": "Jamie",  
      "location": "Berlin",  
      "online": true,  
      "followers": 654  
    }  
  }`

c(JSON.stringify(j))