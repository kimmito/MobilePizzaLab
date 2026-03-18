import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Put,
	UsePipes
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import {
	Delete,
	Post
} from '@nestjs/common/decorators/http/request-mapping.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return await this.categoryService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id', ParseIntPipe) id: number) {
		return await this.categoryService.byId(id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.categoryService.bySlug(slug)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: CategoryDto) {
		return await this.categoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: CategoryDto
	) {
		return await this.categoryService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id', ParseIntPipe) id: number) {
		return await this.categoryService.delete(id)
	}
}
