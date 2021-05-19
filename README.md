# Practical_Task

## Installation Setps
    - git clone https://github.com/bhosale05/Practical_Task.git
    - npm Install

## Executation setps
    - node index.js

## Login APi hit on postamn 
    # Dependency
        - Insert some records in users with fields username and password

    Method :  post 
    URL :  localhost:3001/users/login
    Payload : {
        "username":"archana05",
        "password" : "arcana@0512"
    }

## Logout Api hit on postman 

    Method :  get 
    URL :  localhost:3001/users/logout
    Note : Destroy the seeeion of login page and clear the credentials 

## List Of API hit on Postman For Insert 
    1.BULK Insert
        Method : Post
        URl :  localhost:3001/student/data/bulk
        Payload : [{
                "name": "Ram Varma",
                "age": 24,
                "phone_number": 9876532119,
                "date_of_birth": "1995-12-05"
            },
            {
                "name": "Ritu Jain",
                "age": 21,
                "phone_number": 9676553211,
                "date_of_birth": "1994-11-13"
            },
            {
                "name": "Anil Roy",
                "age": 31,
                "phone_number": 9676532119,
                "date_of_birth": "1994-09-13"
            },..]

        Note : 1. Makde sure date format is "YYYY-MM-DD" if user want to change the format then changes need in validate function in  Practical_Task/api/router/student.js
               2. if user pass age as string or name as number then get proer error
    
    2. Insert data with Limit 30 : 
        Method : Post
        URl :  localhost:3001/student/data/record
        Payload : [{
                "name": "Ram Varma",
                "age": 24,
                "phone_number": 9876532119,
                "date_of_birth": "1995-12-05"
            },
            {
                "name": "Ritu Jain",
                "age": 21,
                "phone_number": 9676553211,
                "date_of_birth": "1994-11-13"
            },
            {
                "name": "Anil Roy",
                "age": 31,
                "phone_number": 9676532119,
                "date_of_birth": "1994-09-13"
            }]

        Note : 1. user Insert 30 or less than 30 reocrds, so pass 30 or less than 30 lenth of array in payload

    2. Insert data with Limit 50 : 
        Method : Post
        URl :  localhost:3001/student/data
        Payload : [{
                "name": "Ram Varma",
                "age": 24,
                "phone_number": 9876532119,
                "date_of_birth": "1995-12-05"
            },
            {
                "name": "Ritu Jain",
                "age": 21,
                "phone_number": 9676553211,
                "date_of_birth": "1994-11-13"
            },
            {
                "name": "Anil Roy",
                "age": 31,
                "phone_number": 9676532119,
                "date_of_birth": "1994-09-13"
            },...]

        Note : 1. user Insert 50 reocrds only, so pass 50 records from payload
               2. user wnat to insert less than 50 for more than 50 reocrds then give error, only insert 50 records