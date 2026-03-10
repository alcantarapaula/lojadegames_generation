import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";


@Controller('/produtos')
export class ProdutoController{
  constructor(
    private readonly produtoService: ProdutoService
  ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]>{
    return this,this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Produto[]>{
    return this.produtoService.findAllByNome(nome);
  }

  // EXTRA 1

  @Get('preco_menor/:preco')
  @HttpCode(HttpStatus.OK)
  findAllByPrecoMenor(@Param('preco', ParseFloatPipe) preco: number): Promise<Produto[]>{
    return this, this.produtoService.findByPrecoMenor(preco)
  }

  // EXTRA 2
  
  @Get('preco_maior/:preco')
  @HttpCode(HttpStatus.OK)
  findAllByPrecoMaior(@Param('preco', ParseFloatPipe) preco: number): Promise<Produto[]>{
    return this, this.produtoService.findByPrecoMaior(preco)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto>{
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto>{
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.produtoService.delete(id);
  }
}