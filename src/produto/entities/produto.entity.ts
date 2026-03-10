import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsNumber, IsPositive, Length } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { NumericTransformer } from "src/util/numerictransformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_produtos'})
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: 'O nome é obrigatório'})
  @Length(2, 100, {message: 'O nome deve ter entre 2 e 100 caracteres'})
  @Column({length: 100, nullable: false})
  nome: string;

  @IsNumber({maxDecimalPlaces: 2})
  @IsPositive()
  @IsNotEmpty({message: 'O preço é obrigatório'})
  @Column({type: 'decimal', precision: 6, scale: 2, transformer: new NumericTransformer()})
  preco: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @Length(10, 255)
  @Column({length: 255})
  foto: string;

  // Fazer link categorias
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE'
  })

  categoria: Categoria;

}