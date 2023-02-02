export const millisToHourMinuteSecond = (millis) => {
    const seconds = Math.floor(millis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return {
        hours: hours,
        minutes: minutes % 60,
        seconds: seconds % 60,
    };
}

export const hourMinuteSecondToMillis = (hms) => {   
    return hms.hh * 3600000 + hms.mm * 60000 + hms.ss * 1000;
}

export const postDatas = async (url, data) => {
    let resp = {};
    await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
       resp = data;
      })
      return resp;

}

export const getDatas = (setData, url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      });
  };
  