import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get(':userId')
  async getPricing(@Param('userId') userId: string) {
    return this.pricingService.getPricingByUserId(Number(userId));
  }

  @Put(':userId')
  async updatePricing(
    @Param('userId') userId: string,
    @Body() updatePricingDto: UpdatePricingDto,
  ) {
    return this.pricingService.updatePricing(Number(userId), updatePricingDto);
  }
}
