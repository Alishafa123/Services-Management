import { Controller, Get, Post, Body, Query, Delete, Param, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async getProfiles(@Query('id') id?: string): Promise<Profile[] | Profile> {
    return id
      ? this.profilesService.getProfileById(id)
      : this.profilesService.getProfiles();
  }

  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string): Promise<void> {
    return this.profilesService.deleteProfile(id);
  }

  @Put(':id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return this.profilesService.updateProfile(id, updateProfileDto);
  }
}
