import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { User } from '@prisma/client'
import { AnalyticsService } from './analytics.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { GetAnalyticsDto } from './dto/get-analytics.dto'

@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/admin/analytics')
	@Auth()
	getAnalytics(@CurrentUser() user: User, @Body() dto: GetAnalyticsDto) {
		return this.analyticsService.getAnalytics(user, dto)
	}
}
