
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Activity from "./Activity";

@Entity("activitiesReservation")
export default class ActivityReservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    activityId: number;

    @ManyToOne(() => Activity, activity => activity.activities)
    activities: Activity;

    static async getActivitiesReservationByUserId(userId: number) {
      const activities = await this.find({ where: { userId } });
      return activities;
    }
}
