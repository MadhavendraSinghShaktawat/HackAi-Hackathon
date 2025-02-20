import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from './checkin.entity';
import type { ICheckin } from './checkin.entity';

export class CheckinService {
  /**
   * Creates a new daily check-in
   * @param userId - The ID of the user
   * @param checkinData - The check-in data
   * @returns The created check-in entry
   */
  public async createCheckin(userId: string, checkinData: CreateCheckinDto): Promise<ICheckin> {
    // Check if user already has a check-in for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingCheckin = await Checkin.findOne({
      userId,
      createdAt: {
        $gte: today
      }
    }).exec();

    if (existingCheckin) {
      throw new Error('You have already submitted a check-in for today');
    }

    const checkin = new Checkin({
      userId,
      ...checkinData,
      createdAt: new Date()
    });

    return await checkin.save();
  }

  /**
   * Gets user's check-in for today
   * @param userId - The ID of the user
   * @returns Today's check-in or null if not found
   */
  public async getTodayCheckin(userId: string): Promise<ICheckin | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCheckin = await Checkin.findOne({
      userId,
      createdAt: {
        $gte: today
      }
    })
    .sort({ createdAt: -1 })
    .exec();

    return todayCheckin;
  }
} 