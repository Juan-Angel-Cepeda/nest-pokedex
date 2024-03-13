import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isString } from 'class-validator';


@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }
    catch(error){
      
      if (error.code === 11000){
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error)
      throw new InternalServerErrorException('Cant create Pokemon - Check server logs')
    }
    
  }

  async findAll() {
    const pokemons  = await this.pokemonModel.find();
    return pokemons
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    //verificación por id
    if (!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no:term});
    }
    
    //verificación por uuid
    if ( isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
  
    //verificación por nombre
    if(!pokemon){
      term = term.toLowerCase()
      pokemon = await this.pokemonModel.findOne({name:term});
    }
    if (!pokemon ) throw new NotFoundException('Pokemon not found in database');
    return pokemon;
  
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
