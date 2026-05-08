import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const websiteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "Untitled Website",
      trim: true,
    },

    latestCode: {
      type: String,
      default: "",
      required: true
    },

    conversation: [messageSchema],

    deployed: {
      type: Boolean,
      default: false,
    },

    deployUrl: {
      type: String
    },

    slug: {
      type: String,
      unique: true
    },
  },
  { timestamps: true }
);

const Website = mongoose.model("Website", websiteSchema);

websiteSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug =
      slugify(this.name, { lower: true, strict: true }) +
      "-" +
      Date.now();
  }
  next();
});

export default Website;