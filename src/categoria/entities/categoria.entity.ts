import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_categorias'})
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: 'O nome da categoria é obrigatório'})
  @Length(5, 255, {message: 'A categoria deve ter entre 5 e 255 caracteres'})
  @Column({length: 255, nullable: false})
 nome: string;
}