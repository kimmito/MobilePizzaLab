import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import {
	Delete,
	Post
} from '@nestjs/common/decorators/http/request-mapping.decorator'
import { ProductService } from './product.service'
import { ProductDto } from './dto/product.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return await this.productService.getAll(searchTerm)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.productService.bySlug(slug)
	}

	@Get('by-category/:slug')
	async getByCategory(@Param('slug') slug: string) {
		return await this.productService.byCategory(slug)
	}

	@HttpCode(200)
	@Post()
	@UsePipes(new ValidationPipe())
	@Auth()
	async create(@Body() dto: ProductDto) {
		return await this.productService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto) {
		return await this.productService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id', ParseIntPipe) id: number) {
		return await this.productService.delete(id)
	}
}
