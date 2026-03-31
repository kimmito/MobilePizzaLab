import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator'

export class GetAnalyticsDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(365)
	rangeDays?: number

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	top?: number

	@IsOptional()
	@IsIn(['quantity', 'revenue', 'orders'])
	metric?: 'quantity' | 'revenue' | 'orders'
}
