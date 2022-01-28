
interface SanitizedActivity {
  id: number;
  name: string;
  startsAt: Date;
  endsAt: Date;
  rooms: number;
  place: any;
}

export default SanitizedActivity;
