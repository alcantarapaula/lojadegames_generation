import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsNumber, IsPositive, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_produtos'})
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: 'O nome é obrigatório'})
  @Length(5, 100, {message: 'O nome deve ter entre 5 e 100 caracteres'})
  @Column({length: 100, nullable: false})
  nome: string;

  @IsNumber({maxDecimalPlaces: 2})
  @IsPositive()
  @IsNotEmpty({message: 'O preço é obrigatório'})
  @Column({type: 'decimal', precision: 6, scale: 2})
  preco: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @Length(10, 255)
  @Column({length: 255})
  foto: string;

  // Fazer link categorias

}