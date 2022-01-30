import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Between, OneToMany } from "typeorm";
import Place from "./Place";
import DateHelper from "../helpers/DateHelper";
import ActivityReservation from "./ActivityReservation";
import UnprocessableEntityError from "@/errors/UnprocessableEntityError";
import ConflictError from "@/errors/ConflictError";

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

  @Column({ unique: false })
  placeId: number;

  @ManyToOne(() => Place, { eager: true })
  @JoinColumn()
  place: Place;

  @OneToMany(
    () => ActivityReservation,
    activityReservation => activityReservation.activity
  )
  activities: ActivityReservation;

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
        days.push(date);
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

  static verifyConflict(activity: Activity, activities: ActivityReservation[]) {
    for(let i = 0; i < activities.length; ++i) {
      const actual = activities[i];
      if(actual.activity.startsAt.toDateString() === activity.startsAt.toDateString()) {
        if((actual.activity.startsAt >= activity.startsAt && actual.activity.startsAt < activity.endsAt) ||
        (actual.activity.startsAt >= activity.startsAt && actual.activity.endsAt <= activity.endsAt) ||
        (actual.activity.startsAt <= activity.startsAt && actual.activity.endsAt >= activity.endsAt) ||
        (actual.activity.endsAt > activity.startsAt && actual.activity.endsAt < activity.endsAt)) {
          throw new ConflictError("Usuário já está inscrito em uma atividade no mesmo horário");
        } 
      }
    }
  }

  static async subscribe(userId: number, activityId: number) {
    const activity = await this.findOne({ where: { id: activityId } });

    if(!activity) {
      throw new UnprocessableEntityError("Atividade inexistente");
    }

    if(activity.rooms === 0) {
      throw new UnprocessableEntityError("Não há vagas para está Atividade");
    }

    const userActivities = await ActivityReservation.findOne({ where: { userId, activityId: activityId } });
    if(userActivities) {
      throw new UnprocessableEntityError("Usuário já está inscrito nessa atividade");
    }

    const allActivities = await ActivityReservation.find({ where: { userId }, relations: ["activity"] });
    this.verifyConflict(activity, allActivities);
    activity.rooms -= 1;
    await activity.save();
    await ActivityReservation.insert({ userId, activityId });
  }
}
