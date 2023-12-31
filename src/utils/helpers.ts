import { Coache } from "stores/modules/coaches/state";

export class AppHelper {
  /**
   * Text To TitleCase
   * @param   { String | Number | Date} str string text input
   * @returns { String | Boolean | Number } string text to TitleCase
   */

  static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static configExpiresInFierBase(expiresIn: string) {
    return new Date().getTime() + +Number(expiresIn) * 1000;
  }

  static validateExpiresInFierBase(expiresIn: number) {
    if (!expiresIn) return false;
    const timer = +expiresIn - new Date().getTime();
    if (timer < 0) return false;
    return true;
  }

  static hasEmptyValues(obj: any, areas: string[]): boolean {
    if (!areas.length) return false;
    for (const key in obj) {
      if (key !== "areas") {
        if ((typeof obj[key] === "string" && obj[key] === "") || (typeof obj[key] === "number" && obj[key] === 0)) {
          return false;
        }
      }
    }
    return true;
  }

  static hasCoacheUpdate(obj1: Coache, obj2: Coache) {
    const result = { ...obj1 };
    for (const key in obj2) {
      if (obj1.hasOwnProperty(key) && obj1[key] === obj2[key]) {
        delete result[key];
      }
    }
    return result;
  }

  static hasAreasUpdate(a: string[], b: string[]) {
    if (a === b) {
      return null;
    } else {
      return b;
    }
  }

  static validRouterLeave(obj: any): boolean {
    for (const key in obj) {
      if (
        (typeof obj[key] === "string" && obj[key] !== "") ||
        (typeof obj[key] === "number" && obj[key] > 0) ||
        (Array.isArray(obj[key]) && obj[key].length)
      ) {
        return false;
      }
    }
    return true;
  }

  static clearEmtyInObject(obj: any) {
    for (const key in obj) {
      if (key === "areas") {
        obj[key] = [];
      }
      if (key === "rate") {
        obj[key] = 0;
      }
      obj[key] = "";
    }
    return;
  }

  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static randomeId(): number {
    return Math.floor(Math.random() * Date.now());
  }

  static getFirstLastName(fullName: string): any {
    const name: string[] = fullName.split(/(?:\/)([^#]+)(?=#*)/);
    return {
      firstName: name[1],
      lastName: name[0],
    };
  }

  static getCurrentTimeAndDate(times: Date): string {
    const today = new Date(times);
    const day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
    const month = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
    const year = today.getFullYear();
    const date = " Day: " + day + " Month: " + month + " Year: " + year;
    const minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const dateTime = time + ", " + date;
    return dateTime;
  }

  static convertStringToDate(date: string) {
    if (!date) return "";
    const convert = date.split("/").reverse().join("-");
    return convert;
  }
}
