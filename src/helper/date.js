export function getOtherDay(date, direction){
    const copy = new Date(date);
    copy.setHours(0,0,0,0);
    copy.setDate(copy.getDate() + direction);
    return copy;
}

export function getTimeFromString(time){
    const split = time.split(':');
    console.log('getTimeFromString', time,split, split[0] * 60 + split[1]);
    return Number(split[0]) * 60 + Number(split[1]);
  }