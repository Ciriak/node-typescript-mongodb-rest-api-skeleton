import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ICity extends Document {
  name: string;
}

const CitySchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
CitySchema.plugin(mongoosePaginate);
export default mongoose.model<ICity>('City', CitySchema);
