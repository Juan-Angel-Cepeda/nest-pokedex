//representaicón de los modelos de bases de datos
//tablas, etc.
//Usando mongo esto es una coleccion
import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

//Si listamos

@Schema()
export class Pokemon extends Document{
    
    @Prop({
        unique:true,
        index:true,
    })
    name:string;

    @Prop({
        unique:true,
        index:true,
    })
    no:number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );