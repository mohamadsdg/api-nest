import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class flavor extends Document{
  @Prop()
  name: string;
  @Prop([String])
  coffees: string[];
}

export const FlavorSchema = SchemaFactory.createForClass(flavor)
