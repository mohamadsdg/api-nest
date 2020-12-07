import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsIntPipeCustom implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log('ParsIntPipe')
    const val = parseInt(value,10)
    if (isNaN(val)){
      throw new BadRequestException(`validate failed. ${val} is not a integer`)
    }
    return val;
  }
}
