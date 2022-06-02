export interface AnimalMedicalEvents {
  date: string;
  report: string;
  eventsStatus: EventsStatus;
  eventsType: EventsTypes;
  files?: Array<AnimalMedicalEventsFiles>
}

export interface EventsTypes {
  label: string;
  value: string;
}

export interface EventsStatus {
  label: string;
  value: string;
}

export interface AnimalMedicalEventsFiles {
  file: string,
  function: string,
  label: string,
  name: string,
  updatedAt: string
}