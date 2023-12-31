import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAddressDto: CreateAddressDto, @Request() req) {
    return this.addressService.create(createAddressDto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') user_id: string) {
    return this.addressService.findByUser(user_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('')
  async update(@Body() updateAddressDto: UpdateAddressDto, @Request() req) {
    const user = await this.addressService.findByUser(req.user.id);
    return this.addressService.update(updateAddressDto, user.id);
  }
}
