
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Activity from "./Activity";
import User from "./User";

@Entity("activitiesReservation")
export default class ActivityReservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    activityId: number;

    @ManyToOne(() => Activity, activity => activity.activities)
    activity: Activity;

    @ManyToOne(() => User, user => user.activity)
    user: User;

    static async getActivitiesReservationByUserId(userId: number) {
      const activities = await this.find({ where: { userId } });
      return activities;
    }
}
