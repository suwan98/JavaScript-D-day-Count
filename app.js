const Mcontainer = document.querySelector(".D-day-message");
Mcontainer.innerHTML = "<h2>D-Day를 입력해주세요</h2>";

const container = document.querySelector("#d-day-container");

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const countMaker = function () {
  const targetDateInput = dateFormMaker();
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const reMaining = (targetDate - nowDate) / 1000;
  if (reMaining <= 0) {
    Mcontainer.innerHTML = "<h3>타이머가 종료되었습니다</h3>";
    Mcontainer.style.display = "flex";
    return;
  } else if (isNaN(reMaining)) {
    container.style.display = "none";
    Mcontainer.innerHTML = "<h3>유효한 시간대가 아닙니다</h3>";
    Mcontainer.style.display = "flex";
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

  let i = 0;
  for (let tag of documentArr) {
    document.getElementById(tag).textContent = reMainingObj[timeKeys[i]];
    i++;
  }
};

const starter = () => {
  container.style.display = "flex";
  Mcontainer.style.display = "none";
  countMaker();
};
