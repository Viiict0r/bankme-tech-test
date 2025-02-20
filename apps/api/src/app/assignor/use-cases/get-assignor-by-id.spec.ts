import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import {
  GetAssignorByIdUseCase,
  GetAssignorByIdUseCaseError,
} from './get-assignor-by-id';
import { makeAssignor } from '@test/factories/assignor.factory';
import { randomUUID } from 'crypto';

let assignorRepository = new InMemoryAssignorRepository();
let service = new GetAssignorByIdUseCase(assignorRepository);

describe('GetAssignorByIdUseCase', () => {
  beforeEach(() => {
    assignorRepository = new InMemoryAssignorRepository();
    service = new GetAssignorByIdUseCase(assignorRepository);
  });

  it('should be able to return assigor using valid id', async () => {
    const testAssignor = makeAssignor();
    assignorRepository.create(testAssignor);

    const assignor = await service.execute({ id: testAssignor.id });

    expect(assignor.isRight()).toBe(true);
    expect(assignor.isRight() && assignor.value.assignor).toEqual(testAssignor);
  });

  it('should not be able to return assigor using inexistent id', async () => {
    const inexistentId = randomUUID();
    const assignor = await service.execute({ id: inexistentId });

    expect(assignor.isLeft()).toBe(true);
    expect(assignor.value).toEqual(
      GetAssignorByIdUseCaseError.ASSIGNOR_NOT_FOUND,
    );
  });

  it('should not be able to return assigor using invalid id format', async () => {
    const assignor = await service.execute({ id: 'invalid-id' });

    expect(assignor.isLeft()).toBe(true);
    expect(assignor.value).toEqual(
      GetAssignorByIdUseCaseError.INVALID_ID_FORMAT,
    );
  });
});
