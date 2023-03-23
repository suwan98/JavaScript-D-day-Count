const Mcontainer = document.querySelector(".D-day-message");
Mcontainer.innerHTML = "<h2>D-Day를 입력해주세요</h2>";
const intervalIDArr = [];
const savedData = localStorage.getItem("saved-date");
const container = document.querySelector("#d-day-container");

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const countMaker = function (data) {
  if (data != savedData) {
    localStorage.setItem("saved-date", data);
  }

  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const reMaining = (targetDate - nowDate) / 1000;
  if (reMaining <= 0) {
    Mcontainer.innerHTML = "<h3>타이머가 종료되었습니다</h3>";
    Mcontainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(reMaining)) {
    container.style.display = "none";
    Mcontainer.innerHTML = "<h3>유효한 시간대가 아닙니다</h3>";
    Mcontainer.style.display = "flex";
    setClearInterval();

    return;
  }

  const reMainingObj = {
    reMainingDate: Math.floor(reMaining / 3600 / 24),
    reMainingHours: Math.floor(reMaining / 3600) % 24,
    reMainingMin: Math.floor(reMaining / 60) % 60,
    reMainingSec: Math.floor(reMaining) % 60,
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(reMainingObj);

  const format = (time) => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const reMainingTime = format(reMainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = reMainingTime;
    i++;
  }
};

const starter = (targetDateInput) => {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex";
  Mcontainer.style.display = "none";
  setClearInterval();
  countMaker(targetDateInput);
  const intervalID = setInterval(() => {
    countMaker(targetDateInput);
  }, 1000);
  intervalIDArr.push(intervalID);
};

const setClearInterval = () => {
  for (let i = 0; i < intervalIDArr.length; i++) {
    clearInterval(intervalIDArr[i]);
  }
};

const resetTimer = () => {
  container.style.display = "none";
  localStorage.removeItem("saved-date");
  Mcontainer.innerHTML = "<h2>D-Day를 입력해주세요</h2>";
  Mcontainer.style.display = "flex";
  setClearInterval();
};

if (savedData) {
  starter(savedData);
} else {
  container.style.display = "none";
  Mcontainer.innerHTML = "<h2>D-Day를 입력해주세요</h2>";
  Mcontainer.style.display = "flex";
}
