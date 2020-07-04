const mongoose = require("mongoose");
const slugify = require("slugify");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can be more than 50 character"],
    },
    slug: String,
    description: {
      type: "string",
      required: [true, "Please add a description"],
      maxlength: [50, "Name can be more than 50 character"],
    },
    website: {
      type: String,
      //   match:[
      //       /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
      //   /, "Please use valid URL with HTTP or HTTPS"
      // ]
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can be longer than 50 characters"],
    },
    email: {
      type: String,
      match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please add valid email"],
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    career: {
      type: [String],
      required: [true, "Please add a career"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-phone.jpg",
    },
    housing: Boolean,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create bootcamp slug from the name

BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Reverse populate with virtuals
BootcampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
});

// Cascade delete course when a bootcamp is deleted
BootcampSchema.pre("remove", async function (next) {
  await this.model("Course").deleteMany({ bootcamp: this._id });
  next();
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
