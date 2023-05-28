import mongoose, { Document } from 'mongoose';

// Define interface for the document
interface IUser extends Document {
  fullName: string;
  type: number;
  pass: string;
  email: string;
  phone: string;
  isActive: boolean;
  code: number;
  code_expires: number;
  token: string;
}

// Define the schema
const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    default:""
  },
  type: {
    type: Number,
    required: true
  },
  code: {
    type: Number,
    default:0
  },
  token: {
    type: String,
    default:""
  },
  code_expires: {
    type: Number,
    default:0
  },
  pass: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isActive: { type: Boolean, default: false },
  phone: {
    type: String,
    default: ""
  }
});
const INSTAND_USER_NAME = "users"

// Create the model
const INSTAND_USER = mongoose.model<IUser>(INSTAND_USER_NAME, userSchema);

export { INSTAND_USER_NAME,  INSTAND_USER}
