import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(articles: any[], sortBy: string): any[] {
    if (!articles) {
      return [];
    }
    return articles.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      } else if (a[sortBy] > b[sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
