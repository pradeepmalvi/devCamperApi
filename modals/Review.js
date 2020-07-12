const mongoose = require("mongoose");
const slugify = require("slugify");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add rating between 1 to 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// // Static method to get avg of course tuitions
// ReviewSchema.static.getAverageCost = async function () {
//   console.log("Calculating avg cost");

//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId },
//     },
//     {
//       $group: {
//         _id: "$bootcamp",
//         averageCost: { $avg: "$tuition" },
//       },
//     },
//   ]);

//   try {
//     await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
//       averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Call getAverageCost after save
// ReviewSchema.post("save", function () {
//   this.constructor.getAverageCost(this.bootcamp);
// });

// // Call getAverageCost before remove
// ReviewSchema.pre("remove", function () {
//   this.constructor.getAverageCost(this.bootcamp);
// });

module.exports = mongoose.model("Course", ReviewSchema);
