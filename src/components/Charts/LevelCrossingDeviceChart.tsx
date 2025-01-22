import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllCategoryForSelect } from '../../slices/category/thunk.ts';
import { getAllDevice } from '../../slices/device/thunk.ts';
import { generateChartDataByCategory, generateChartDataByCategoryLevelCrossing } from '../../helpers/utils.tsx';


interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const LevelCrossingDeviceChart: React.FC = () => {
  const dispatch: any = useDispatch();
  const { allCategory, isAction } = useSelector((state: any) => state.Category);
  const { devices } = useSelector((state: any) => state.Device);
  const { levelCrossing } = useSelector((state: any) => state.LevelCrossing);

  const [row, setRow] = useState<any>([]);
  const [deviceNames, setDeviceNames] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<string>('');


  const [state, setState] = useState<ChartTwoState>({
    series: [
      { name: 'Qurilma ko\'rikdan o\'tkazilmagan', data: [] },
      { name: 'Qurilma ko\'rikdan o\'tkazilgan', data: [] }
    ]
  });


  const options: ApexOptions = {
    colors: ['#d20404', '#03d907'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: row
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        radius: 99
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      shared: false, // ✅ Ensure separate tooltips for each bar
      intersect: true, // ✅ Tooltip only shows when hovering directly on the bar
      enabled: true,
      custom: function({ dataPointIndex, seriesIndex, w }) {
        const category = w.config.xaxis.categories[dataPointIndex] || 'Noma’lum Stansiya';

        const devices = deviceNames[category] || { checked: [], unchecked: [] };
        console.log(devices);
        console.log(JSON.stringify(devices));

        // ✅ Determine which series is hovered (Red = Unchecked, Green = Checked)
        const isUnchecked = seriesIndex === 0; // Red
        const isChecked = seriesIndex === 1; // Green

        // ✅ Show only relevant devices
        const relevantDevices = isUnchecked ? devices.unchecked : devices.checked;
        return `
      <div style="padding: 10px; background: #fff; border: 1px solid #ddd;">
        ${relevantDevices.length > 0 ? relevantDevices.map((name: any) => `${name}`).join('<br/>') : 'Hech qanday qurilma yo‘q'}
      </div>
    `;
      }
    }
  };


  useEffect(() => {
    if (!categoryId) return; // Agar kategoriya tanlanmagan bo‘lsa, ishlamasin
    if (devices) {
      const result = generateChartDataByCategoryLevelCrossing(devices, categoryId, levelCrossing);
      console.log('Chart Data Updated:', result);

      if (result) {
        setState({
          series: result.levelCrossingSeries || []
        });
        setRow(result?.xaxis?.levelCrossingCategories || []);
        setDeviceNames(result?.deviceNames || {});
      }
    }

  }, [categoryId, devices, levelCrossing]);

  return (
    <div
      className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Kesishmadagi qurilmalar
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              value={categoryId}
              onChange={(e: any) => setCategoryId(e.target.value)}
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value={''}>Tanlang</option>
              {
                allCategory?.filter((val: any) => val.levelCrossing)?.map((item: any) =>
                  <option value={item.id} className="dark:bg-boxdark">{item?.name}</option>
                )
              }
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default LevelCrossingDeviceChart;
