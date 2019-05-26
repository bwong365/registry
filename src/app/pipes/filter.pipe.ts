import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, prop1: string, prop2: string): any {
    if (value.length === 0 || filterString === undefined || filterString === '') {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if ((item[prop1] as string).toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        || (item[prop2] as string).toLowerCase().indexOf(filterString.toLowerCase()) !== -1) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
