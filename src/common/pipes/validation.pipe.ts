import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  // TODO: validation pipe 완성
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    return value;
  }
}
