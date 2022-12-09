import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: { type: String },
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "user"}
  },
  { timestamps: true }
);

export const Projects = mongoose.model("project", projectSchema);
