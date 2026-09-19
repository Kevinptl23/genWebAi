import mongoose from "mongoose";
import slugify from "slugify";

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

websiteSchema.pre("save", function () {
  if (!this.slug) {
    this.slug =
      slugify(this.title || "website", { lower: true, strict: true }) +
      "-" +
      Date.now();
  }
});

const Website = mongoose.model("Website", websiteSchema);

export default Website;