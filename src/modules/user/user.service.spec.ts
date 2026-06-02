import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

describe('UserService', () => {
    let service: UserService;
    let repository: UserRepository;

    const mockUserModel = {
        new: jest.fn(),
        constructor: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findById: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                UserRepository,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should have a repository injected', () => {
        expect(repository).toBeDefined();
    });

    describe('getUserById', () => {
        it('should call repository.getUserById with the correct id', async () => {
            const mockUser = { _id: '507f1f77bcf86cd799439011', name: 'John', email: 'john@test.com', role: 'ADMIN' };
            jest.spyOn(repository, 'getUserById').mockResolvedValue(mockUser as any);

            const result = await service.getUserById('507f1f77bcf86cd799439011');
            expect(repository.getUserById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
            expect(result).toEqual(mockUser);
        });
    });

    describe('createUser', () => {
        it('should call repository.createUser with the correct dto and session', async () => {
            const dto = { name: 'Jane', email: 'jane@test.com', role: 'USER' };
            const mockSession = {} as any;
            const mockCreated = { _id: '123', ...dto };
            jest.spyOn(repository, 'createUser').mockResolvedValue(mockCreated as any);

            const result = await service.createUser(dto, mockSession);
            expect(repository.createUser).toHaveBeenCalledWith(dto, mockSession);
            expect(result).toEqual(mockCreated);
        });
    });
});
