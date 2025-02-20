import { Request, Response } from 'express';
import { Router } from 'express';
import { CheckinService } from './checkin.service';
import { createCheckinSchema } from './dto/create-checkin.dto';
import { validateRequest } from '../../middleware/validate-request';

export class CheckinController {
  private checkinService: CheckinService;

  constructor() {
    this.checkinService = new CheckinService();
  }

  /**
   * Submit a daily check-in
   */
  public createCheckin = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = createCheckinSchema.parse(req.body);
      const userId = "default-user";

      const checkin = await this.checkinService.createCheckin(userId, validatedData);
      
      res.status(201).json({
        status: 'success',
        data: checkin
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'You have already submitted a check-in for today') {
          res.status(400).json({ 
            status: 'error',
            message: error.message 
          });
        } else {
          res.status(400).json({ 
            status: 'error',
            message: error.message 
          });
        }
      } else {
        res.status(500).json({ 
          status: 'error',
          message: 'Failed to create check-in'
        });
      }
    }
  };

  /**
   * Gets user's check-in for today
   */
  public getTodayCheckin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = "default-user";
      const checkin = await this.checkinService.getTodayCheckin(userId);
      
      if (!checkin) {
        res.status(404).json({
          status: 'error',
          message: 'No check-in found for today'
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: checkin
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: 'Failed to retrieve today\'s check-in'
      });
    }
  };
}

// Route setup
const router = Router();
const checkinController = new CheckinController();

router.post('/checkins', validateRequest(createCheckinSchema), checkinController.createCheckin);
router.get('/checkins/today', checkinController.getTodayCheckin);

export { router as checkinRouter }; 