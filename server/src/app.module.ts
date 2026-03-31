import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { OrderModule } from './order/order.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		CategoryModule,
		UserModule,
		ProductModule,
		OrderModule,
		AnalyticsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
