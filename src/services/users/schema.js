import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    google_id: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
    background_image: {
      type: String,
    },
    username: {
      type: String,
    },
    experience: [
      {
        role: { type: String, required: true },
        company: { type: String, required: true },
        description: { type: String, required: true },
        area: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        image: { type: String },
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        activities: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        image: { type: String },
      },
    ],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.static("createInstance", async function (attr, params, body) {
  const id = params.userId;
  console.log(id);
  const user = await this.findById(id);
  if (user) {
    const addInstance = await this.findByIdAndUpdate(
      id,
      { $push: { [attr]: [body] } },
      { new: true }
    );
    console.log(addInstance);
    return addInstance;
  } else {
    return false;
  }
});

//attrId is the experienceId OR educationId
UserSchema.static("getInstance", async function (attr, params, body, attrId) {
  const id = params.userId;

  console.log(id);
  //checks for a user
  const user = await this.findById(id);

  //gets instance of experience
  if (user && attr === "experience") {
    const foundInstance = user.experience.find(
      (exp) => exp._id.toString() === attrId
    );
    console.log(foundInstance);
    if (foundInstance) {
      return foundInstance;
    } else {
      return false;
    }

    //gets instance of education
  } else if (user && attr === "education") {
    const foundInstance = user.education.find(
      (exp) => exp._id.toString() === attrId
    );
    console.log(foundInstance);
    if (foundInstance) {
      return foundInstance;
    } else {
      return false;
    }
    //RETURNS FALSE IF NEITHER EDUCATION OR EXPERIENCE
  } else {
    return false;
  }
});

export default model("User", UserSchema);
