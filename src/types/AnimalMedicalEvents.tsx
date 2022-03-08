export interface MedicalEvents {
  date: string;
  report: string;
  eventsStatus: EventsStatus;
  eventsType: EventsTypes;
}

export interface EventsTypes {
  label: string;
  value: string;
}

export interface EventsStatus {
  label: string;
  value: string;
}


