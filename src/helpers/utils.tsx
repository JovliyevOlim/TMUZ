// Ma'lumotlar turini aniqlaymiz
interface Device {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  check: boolean;
  stationId: string;
  stationName: string;
  levelCrossingId: string | null;
  levelCrossingName: string | null;
  peregonName: string | null,
  peregonId: string | null
}

// Series formatida qaytarish uchun natija turi
interface SeriesData {
  name: string;
  data: number[];
}

export function generateChartDataByCategory(data: Device[], categoryId: string, stationCategories: any) {
  const stationCounts: Record<string, {
    id: string;
    name: string;
    checked: number;
    unchecked: number;
    checkedDevices: string[]; // ✅ Separate for checked devices
    uncheckedDevices: string[]; // ✅ Separate for unchecked devices
  }> = {};

  console.log(categoryId);
  // ✅ Initialize stationCounts with 0 values and empty device lists
  stationCategories.forEach(({ id, name }) => {
    stationCounts[id] = { id, name, checked: 0, unchecked: 0, checkedDevices: [], uncheckedDevices: [] };
  });

  // ✅ Process each device and update counts & names
  data
    .filter((item) => item.categoryId === categoryId)
    .forEach((item) => {
      const { stationId, check, name } = item;

      if (stationId && stationCounts[stationId]) {
        if (check) {
          stationCounts[stationId].checked++;
          stationCounts[stationId].checkedDevices.push(name);
        } else {
          stationCounts[stationId].unchecked++;
          stationCounts[stationId].uncheckedDevices.push(name);
        }
      }
    });

  // ✅ Separate `deviceNames` for checked & unchecked
  const deviceNames: Record<string, { checked: string[]; unchecked: string[] }> = {};

  Object.values(stationCounts).forEach(({ name, checkedDevices, uncheckedDevices }) => {
    deviceNames[name] = { checked: checkedDevices, unchecked: uncheckedDevices };
  });

  return {
    stationSeries: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: Object.values(stationCounts).map(v => v.unchecked) // ✅ Only numbers
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: Object.values(stationCounts).map(v => v.checked) // ✅ Only numbers
      }
    ],
    xaxis: {
      stationCategories: Object.values(stationCounts).map(v => v.name)
    },
    deviceNames // ✅ Now contains separate checked & unchecked lists
  };
}


export function generateChartDataByCategoryLevelCrossing(data: Device[], categoryId: string, levelCrossingCategories: any) {
  const levelCrossingCounts: Record<string, {
    id: string;
    name: string;
    checked: number;
    unchecked: number;
    checkedDevices: string[]; // ✅ Ko'rikdan o'tkazilgan qurilmalar
    uncheckedDevices: string[]; // ✅ Ko'rikdan o'tkazilmagan qurilmalar
  }> = {};

  console.log(categoryId);
  // ✅ levelCrossingCounts ni 0 qiymatlar va bo'sh ro'yxatlar bilan boshlash
  levelCrossingCategories.forEach(({ id, name }) => {
    levelCrossingCounts[id] = { id, name, checked: 0, unchecked: 0, checkedDevices: [], uncheckedDevices: [] };
  });

  // ✅ Har bir qurilmani ko'rib chiqib, hisoblarni va ro'yxatlarni yangilash
  data
    .filter((item) => item.categoryId === categoryId)
    .forEach((item) => {
      const { levelCrossingId, check, name } = item;

      if (levelCrossingId && levelCrossingCounts[levelCrossingId]) {
        if (check) {
          levelCrossingCounts[levelCrossingId].checked++;
          levelCrossingCounts[levelCrossingId].checkedDevices.push(name);
        } else {
          levelCrossingCounts[levelCrossingId].unchecked++;
          levelCrossingCounts[levelCrossingId].uncheckedDevices.push(name);
        }
      }
    });

  // ✅ `deviceNames`ni tekshirilgan va tekshirilmagan ro'yxatlar bilan ajratish
  const deviceNames: Record<string, { checked: string[]; unchecked: string[] }> = {};

  Object.values(levelCrossingCounts).forEach(({ name, checkedDevices, uncheckedDevices }) => {
    deviceNames[name] = { checked: checkedDevices, unchecked: uncheckedDevices };
  });

  return {
    levelCrossingSeries: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: Object.values(levelCrossingCounts).map(v => v.unchecked) // ✅ Faqat sonlar
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: Object.values(levelCrossingCounts).map(v => v.checked) // ✅ Faqat sonlar
      }
    ],
    xaxis: {
      levelCrossingCategories: Object.values(levelCrossingCounts).map(v => v.name)
    },
    deviceNames // ✅ Tekshirilgan va tekshirilmagan ro'yxatlar
  };
}

export function generateChartDataByCategoryPeregon(data: Device[], categoryId: string, peregonCategories: any) {
  const peregonCounts: Record<string, {
    id: string;
    name: string;
    checked: number;
    unchecked: number;
    checkedDevices: string[]; // ✅ Ko'rikdan o'tkazilgan qurilmalar
    uncheckedDevices: string[]; // ✅ Ko'rikdan o'tkazilmagan qurilmalar
  }> = {};

  console.log(categoryId);
  // ✅ peregonCounts ni 0 qiymatlar va bo'sh ro'yxatlar bilan boshlash
  peregonCategories.forEach(({ id, name }) => {
    peregonCounts[id] = { id, name, checked: 0, unchecked: 0, checkedDevices: [], uncheckedDevices: [] };
  });

  // ✅ Har bir qurilmani ko'rib chiqib, hisoblarni va ro'yxatlarni yangilash
  data
    .filter((item) => item.categoryId === categoryId)
    .forEach((item) => {
      const { peregonId, check, name } = item;

      if (peregonId && peregonCounts[peregonId]) {
        if (check) {
          peregonCounts[peregonId].checked++;
          peregonCounts[peregonId].checkedDevices.push(name);
        } else {
          peregonCounts[peregonId].unchecked++;
          peregonCounts[peregonId].uncheckedDevices.push(name);
        }
      }
    });

  // ✅ `deviceNames`ni tekshirilgan va tekshirilmagan ro'yxatlar bilan ajratish
  const deviceNames: Record<string, { checked: string[]; unchecked: string[] }> = {};

  Object.values(peregonCounts).forEach(({ name, checkedDevices, uncheckedDevices }) => {
    deviceNames[name] = { checked: checkedDevices, unchecked: uncheckedDevices };
  });

  return {
    peregonSeries: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: Object.values(peregonCounts).map(v => v.unchecked) // ✅ Faqat sonlar
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: Object.values(peregonCounts).map(v => v.checked) // ✅ Faqat sonlar
      }
    ],
    xaxis: {
      peregonCategories: Object.values(peregonCounts).map(v => v.name)
    },
    deviceNames // ✅ Tekshirilgan va tekshirilmagan ro'yxatlar
  };
}


export const checkPermission = (userPermissions: any, checkPermissions: any) => {
  return checkPermissions.some((perm: any) => userPermissions.includes(perm));
};

