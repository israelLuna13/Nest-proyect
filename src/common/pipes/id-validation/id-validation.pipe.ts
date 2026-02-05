import { BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';

//nuestro propio pipe y  reescribimos su constructor
@Injectable()
export class IdValidationPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('Invalid ID'),
    });
  }
}
