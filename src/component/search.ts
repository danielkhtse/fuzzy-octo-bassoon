import { Request } from 'express';
import { EntityManager } from 'typeorm';
import { Organisation } from '../entity/organisation';
import { Result } from '../entity/result';

// TODO: move to shared file e.g. utils/pagination.ts or just constants.ts
export const DEFAULT_LIMIT = 15;
export const DEFAULT_OFFSET = 0;

export function mapResultToResponse(
  result: Result,
  includeAdditional: boolean
) {
  const baseData = {
    type: result.type,
    id: result.resultId,
    patientName: result.profile.name,
    sampleBarcode: result.sampleId,
    activationDate: result.activateTime ?? null,
    resultDate: result.resultTime ?? null,
    resultValue: result.result,
  };

  return includeAdditional
    ? {
        ...baseData,
        patientId: result.profile.profileId,
        resultType: result.type,
      }
    : baseData;
}

export async function search(
  manager: EntityManager,
  organisation: Organisation,
  params: Request['query']
) {
  const sampleRepository = manager.getRepository(Result);
  let query = sampleRepository
    .createQueryBuilder('sample')
    .leftJoinAndSelect('sample.profile', 'profile')
    .leftJoinAndSelect('profile.organisation', 'organisation')
    .andWhere('organisation.organisationId = :organisationId', {
      organisationId: organisation.organisationId,
    });

  if (params.patientName) {
    const patientName = (params.patientName as string).toLowerCase();
    query = query.andWhere('LOWER(profile.name) LIKE :patientName', {
      patientName: `%${patientName}%`,
    });
  }

  if (params.sampleBarcode) {
    const sampleBarcode = (params.sampleBarcode as string).toLowerCase();
    query = query.andWhere('LOWER(sample.sampleId) LIKE :sampleBarcode', {
      sampleBarcode: `%${sampleBarcode}%`,
    });
  }

  if (params.activationDate) {
    const activationDate = new Date(params.activationDate as string);
    const nextDay = new Date(activationDate);
    nextDay.setDate(activationDate.getDate() + 1);
    query = query.andWhere(
      'sample.activateTime >= :activationDate AND sample.activateTime < :nextDay',
      {
        activationDate: activationDate.toISOString(),
        nextDay: nextDay.toISOString(),
      }
    );
  }

  if (params.resultDate) {
    const resultDate = new Date(params.resultDate as string);
    const nextDay = new Date(resultDate);
    nextDay.setDate(resultDate.getDate() + 1);
    query = query.andWhere(
      'sample.resultTime >= :resultDate AND sample.resultTime < :nextDay',
      {
        resultDate: resultDate.toISOString(),
        nextDay: nextDay.toISOString(),
      }
    );
  }

  if (params.resultValue) {
    const resultValue = (params.resultValue as string).toLowerCase();
    query = query.andWhere('LOWER(sample.result) = :resultValue', {
      resultValue,
    });
  }

  if (params.resultType) {
    const resultType = (params.resultType as string).toLowerCase();
    query = query.andWhere('LOWER(sample.type) = :resultType', {
      resultType,
    });
  }

  // Apply pagination from query params
  const limit = params.page?.limit
    ? parseInt(params.page.limit as string, 10)
    : DEFAULT_LIMIT;
  const offset = params.page?.offset
    ? parseInt(params.page.offset as string, 10)
    : DEFAULT_OFFSET;

  query = query.skip(offset).take(limit);

  // Execute the query and get results
  const [results, total] = await query.getManyAndCount();

  const shouldIncludeAdditional = shouldIncludeAdditionalData(organisation);
  const responseData = {
    meta: {
      total,
    },
    data: results.map((result) =>
      mapResultToResponse(result, shouldIncludeAdditional)
    ),
  };

  return responseData;
}

export function shouldIncludeAdditionalData(
  organisation: Organisation
): boolean {
  // simplified logic for now
  return organisation.name.toLowerCase() === 'circle';
}
