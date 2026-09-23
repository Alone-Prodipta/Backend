import mongoose, {Aggregate, Schema, SchemaTypes} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const vedioSchema = new Schema(
    {
        vediofile:{
            type:String, //cloudinary url
            required: true,
        },
        thumbnail:{
            type: String,
            required: true,
        },
         title:{
            type: String,
            required: true,
        },
         description:{
            type: String,
            required: true,
        },
         time:{
            type: String,
            required: true,
        },
        duration:{
             
            type: Number,
            required: true,
        },
        views:{
            type: Number,
            default: 0,
        },
        ispublished:{
            type: Boolean,
            default: true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref: "user",
        },

    },{timestamps:true}
);
vedioSchema.plugin(mongooseAggregatePaginate);
export const Video= new mongoose.model("Video",vedioSchema);