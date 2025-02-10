import { Request } from 'express';
import { EntityManager } from 'typeorm';
import { Organisation } from '../entity/organisation';
import { ResultType } from './type';

export async function search(
  manager: EntityManager,
  organisation: Organisation,
  params: Request['query']
) {
  // Implement search function;
  const data = {
    meta: {
      total: 20,
    },
    data: [
      {
        id: '1c22dfc1-9c85-4ef9-a9d3-41a1e98a4d41',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '1234567890',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-12 15:00:00',
          resultTime: '2021-07-12 16:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'b66df241-e780-4c9c-aeb1-0efc4946face',
            },
          },
        },
      },
      {
        id: '98627793-ee13-4eaf-a304-9e628d110f3c',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '0987654321',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-12 19:00:00',
          resultTime: '2021-07-12 20:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: '0bf3bd3b-75bc-4540-ba04-a19ab5e9382c',
            },
          },
        },
      },
      {
        id: 'ab5b87ef-e44f-4b1f-98cb-992f2104ef8f',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '109876543211',
          resultType: ResultType.antigen,
          activateTime: '2021-07-13 15:00:00',
          resultTime: '2021-07-13 16:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'b50d027e-d8c5-496b-8665-dd2281ab1b32',
            },
          },
        },
      },
      {
        id: '8423dfd3-37b5-4c62-a37c-729e410d19e5',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '121212121212',
          resultType: ResultType.antibody,
          activateTime: '2021-07-14 15:00:00',
          resultTime: '2021-07-14 16:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: '97932431-d7de-48ec-9f51-d0d78170ffe9',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cb9a',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188181',
          resultType: ResultType.antigen,
          activateTime: '2021-07-15 15:00:00',
          resultTime: '2021-07-15 16:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: '47d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cb9b',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188182',
          resultType: ResultType.antigen,
          activateTime: '2021-07-15 17:00:00',
          resultTime: '2021-07-15 18:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'c1d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cb9c',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188183',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-15 19:00:00',
          resultTime: '2021-07-15 20:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'd2d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cb9d',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188184',
          resultType: ResultType.antibody,
          activateTime: '2021-07-15 21:00:00',
          resultTime: '2021-07-15 22:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'e3d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cb9e',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188185',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-15 23:00:00',
          resultTime: '2021-07-16 00:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'f4d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cb9f',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188186',
          resultType: ResultType.antigen,
          activateTime: '2021-07-16 01:00:00',
          resultTime: '2021-07-16 02:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'g5d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba0',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188187',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-16 03:00:00',
          resultTime: '2021-07-16 04:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'h6d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba1',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188188',
          resultType: ResultType.antibody,
          activateTime: '2021-07-16 05:00:00',
          resultTime: '2021-07-16 06:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'i7d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba2',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188189',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-16 07:00:00',
          resultTime: '2021-07-16 08:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'j8d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba3',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188190',
          resultType: ResultType.antigen,
          activateTime: '2021-07-16 09:00:00',
          resultTime: '2021-07-16 10:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'k9d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba4',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188191',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-16 11:00:00',
          resultTime: '2021-07-16 12:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'l0d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba5',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188192',
          resultType: ResultType.antibody,
          activateTime: '2021-07-16 13:00:00',
          resultTime: '2021-07-16 14:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'm1d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba6',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188193',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-16 15:00:00',
          resultTime: '2021-07-16 16:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'n2d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba7',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188194',
          resultType: ResultType.antigen,
          activateTime: '2021-07-16 17:00:00',
          resultTime: '2021-07-16 18:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'o3d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba8',
        type: 'sample',
        attributes: {
          result: 'negative',
          sampleId: '181818188195',
          resultType: ResultType.rtpcr,
          activateTime: '2021-07-16 19:00:00',
          resultTime: '2021-07-16 20:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'p4d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
      {
        id: '567a8b28-c1ab-467d-85ff-04fbcb24cba9',
        type: 'sample',
        attributes: {
          result: 'positive',
          sampleId: '181818188196',
          resultType: ResultType.antibody,
          activateTime: '2021-07-16 21:00:00',
          resultTime: '2021-07-16 22:00:00',
        },
        relationships: {
          profile: {
            data: {
              type: 'profile',
              id: 'q5d67686-b77f-47e8-92e4-76f1b5f1bc92',
            },
          },
        },
      },
    ],
    included: [
      {
        type: 'profile',
        id: 'b66df241-e780-4c9c-aeb1-0efc4946face',
        attributes: {
          name: 'Peter Chan',
        },
      },
      {
        type: 'profile',
        id: '47d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Michael Caine',
        },
      },
      {
        type: 'profile',
        id: '97932431-d7de-48ec-9f51-d0d78170ffe9',
        attributes: {
          name: 'Bruce Lee',
        },
      },
      {
        type: 'profile',
        id: 'b50d027e-d8c5-496b-8665-dd2281ab1b32',
        attributes: {
          name: 'John Locke',
        },
      },
      {
        type: 'profile',
        id: '0bf3bd3b-75bc-4540-ba04-a19ab5e9382c',
        attributes: {
          name: 'Andrea Lau',
        },
      },
      {
        type: 'profile',
        id: 'c1d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'James Bond',
        },
      },
      {
        type: 'profile',
        id: 'd2d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Tony Stark',
        },
      },
      {
        type: 'profile',
        id: 'e3d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Steve Rogers',
        },
      },
      {
        type: 'profile',
        id: 'f4d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Thor Odinson',
        },
      },
      {
        type: 'profile',
        id: 'g5d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Bruce Banner',
        },
      },
      {
        type: 'profile',
        id: 'h6d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Natasha Romanoff',
        },
      },
      {
        type: 'profile',
        id: 'i7d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Clint Barton',
        },
      },
      {
        type: 'profile',
        id: 'j8d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Peter Parker',
        },
      },
      {
        type: 'profile',
        id: 'k9d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Stephen Strange',
        },
      },
      {
        type: 'profile',
        id: 'l0d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Carol Danvers',
        },
      },
      {
        type: 'profile',
        id: 'm1d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Scott Lang',
        },
      },
      {
        type: 'profile',
        id: 'n2d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Hope van Dyne',
        },
      },
      {
        type: 'profile',
        id: 'o3d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'TChalla',
        },
      },
      {
        type: 'profile',
        id: 'p4d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Wanda Maximoff',
        },
      },
      {
        type: 'profile',
        id: 'q5d67686-b77f-47e8-92e4-76f1b5f1bc92',
        attributes: {
          name: 'Vision',
        },
      },
    ],
  };

  const responseData = {
    meta: {
      total: data.data.length,
    },
    data: data.data.map((item) => ({
      type: item.type,
      id: item.id,
      patientName: data.included.find(
        (inc) => inc.id === item.relationships.profile.data.id
      )?.attributes.name,
      sampleBarcode: item.attributes.sampleId,
      activationDate: item.attributes.activateTime,
      resultDate: item.attributes.resultTime,
      resultValue: item.attributes.result,
    })),
  };

  // Apply pagination from query params
  const limit = params.page?.limit ? parseInt(params.page.limit as string) : 20;
  const offset = params.page?.offset
    ? parseInt(params.page.offset as string)
    : 0;

  // Slice the response data array based on pagination params
  responseData.data = responseData.data.slice(offset, offset + limit);

  return responseData;
}
