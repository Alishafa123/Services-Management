import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  async getProfiles(): Promise<Profile[]> {
    return await Profile.findAll<Profile>({ include: { all: true } });
  }

  async getProfileById(id: string): Promise<Profile> {
    const profile = await Profile.findByPk<Profile>(id, { include: { all: true } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return await Profile.create<Profile>({
      userId: createProfileDto.userId,
      phone: createProfileDto.phone,
      address: createProfileDto.address,
      dob: createProfileDto.dob,
    } as Profile);
  }

  async deleteProfile(id: string): Promise<void> {
    const deleted = await Profile.destroy<Profile>({ where: { id } });
    if (!deleted) {
      throw new NotFoundException('Profile not found');
    }
  }

  async updateProfile(id: string, updateProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await Profile.findByPk<Profile>(id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return await profile.update({
      userId: updateProfileDto.userId,
      phone: updateProfileDto.phone,
      address: updateProfileDto.address,
      dob: updateProfileDto.dob,
    });
  }
}
