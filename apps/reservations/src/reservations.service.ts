import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}
  async create(createReservationDto: CreateReservationDto, userId: string) {
    return await this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: userId,
    });
  }
  findAll() {
    return this.reservationRepository.find({});
  }
  findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }
  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }
  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
