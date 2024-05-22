import Image from "next/image";

export function Weather({ temp, iconID, weather, feelsLike, forecast }) {
  return (
    <div className="text-white bg-slate-900 w-fit m-auto px-24 py-12 text-center rounded-3xl">
      <div className="text-4xl font-semibold mb-2">Погода в Тюмени</div>
      <div className="text-xl text-yellow-400 italic mb-6">сейчас</div>
      <CurrentWeather
        temp={addPlus(temp)}
        iconID={iconID}
        weather={weather}
        feelsLike={addPlus(feelsLike)}
      />
      <div className="flex gap-3 justify-center">
        {forecast.map((item, index) => {
          return (
            <ForecastItem
              iconID={item.iconID}
              temp={addPlus(item.temp)}
              dateTime={item.dateTime}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export function CurrentWeather({ temp, iconID, weather, feelsLike }) {
  return (
    <div className="bg-slate-800 w-full py-16 rounded-2xl mx-auto mb-6">
      <div className="flex items-center justify-center mb-3">
        {iconID && (
          <Image
            src={`https://openweathermap.org/img/wn/${iconID}@2x.png`}
            width={100}
            height={100}
            alt="иконка погоды"
          ></Image>
        )}
        <div className="text-7xl font-semibold">{temp && temp + "°"}</div>
      </div>
      <div className="font-semibold text-3xl">{weather}</div>
      <div className="">{feelsLike && "ощущается как " + feelsLike + "°"}</div>
    </div>
  );
}

export function ForecastItem({ iconID, temp, dateTime }) {
  return (
    <div className="bg-slate-800 px-6 py-3 rounded-lg">
      <div className="flex items-center justify-center">
        {iconID && (
          <Image
            src={`https://openweathermap.org/img/wn/${iconID}@2x.png`}
            width={50}
            height={50}
            alt="иконка погоды"
          ></Image>
        )}
        <div className="font-semibold">{temp && temp + "°"}</div>
      </div>
      <div className="text-sm text-yellow-400"> {dateTime}</div>
    </div>
  );
}

function addPlus(temp) {
  if (temp > 0) {
    temp = "+" + temp;
  }
  return temp;
}
