const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,

      required: [true, "Author name is required"],

      trim: true,
    },
  },

  { toJSON: { virtuals: true } }
);

authorSchema.virtual("books", {
  ref: "Book",

  localField: "_id",

  foreignField: "author",

  justOne: false,
});
const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
