import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tb_categorias'})
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty({message: 'O nome da categoria é obrigatório'})
  @Length(2, 255, {message: 'A categoria deve ter entre 2 e 255 caracteres'})
  @Column({length: 255, nullable: false})
 nome: string;

 @OneToMany(() => Produto, (produto) => produto.categoria)
 produto: Produto[];
}