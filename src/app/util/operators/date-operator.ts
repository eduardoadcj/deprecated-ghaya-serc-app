export class DateOperator {
    
    public formatDate(date: string): string{
        date.replace('/', '');
        date.replace('-', '');
        return date.substr(0, 2) + '/' + date.substring(2,4) + '/' + date.substr(4);
    }

    public getDateByString(date: string): Date{
        let [day, month, year] = date.split('/');
        return new Date(year+'-'+month+'-'+day+' 00:00');
    }

    

}