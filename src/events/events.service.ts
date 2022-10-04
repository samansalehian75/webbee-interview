import { Repository } from 'typeorm';
import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Workshop } from './entities/workshop.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private workshopRepositiry: Repository<Workshop>,
  ) {}

  getWarmupEvents() {
    return this.eventRepository.find();
  }

  @Get('events')
  async getEventsWithWorkshops() {
    const events = await this.eventRepository.find()

    return Promise.all(
      events.map(async (event) => {
        const result = [];
        const workshops = await this.workshopRepositiry
          .createQueryBuilder('workshop')
          .select('*')
          .innerJoin('event', 'event', 'event.id = workshop.eventId')
          .where('workshop.eventId = :eventId', {
            eventId: event.id,
          })
          .getRawMany();

        result.push({
          ...event,
          workshops: workshops,
        });
      }),
    );
  }

  
  @Get('futureevents')
  async getFutureEventWithWorkshops() {
    const events = await this.eventRepository.find()

    return Promise.all(
      events.map(async (event) => {
        const result = [];
        const workshops = await this.workshopRepositiry
          .createQueryBuilder('workshop')
          .select('*')
          .innerJoin('event', 'event', 'event.id = workshop.eventId')
          .where('workshop.eventId = :eventId', {
            eventId: event.id,
          })
          .andWhere('workshop.start > :today', {
            today: Date.now()
          })
          .getRawMany();

        result.push({
          ...event,
          workshops: workshops,
        });
      }),
    );
  }
}
