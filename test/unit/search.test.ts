import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  search,
  DEFAULT_LIMIT,
  mapResultToResponse,
} from '../../src/component/search';
import { Organisation } from '../../src/entity/organisation';
import { Result } from '../../src/entity/result';
import { ResultType } from '../../src/component/type';

describe('search', () => {
  let mockManager: EntityManager;
  let mockQueryBuilder: SelectQueryBuilder<Result>;
  let mockRepository: Repository<Result>;
  let sandbox: sinon.SinonSandbox;

  const MOCK_ORG_CIRCLE = {
    name: 'Circle',
    organisationId: '123e4567-e89b-12d3-a456-426614174000',
  } as Organisation;

  const MOCK_ORG_PRENETICS = {
    name: 'Prenetics',
    organisationId: '123e4567-e89b-12d3-a456-426614174001',
  } as Organisation;

  // Update testData to use the constants
  const testData: Partial<Result>[] = [
    {
      resultId: '123e4567-e89b-12d3-a456-426614174004',
      type: ResultType.rtpcr,
      activateTime: new Date('2024-03-20T10:00:00Z'),
      resultTime: new Date('2024-03-20T14:00:00Z'),
      result: 'positive',
      sampleId: '123e4567-e89b-12d3-a456-426614174002',
      profile: {
        profileId: '123e4567-e89b-12d3-a456-426614174003',
        name: 'John Doe',
        datetime: new Date(),
        result: [],
        organisation: MOCK_ORG_PRENETICS,
      },
    },
    {
      resultId: '123e4567-e89b-12d3-a456-426614174005',
      type: ResultType.antigen,
      activateTime: new Date('2024-01-21T09:00:00Z'),
      resultTime: new Date('2024-01-21T11:00:00Z'),
      result: 'positive',
      sampleId: '123e4567-e89b-12d3-a456-426614174006',
      profile: {
        profileId: '123e4567-e89b-12d3-a456-426614174007',
        name: 'Jane Smith',
        datetime: new Date(),
        result: [],
        organisation: MOCK_ORG_CIRCLE,
      },
    },
    {
      resultId: '123e4567-e89b-12d3-a456-426614174008',
      type: ResultType.rtpcr,
      activateTime: new Date('2024-03-21T09:00:00Z'),
      resultTime: new Date('2024-03-21T11:00:00Z'),
      result: 'negative',
      sampleId: '123e4567-e89b-12d3-a456-426614174009',
      profile: {
        profileId: '123e4567-e89b-12d3-a456-426614174010',
        name: 'Alice Doe',
        datetime: new Date(),
        result: [],
        organisation: MOCK_ORG_CIRCLE,
      },
    },
  ];

  const paginationTestData: Partial<Result>[] = Array.from(
    { length: 25 },
    (_, i) => ({
      resultId: `result-${i + 1000}`,
      type: i % 3 === 0 ? ResultType.rtpcr : ResultType.antigen,
      activateTime: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      resultTime: new Date(
        Date.now() - i * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
      ),
      result: i % 2 === 0 ? 'positive' : 'negative',
      sampleId: `SAMPLE${1000 + i}`,
      profile: {
        profileId: `profile-${1000 + i}`,
        name: `Test User ${i + 1}`,
        datetime: new Date(),
        result: [],
        organisation: MOCK_ORG_CIRCLE,
      },
    })
  );

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // Create base mock query builder with more specific chaining
    mockQueryBuilder = {
      leftJoinAndSelect: sinon.stub().returnsThis(),
      andWhere: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      take: sinon.stub().returnsThis(),
      orderBy: sinon.stub().returnsThis(),
      getManyAndCount: sinon.stub(), // Define as stub without initial resolve
    } as unknown as SelectQueryBuilder<Result>;

    // Create repository mock with specific method verification
    mockRepository = {
      createQueryBuilder: sinon
        .stub()
        .withArgs('sample')
        .returns(mockQueryBuilder),
    } as unknown as Repository<Result>;

    // Create entity manager mock
    mockManager = {
      getRepository: sinon.stub().returns(mockRepository),
    } as unknown as EntityManager;
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('query parameter filters', () => {
    it('should filter by patientName with exact match', async () => {
      const org = MOCK_ORG_CIRCLE;
      const patientName = 'Alice Doe';
      const mockResult = testData.filter(
        (result) =>
          result.profile?.name.toLowerCase() === patientName.toLowerCase() &&
          result.profile?.organisation.organisationId === org.organisationId
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, org, {
        patientName: patientName,
      });

      expect(result.data).to.have.lengthOf(mockResult.length);
      expect(result.data[0].patientName).to.equal(patientName);
    });

    it('should filter by patientName with partial match', async () => {
      const org = MOCK_ORG_CIRCLE;
      const queryPatientName = 'ALICE';
      const mockResult = testData.filter(
        (result) =>
          result.profile?.name
            .toLowerCase()
            .includes(queryPatientName.toLowerCase()) &&
          result.profile?.organisation.organisationId === org.organisationId
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, org, {
        patientName: queryPatientName,
      });

      expect(result.data).to.have.lengthOf(mockResult.length);
      expect(result.data[0].patientName).to.equal(mockResult[0].profile?.name);
    });

    it('should filter by sampleBarcode with exact match', async () => {
      const mockResult = testData.filter(
        (result) =>
          result.sampleId === '123e4567-e89b-12d3-a456-426614174006' &&
          result.profile?.organisation.organisationId ===
            MOCK_ORG_CIRCLE.organisationId
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        sampleId: '123e4567-e89b-12d3-a456-426614174006',
      });

      expect(result.data).to.have.lengthOf(mockResult.length);
      expect(result.data[0].sampleBarcode).to.equal(
        '123e4567-e89b-12d3-a456-426614174006'
      );
    });

    it('should filter by activationDate with specific date ignore time', async () => {
      const filterDate = '2024-03-21';

      const mockResult = testData.filter((result) => {
        const activateDate = result.activateTime?.toISOString().split('T')[0];
        return (
          activateDate === filterDate &&
          result.profile?.organisation.organisationId ===
            MOCK_ORG_CIRCLE.organisationId
        );
      });

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        activateTime: filterDate,
      });
      expect(result.data).to.have.lengthOf(1);
      expect(
        result.data[0].activationDate.toISOString().split('T')[0]
      ).to.equal(filterDate);
      expect(result.data[0].sampleBarcode).to.equal(mockResult[0].sampleId);
    });

    it('should filter by resultDate with specific date ignore time', async () => {
      const filterDate = '2024-03-21';

      const mockResult = testData.filter((result) => {
        const resultDate = result.resultTime?.toISOString().split('T')[0];
        return (
          resultDate === filterDate &&
          result.profile?.organisation.organisationId ===
            MOCK_ORG_CIRCLE.organisationId
        );
      });

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        resultTime: filterDate,
      });
      expect(result.data).to.have.lengthOf(1);
      expect(result.data[0].resultDate.toISOString().split('T')[0]).to.equal(
        filterDate
      );
      expect(result.data[0].patientName).to.equal(mockResult[0].profile?.name);
    });

    it('should filter by exact matched result values', async () => {
      const resultValue = 'negative';

      const mockResult = testData.filter(
        (result) =>
          result.result === resultValue &&
          result.profile?.organisation.organisationId ===
            MOCK_ORG_CIRCLE.organisationId
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        resultValue: resultValue,
      });

      expect(result.data).to.have.lengthOf(1);
      expect(result.data[0].resultValue).to.equal(resultValue);
      expect(result.data[0].patientName).to.equal(mockResult[0].profile?.name);
    });

    it('should filter by exact matched result type', async () => {
      const resultType = ResultType.rtpcr;

      const mockResult = testData.filter(
        (result) =>
          result.type === resultType &&
          result.profile?.organisation.organisationId ===
            MOCK_ORG_CIRCLE.organisationId
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        mockResult.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        resultType: resultType,
      });

      expect(result.data).to.have.lengthOf(1);
      expect(result.data[0].type).to.equal(resultType);
      expect(result.data[0].patientName).to.equal(mockResult[0].profile?.name);
    });
  });

  describe('pagination', () => {
    beforeEach(() => {
      // Override getManyAndCount specifically for pagination tests
      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        paginationTestData as Result[],
        paginationTestData.length,
      ]);
    });

    it('should use default pagination for first page', async () => {
      const mockResult = paginationTestData.slice(0, DEFAULT_LIMIT);

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        paginationTestData.length,
      ]);

      const result = await search(
        mockManager,
        MOCK_ORG_CIRCLE, // Use the constant instead of inline object
        {}
      );

      expect(result.data).to.have.lengthOf(DEFAULT_LIMIT);
      expect(result.meta.total).to.equal(paginationTestData.length);
      expect(result.data[0].id).to.equal('result-1000');
    });

    it('should handle custom pagination with valid parameters', async () => {
      const customLimit = 10;
      const customOffset = 5;
      const mockResult = paginationTestData.slice(
        customOffset,
        customOffset + customLimit
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        paginationTestData.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        page: {
          limit: customLimit.toString(),
          offset: customOffset.toString(),
        },
      });

      expect(result.data).to.have.lengthOf(customLimit);
      expect(result.meta.total).to.equal(paginationTestData.length);
      expect(result.data[0].id).to.equal('result-1005');
    });

    it('should return remaining items for last page', async () => {
      const customLimit = 10;
      const customOffset = 20;
      const mockResult = paginationTestData.slice(
        customOffset,
        customOffset + customLimit
      );

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        paginationTestData.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        page: {
          limit: customLimit.toString(),
          offset: customOffset.toString(),
        },
      });

      const remainingItems = paginationTestData.length - customOffset;
      expect(result.data).to.have.lengthOf(remainingItems);
      expect(result.meta.total).to.equal(paginationTestData.length);
      expect(result.data[0].id).to.equal('result-1020');
    });

    it('should handle invalid pagination parameters', async () => {
      const mockResult = paginationTestData.slice(0, DEFAULT_LIMIT);

      (mockQueryBuilder.getManyAndCount as sinon.SinonStub).resolves([
        mockResult as Result[],
        paginationTestData.length,
      ]);

      const result = await search(mockManager, MOCK_ORG_CIRCLE, {
        page: { limit: 'invalid', offset: '-1' },
      });

      expect(result.data).to.have.lengthOf(DEFAULT_LIMIT);
      expect(result.meta.total).to.equal(paginationTestData.length);
      expect(result.data[0].id).to.equal('result-1000');
    });
  });

  describe('mapResultToResponse', () => {
    it('should map Result to Response', () => {
      const testResult: Partial<Result> = {
        resultId: '123e4567-e89b-12d3-a456-426614174004',
        type: ResultType.rtpcr,
        activateTime: new Date('2024-03-20T10:00:00Z'),
        resultTime: new Date('2024-03-20T14:00:00Z'),
        result: 'positive',
        sampleId: 'SAMPLE123',
        profile: {
          profileId: 'PROFILE123',
          name: 'John Doe',
          datetime: new Date(),
          result: [],
          organisation: MOCK_ORG_CIRCLE,
        },
      };

      const response = mapResultToResponse(testResult as Result);

      expect(response).to.deep.include({
        id: testResult.resultId,
        patientName: testResult.profile?.name,
        patientId: testResult.profile?.profileId,
        sampleBarcode: testResult.sampleId,
        resultValue: testResult.result,
        type: testResult.type,
        resultType: testResult.type,
      });
      expect(response.activationDate.toISOString()).to.equal(
        testResult.activateTime?.toISOString()
      );
      expect(response.resultDate.toISOString()).to.equal(
        testResult.resultTime?.toISOString()
      );
    });

    it('should handle null dates in Result', () => {
      const testResult: Partial<Result> = {
        resultId: '123e4567-e89b-12d3-a456-426614174006',
        type: ResultType.rtpcr,
        activateTime: undefined,
        resultTime: undefined,
        result: 'positive',
        sampleId: 'SAMPLE789',
        profile: {
          profileId: 'PROFILE789',
          name: 'Alice Brown',
          datetime: new Date(),
          result: [],
          organisation: MOCK_ORG_CIRCLE,
        },
      };

      const response = mapResultToResponse(testResult as Result);

      expect(response).to.deep.include({
        id: testResult.resultId,
        patientName: testResult.profile?.name,
        patientId: testResult.profile?.profileId,
        sampleBarcode: testResult.sampleId,
        resultValue: testResult.result,
        type: testResult.type,
        resultType: testResult.type,
      });
      expect(response.activationDate).to.be.null;
      expect(response.resultDate).to.be.null;
    });
  });
});
