import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from "luxon";

@Pipe({
  name: 'toLocalDate'
})
export class ToLocalDatePipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    return DateTime.fromJSDate(new Date(value))
      .toFormat("yyyy-MM-dd'T'HH:mm:ss");
  }

}
