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

export function generateChartDataByCategory(data: Device[], categoryId: string) {
  const stationCounts: Record<string, { name: string; checked: number; unchecked: number; devices: string[] }> = {};
  const levelCrossingCounts: Record<string, { name: string; checked: number; unchecked: number; devices: string[] }> = {};
  const peregonCounts: Record<string, { name: string; checked: number; unchecked: number; devices: string[] }> = {};

  data
    .filter((item) => item.categoryId === categoryId)
    .forEach((item) => {
      const { stationId, stationName, levelCrossingId, levelCrossingName, peregonId, peregonName, check, deviceName } = item;

      if (stationId) {
        if (!stationCounts[stationId]) {
          stationCounts[stationId] = { name: stationName, checked: 0, unchecked: 0, devices: [] };
        }
        stationCounts[stationId].devices.push(deviceName);
        check ? stationCounts[stationId].checked++ : stationCounts[stationId].unchecked++;
      }

      if (levelCrossingId) {
        if (!levelCrossingCounts[levelCrossingId]) {
          levelCrossingCounts[levelCrossingId] = { name: levelCrossingName, checked: 0, unchecked: 0, devices: [] };
        }
        levelCrossingCounts[levelCrossingId].devices.push(deviceName);
        check ? levelCrossingCounts[levelCrossingId].checked++ : levelCrossingCounts[levelCrossingId].unchecked++;
      }

      if (peregonId) {
        if (!peregonCounts[peregonId]) {
          peregonCounts[peregonId] = { name: peregonName, checked: 0, unchecked: 0, devices: [] };
        }
        peregonCounts[peregonId].devices.push(deviceName);
        check ? peregonCounts[peregonId].checked++ : peregonCounts[peregonId].unchecked++;
      }
    });

  const deviceNames: Record<string, string[]> = {};

  Object.values(stationCounts).forEach(({ name, devices }) => {
    deviceNames[name] = devices;
  });
  Object.values(levelCrossingCounts).forEach(({ name, devices }) => {
    deviceNames[name] = devices;
  });
  Object.values(peregonCounts).forEach(({ name, devices }) => {
    deviceNames[name] = devices;
  });

  return {
    stationSeries: [
      { name: "Qurilma ko'rikdan o'tkazilmagan", data: Object.values(stationCounts).map(v => v.unchecked) },
      { name: "Qurilma ko'rikdan o'tkazilgan", data: Object.values(stationCounts).map(v => v.checked) }
    ],
    levelCrossingSeries: [
      { name: "Qurilma ko'rikdan o'tkazilmagan", data: Object.values(levelCrossingCounts).map(v => v.unchecked) },
      { name: "Qurilma ko'rikdan o'tkazilgan", data: Object.values(levelCrossingCounts).map(v => v.checked) }
    ],
    peregonSeries: [
      { name: "Qurilma ko'rikdan o'tkazilmagan", data: Object.values(peregonCounts).map(v => v.unchecked) },
      { name: "Qurilma ko'rikdan o'tkazilgan", data: Object.values(peregonCounts).map(v => v.checked) }
    ],
    xaxis: {
      stationCategories: Object.values(stationCounts).map(v => v.name),
      levelCrossingCategories: Object.values(levelCrossingCounts).map(v => v.name),
      peregonCategories: Object.values(peregonCounts).map(v => v.name)
    },
    deviceNames
  };
}

export const checkPermission = (userPermissions: any, checkPermissions: any) => {
  return checkPermissions.some((perm: any) => userPermissions.includes(perm));
};

