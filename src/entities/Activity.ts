import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Between } from "typeorm";
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

  static async separate(activities: Activity[]) {
    const places: Place[] = await Place.getPlaces();
    const separatedActivities: any = [];
    const hashTable: any = {};

    places.forEach(({ name }, i) => {
      hashTable[name] = i;
      separatedActivities.push({ 
        name,
        activities: []
      });
    });

    activities.forEach(({ id, name, startsAt, endsAt, rooms, place }) => {
      const placeIndex = hashTable[place.name];

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
        days.push(date.replace(/\//g, "-"));
      }
    });

    return days;
  }

  static async getActivitiesByDate(date: string) {
    const activities: Activity[] = await this.find({
      where: {
        startsAt: Between(DateHelper.startOfDay(date), DateHelper.endOfDay(date))
      }
    }
    );
    return this.separate(activities);
  }
}
