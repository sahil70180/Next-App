import mongoose, { Schema, Document } from "mongoose";

export interface IReviews extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IImage extends Document {
  public_id: string;
  url: string;
}
export interface ILocation extends Document {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakFast: boolean;
  isAirConditioned: boolean;
  isRoomCleaning: boolean;
  isPetsAllowed: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  reviews: IReviews[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter Room Name"],
    trim: true,
    maxLength: [200, "Room Length cannot exceed 200 characters."],
  },
  description: {
    type: String,
    required: [true, "Please Enter Room Description"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please Enter price per night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please Enter room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter no of beds"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakFast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  isPetsAllowed: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please enter correct category",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
