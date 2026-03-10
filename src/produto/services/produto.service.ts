import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "src/categoria/services/categoria.service";

Injectable()
export class ProdutoService{
  constructor(

    @InjectRepository(Produto)
    private produtoRespository: Repository<Produto>,
    private readonly categoriaService: CategoriaService
  ) {}

  async findAll(): Promise<Produto[]>{
    return this. produtoRespository.find({
      relations: {categoria: true}
    })
  }

  async findById(id: number): Promise<Produto>{
    const produto = await this.produtoRespository.findOne({
      where:{id},
      relations: {categoria: true}
    })

    if (!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

    return produto
  }

  async findAllByNome(nome: string): Promise<Produto[]>{
    return this.produtoRespository.find({
      where:{
        nome: ILike(`%${nome}%`)
      },
      relations: {categoria: true}
    })
  }


  // EXTRA 1

  async findByPrecoMenor(preco: number): Promise<Produto[]>{
    return this.produtoRespository.find({
      where: {
        preco: LessThanOrEqual(preco)
      },
      order: {
        preco: 'DESC'
      }
    })
  }

  // EXTRA 2

  async findByPrecoMaior(preco: number): Promise<Produto[]>{
    return this.produtoRespository.find({
      where: {
        preco: MoreThanOrEqual(preco)
      },
      order: {
        preco: 'ASC'
      }
    })
  }

  async create(produto: Produto): Promise<Produto>{

    await this.categoriaService.findById(produto.categoria.id); 
    return this.produtoRespository.save(produto);
  }

  async update(produto: Produto): Promise<Produto>{
    if(!produto || produto.id <= 0)
      throw new HttpException('O ID do produto é inválido', HttpStatus.BAD_REQUEST);

    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);

    return this.produtoRespository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult>{
    await this.findById(id);

    return this.produtoRespository.delete(id);
  }
}