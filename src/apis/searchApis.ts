import { fakePromise } from 'src/utils';
import axiosClient from './axiosClient';
import { Major } from 'src/@types';
import { comboData } from 'src/__mock__';

interface EntitySearchParams {
  entity: string;
  field: string | string[];
  operator?: string | string[];
  value: any;
}
export const searchApis = {
  search: (params: EntitySearchParams) => {
    const field = Array.isArray(params.field)
      ? params.field[params.field.length - 1]
      : params.field;

    const defaultOperator = Array.isArray(params.field)
      ? Array(params.field.length).fill('like')
      : 'like';

    return axiosClient.get('/search', {
      params: { operator: defaultOperator, ...params },
      transformResponse: [
        function (data) {
          const entity = params.entity;
          let parsedData = JSON.parse(data);
          const entitySearchResultFn = {
            combo: (d) => ({ label: d[field], value: d.id, syllabi: d.syllabi }),
            subject: (d) => ({ label: `${d[field]} - ${d.code}`, value: d.id }),
            default: (d) => ({ label: d[field], value: d.id }),
          };

          if (!entitySearchResultFn[entity]) return parsedData.map(entitySearchResultFn.default);
          return parsedData.map(entitySearchResultFn[entity]);
        },
      ],
    });
  },
};
