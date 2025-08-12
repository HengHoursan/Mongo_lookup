const mongoose = require("mongoose");

const bookCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided",
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   transform: function (doc, ret) {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
  }
);

bookCategorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("BookCategory", bookCategorySchema);
