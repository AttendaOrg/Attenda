/* eslint-disable indent */
/* eslint-disable valid-jsdoc */
// const gen = () => Math.random().toString(36).substr(2, 5);

const reverse = (str: string) => {
  return str.split("").reverse().join("");
};

const now = (unit: "milli" | "micro" | "nano") => {
  const hrTime = process.hrtime();

  switch (unit) {
    case "milli":
      return hrTime[0] * 1000 + hrTime[1] / 1000000;

    case "micro":
      return hrTime[0] * 1000000 + hrTime[1] / 1000;

    case "nano":
    default:
      return hrTime[0] * 1000000000 + hrTime[1];
  }
};

/**
 * Usage:\
 *  str = RandomIdGenerator.encode(9007199254740989); // str = 'fE2XnNGpF'\
 *  id = RandomIdGenerator.decode('fE2XnNGpF'); // id = 9007199254740989;\
 *  id = RandomIdGenerator.generate(); // id = 'fE2XnNGpF'
 */
export class RandomIdGenerator {
  static index =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  static encode = (_number: number) => {
    if ("undefined" == typeof _number) {
      return null;
    } else if ("number" != typeof _number) {
      throw new Error("Wrong parameter type");
    }

    let ret = "";

    for (
      let i = Math.floor(
        Math.log(parseInt(_number.toString())) /
          Math.log(RandomIdGenerator.index.length)
      );
      i >= 0;
      i--
    ) {
      ret =
        ret +
        RandomIdGenerator.index.substr(
          Math.floor(
            parseInt(_number.toString()) /
              RandomIdGenerator.bcpow(RandomIdGenerator.index.length, i)
          ) % RandomIdGenerator.index.length,
          1
        );
    }

    return reverse(ret);
  };

  static decode = (_string: string) => {
    if ("undefined" == typeof _string) {
      return null;
    } else if ("string" != typeof _string) {
      throw new Error("Wrong parameter type");
    }

    const str = reverse(_string);
    let ret = 0;

    for (let i = 0; i <= str.length - 1; i++) {
      ret =
        ret +
        RandomIdGenerator.index.indexOf(str.substr(i, 1)) *
          RandomIdGenerator.bcpow(
            RandomIdGenerator.index.length,
            str.length - 1 - i
          );
    }

    return ret;
  };

  static bcpow = (_a: number, _b: number) => {
    return Math.floor(
      Math.pow(parseFloat(_a.toString()), parseInt(_b.toString()))
    );
  };

  static generate = () => RandomIdGenerator.encode(now("nano"));
}
// benchmark
// const s = new Set();
// const num = 100000;

// for (let i = 0; i < num; i++) {
// s.add(RandomIdGenerator.generate());
// }

// console.log(`${num} == ${s.size} ${[...s][0]}`);
