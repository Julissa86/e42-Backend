import { Schema, Types, model, Model } from "mongoose";
import mongooseDelete from "mongoose-delete";

// Esquema principal para el usuario y su información de pago
const InfoSchema = new Schema<any>(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Plugin para soft delete
InfoSchema.plugin(mongooseDelete, { overrideMethods: "all" });

// Método estático para obtener todos los datos
InfoSchema.statics.findAllData = function() {
  return this.find({});
};

const TrackModel = model('storages', InfoSchema);
export default TrackModel;
