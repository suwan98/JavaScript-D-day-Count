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
  } else if (isNaN(reMaining)) {
    Mcontainer.innerHTML = "<h3>유효한 시간대가 아닙니다</h3>";
  }
  const reMainingDate = Math.floor(reMaining / 3600 / 24);
  const reMainingHours = Math.floor(reMaining / 3600) % 24;
  const reMainingMin = Math.floor(reMaining / 60) % 60;
  const reMainingSec = Math.floor(reMaining) % 60;

  const days = document.querySelector("#days");
  const hours = document.querySelector("#hours");
  const min = document.querySelector("#min");
  const sec = document.querySelector("#sec");

  days.textContent = reMainingDate;
  hours.textContent = reMainingHours;
  min.textContent = reMainingMin;
  sec.textContent = reMainingSec;
};
