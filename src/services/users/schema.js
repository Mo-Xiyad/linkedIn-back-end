import mongoose from 'mongoose';


const { Schema , model } = mongoose;

/* THE USER MODEL LOOKS LIKE THIS 
    {
        "_id": "5d84937322b7b54d848eb41b", //server generated
        "name": "Diego", //REQUIRED
        "surname": "Banovaz", //REQUIRED
        "email": "diego@strive.school", //REQUIRED
        "bio": "SW ENG",
        "title": "COO @ Strive School",
        "area": "Berlin",
        "image": ..., //server generated on upload, set a default here
        "username": "admin", //REQUIRED
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    }
*/


/* An instance of EXPERIENCE : 

    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        "role": "CTO",
        "company": "Strive School",
        "startDate": "2019-06-16T22:00:00.000Z",
        "endDate": "2019-06-16T22:00:00.000Z", //could be null
        "description": "Doing stuff here and there",
        "area": "Berlin",
        "username": "admin",
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
        "image": ... //server generated on upload, set a default here
    }

*/
const UserModel = new Schema({

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    experience: [{
        role : {type: String, required: true},
        company : {type: String, required: true},
        description : {type: String, required: true},
        area : {type: String, required: true},
        startDate : {type: Date, required: true},
        endDate : {type: Date},
        image: {type: String} 
    }],
    education: [{
        school : {type: String, required: true},
        fieldOfStudy : {type: String, required: true},
        activities : {type: String, required: true},
        description : {type: String, required: true},
        startDate : {type: Date, required: true},
        endDate : {type: Date},
        image: {type: String} 
    }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
}, {
    timestamps : true
});


export default model("User" , UserModel)