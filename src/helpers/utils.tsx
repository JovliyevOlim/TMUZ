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

// Diagramma uchun tayyor ma'lumotlarni chiqaruvchi funksiya
export function generateChartDataByCategory(data: Device[], categoryId: string): {
  stationSeries: SeriesData[];
  levelCrossingSeries: SeriesData[];
  peregonSeries: SeriesData[];
  xaxis: {
    stationCategories: string[];
    levelCrossingCategories: string[];
    peregonCategories: string[]
  };
} {
  const stationCounts: Record<string, { name: string; checked: number; unchecked: number }> = {};
  const levelCrossingCounts: Record<string, { name: string; checked: number; unchecked: number }> = {};
  const peregonCounts: Record<string, { name: string; checked: number; unchecked: number }> = {};

  // Kiritilgan categoryId bo‘yicha filtrlaymiz va tekshirilgan hamda tekshirilmaganlarni hisoblaymiz
  data
    .filter((item) => item.categoryId === categoryId)
    .forEach((item) => {
      const { stationId, stationName, levelCrossingId, levelCrossingName, peregonId, peregonName, check } = item;

      // Station uchun hisob
      if (stationId) {
        if (!stationCounts[stationId]) {
          stationCounts[stationId] = { name: stationName, checked: 0, unchecked: 0 };
        }
        if (check) {
          stationCounts[stationId].checked += 1;
        } else {
          stationCounts[stationId].unchecked += 1;
        }
      }

      // Level Crossing uchun hisob
      if (levelCrossingId && levelCrossingName) {
        if (!levelCrossingCounts[levelCrossingId]) {
          levelCrossingCounts[levelCrossingId] = { name: levelCrossingName, checked: 0, unchecked: 0 };
        }
        if (check) {
          levelCrossingCounts[levelCrossingId].checked += 1;
        } else {
          levelCrossingCounts[levelCrossingId].unchecked += 1;
        }
      }

      // Level Crossing uchun hisob
      if (peregonId && peregonName) {
        if (!peregonCounts[peregonId]) {
          peregonCounts[peregonId] = { name: peregonName, checked: 0, unchecked: 0 };
        }
        if (check) {
          peregonCounts[peregonId].checked += 1;
        } else {
          peregonCounts[peregonId].unchecked += 1;
        }
      }
    });

  // Station bo‘yicha `xaxis` va `series` ma'lumotlari
  const stationUncheckedData: number[] = [];
  const stationCheckedData: number[] = [];
  const stationCategories: string[] = [];

  Object.values(stationCounts).forEach((counts) => {
    stationCategories.push(counts.name);
    stationUncheckedData.push(counts.unchecked);
    stationCheckedData.push(counts.checked);
  });

  // Level Crossing bo‘yicha `xaxis` va `series` ma'lumotlari
  const levelCrossingUncheckedData: number[] = [];
  const levelCrossingCheckedData: number[] = [];
  const levelCrossingCategories: string[] = [];

  Object.values(levelCrossingCounts).forEach((counts) => {
    levelCrossingCategories.push(counts.name);
    levelCrossingUncheckedData.push(counts.unchecked);
    levelCrossingCheckedData.push(counts.checked);
  });

  // peregon bo‘yicha `xaxis` va `series` ma'lumotlari
  const peregonUncheckedData: number[] = [];
  const peregonCheckedData: number[] = [];
  const peregonCategories: string[] = [];

  Object.values(peregonCounts).forEach((counts) => {
    peregonCategories.push(counts.name);
    peregonUncheckedData.push(counts.unchecked);
    peregonCheckedData.push(counts.checked);
  });

  return {
    stationSeries: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: stationUncheckedData
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: stationCheckedData
      }
    ],
    levelCrossingSeries: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: levelCrossingUncheckedData
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: levelCrossingCheckedData
      }
    ],
    peregonSeries: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: peregonUncheckedData
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: peregonCheckedData
      }
    ],
    xaxis: {
      stationCategories,
      levelCrossingCategories,
      peregonCategories
    }
  };
}



