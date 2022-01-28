import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Place from "./Place";
import DateHelper from "../helpers/DateHelper";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startsAt: Date;

  @Column()
  endsAt: Date;

  @Column()
  rooms: number;

  @Column()
  placeId: number;

  @OneToOne(() => Place, { eager: true })
  @JoinColumn()
  place: Place;

  static async getDates(): Promise<string[]> {
    const activities: Activity[] = await this.find();

    const days: any[] = [];
    const hashTable: any = {};

    activities.forEach(({ startsAt }) => {
      const date = DateHelper.getDate(startsAt);

      if (!hashTable[date]) {
        hashTable[date] = true;
        days.push(date);
      }
    });

    return days;
  }

  static async getActivitiesByDate(date: Date) {
    return this.find();
  }
}
