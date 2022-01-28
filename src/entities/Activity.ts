import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Between } from "typeorm";
import Place from "./Place";
import DateHelper from "../helpers/DateHelper";
import SanitizedActivity from "../interfaces/activity";

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

  static separate(activities: Activity[]) {
    const separatedActivities: any = [];
    const hashTable: any = {};
    let placesCounter = 0;

    activities.forEach(({ id, name, startsAt, endsAt, rooms, place }, i) => {
      let placeIndex = hashTable[place.name];
      if (placeIndex === undefined) {
        hashTable[place.name] = placesCounter;
        placeIndex = placesCounter;
        placesCounter++;
        separatedActivities.push({
          name: place.name,
          activities: []
        });
      }

      separatedActivities[placeIndex].activities.push({
        id,
        name,
        startsAt: DateHelper.getHour(startsAt),
        endsAt: DateHelper.getHour(endsAt),
        rooms,
      });
    });

    return separatedActivities; 
  } 

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

  static async getActivitiesByDate(date: string): Promise<SanitizedActivity[]> {
    const activities: Activity[] = await this.find({
      where: {
        startsAt: Between(DateHelper.startOfDay(date), DateHelper.endOfDay(date))
      }
    }
    );
    return this.separate(activities);
  }
}
