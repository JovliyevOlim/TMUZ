import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllCategoryForSelect } from '../../slices/category/thunk.ts';
import { getAllDevice } from '../../slices/device/thunk.ts';
import { generateChartDataByCategory } from '../../helpers/utils.tsx';


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


  const [row, setRow] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<string>('');



  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: [13, 23, 20, 8, 13, 27, 15]
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: [44, 55, 41, 67, 22, 43, 65]
      }
    ]
  });

  useEffect(() => {
    const result = generateChartDataByCategory(devices, categoryId);
    setRow(result.xaxis.levelCrossingCategories);
    state.series = result.levelCrossingSeries;
    let a = { ...state };
    setState(a);
  }, [categoryId]);

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

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%'
            }
          }
        }
      }
    ],
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
    }
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState
    }));
  };
  handleReset;


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
                allCategory.filter((val:any)=>val.levelCrossing)?.map((item: any) =>
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
