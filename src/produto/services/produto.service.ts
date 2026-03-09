import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

Injectable()
export class ProdutoService{
  constructor(

    @InjectRepository(Produto)
    private produtoRespository: Repository<Produto>,
    // private readonly categoriaService: CategoriaService
  ) {}

  async findAll(): Promise<Produto[]>{
    return this. produtoRespository.find()
  }

  async findById(id: number): Promise<Produto>{
    const produto = await this.produtoRespository.findOne({
      where:{id},
    })

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto
  }

  async findAllByNome(nome: string): Promise<Produto[]>{
    return this.produtoRespository.find({
      where:{
        nome: ILike(`%${nome}%`)
      }
    })
  }

  async create(produto: Produto): Promise<Produto>{
    return this.produtoRespository.save(produto);
  }

  async update(produto: Produto): Promise<Produto>{
    if(!produto || produto.id <= 0)
      throw new HttpException('O ID do produto é inválido', HttpStatus.BAD_REQUEST);

    await this.findById(produto.id);

    return this.produtoRespository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult>{
    await this.findById(id);

    return this.produtoRespository.delete(id);
  }
}